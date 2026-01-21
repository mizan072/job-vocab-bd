/**
 * JOB VOCAB BD - CORE APPLICATION LOGIC
 * Handles Data Fetching, State Management, and Navigation
 */

// --- CONFIGURATION ---
const INDEX_URL = 'data/exam_index.json';

// --- 1. DATA FETCHING UTILITIES ---

/**
 * Fetches the master list of exam file paths.
 * @returns {Promise<Array>} List of strings (paths)
 */
async function fetchExamIndex() {
    try {
        const response = await fetch(INDEX_URL);
        if (!response.ok) throw new Error(`Failed to load index: ${response.status}`);
        return await response.json(); 
    } catch (error) {
        console.error("Critical Error: Could not load exam index.", error);
        return [];
    }
}

/**
 * Fetches a single exam's data (Info + Questions).
 * @param {string} filePath - Path to the JSON file
 */
async function fetchExamData(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`File not found: ${filePath}`);
        return await response.json();
    } catch (error) {
        console.warn(`Skipping missing/corrupt file: ${filePath}`);
        return null; // Return null so we can filter it out later
    }
}

// --- 2. HOME PAGE LOGIC ---

/**
 * Loads all exams for the Home Dashboard.
 * Called by index.html script.
 */
async function loadHomeData(containerId) {
    // 1. Get the list of file paths
    const filePaths = await fetchExamIndex();
    
    if (filePaths.length === 0) return [];

    // 2. Fetch all files in parallel (Super Fast)
    const promises = filePaths.map(path => fetchExamData(path));
    const rawResults = await Promise.all(promises);

    // 3. Process results: Remove nulls and attach file paths
    const cleanList = rawResults
        .map((data, index) => {
            if (!data) return null;
            return {
                ...data.info,       // Spread title, date, category
                filePath: filePaths[index] // Attach the path for clicking
            };
        })
        .filter(item => item !== null); // Remove failed fetches

    return cleanList;
}

// --- 3. VOCAB BANK LOGIC ---

/**
 * Merges ALL questions from ALL exams into one giant array.
 * Called by vocab.html script.
 */
async function loadVocabBank() {
    const filePaths = await fetchExamIndex();
    const promises = filePaths.map(path => fetchExamData(path));
    const allExams = await Promise.all(promises);

    let mergedQuestions = [];

    allExams.forEach(exam => {
        if (exam && exam.questions) {
            // Tag each question with its source exam name
            const tagged = exam.questions.map(q => ({
                ...q,
                source_exam: exam.info.title
            }));
            mergedQuestions = [...mergedQuestions, ...tagged];
        }
    });

    return mergedQuestions;
}

// --- 4. NAVIGATION ACTIONS ---

/**
 * Saves selection and goes to Practice Page.
 * Used by onclick events in index.html
 */
function startExamSession(filePath, examTitle) {
    localStorage.setItem('currentExamPath', filePath);
    localStorage.setItem('currentExamTitle', examTitle);
    localStorage.setItem('appMode', 'single_exam'); // Mode: specific exam
    window.location.href = 'practice.html';
}

/**
 * Goes to Vocab Bank Page.
 */
function startVocabBankSession() {
    localStorage.setItem('appMode', 'vocab_bank');
    window.location.href = 'vocab.html';
}

// --- 5. HELPER: DATE FORMATTER ---
// Optional: Formats "2024-05-10" to "10 May, 2024"
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
