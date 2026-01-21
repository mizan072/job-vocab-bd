/**
 * JOB VOCAB BD - CORE LOGIC
 * Handles data fetching, local storage, and navigation.
 */

const INDEX_URL = 'data/exam_index.json';

// --- SHARED FUNCTIONS ---

// 1. Fetch the Exam Index (The List of File Paths)
async function fetchExamIndex() {
    try {
        const response = await fetch(INDEX_URL);
        if (!response.ok) throw new Error("Failed to load exam index");
        return await response.json(); // Returns ["data/exams/bcs_46.json", ...]
    } catch (error) {
        console.error("Error fetching index:", error);
        return [];
    }
}

// 2. Fetch Single Exam Data (Info + Questions)
async function fetchExamData(filePath) {
    try {
        const response = await fetch(filePath);
        return await response.json();
    } catch (error) {
        console.error(`Error loading exam from ${filePath}:`, error);
        return null;
    }
}

// 3. Navigation: Start an Exam
function startExamSession(filePath, examTitle) {
    // Save state so practice.html knows what to load
    localStorage.setItem('currentExamPath', filePath);
    localStorage.setItem('currentExamTitle', examTitle);
    localStorage.setItem('appMode', 'single_exam'); // mode: single or vocab_bank
    
    // Redirect
    window.location.href = 'practice.html';
}

// 4. Navigation: Start Vocab Bank (All Words)
function startVocabBankSession() {
    localStorage.setItem('appMode', 'vocab_bank');
    window.location.href = 'vocab.html'; // Or practice.html if you run mixed quiz there
}

// --- HOME PAGE LOGIC (Called by index.html) ---

async function loadHomeData(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 1. Get List of Files
    const filePaths = await fetchExamIndex();
    
    if (filePaths.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-400 mt-10">No exams found.</p>';
        return;
    }

    // 2. Fetch All Exam Infos in Parallel (Fast)
    // We map every path to a fetch promise
    const promises = filePaths.map(path => fetchExamData(path));
    const allExamsData = await Promise.all(promises);

    // 3. Extract Info and Combine with Path
    // This creates a clean array like: [{title: "BCS", date: "...", path: "..."}]
    const cleanList = allExamsData
        .filter(data => data !== null) // Remove failed fetches
        .map((data, index) => ({
            ...data.info,       // Spread the info object (title, date, category)
            filePath: filePaths[index] // Attach the file path for clicking
        }));

    return cleanList; // Return data to the UI renderer
}
