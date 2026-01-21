// --- CONFIGURATION ---
const INDEX_URL = 'data/exam_index.json';

// --- MODE 1: LOAD SINGLE EXAM (For Practice Mode) ---
async function loadSingleExam(jsonPath) {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        
        console.log(`Loaded ${data.info.title}`);
        return data.questions; // Returns just the questions for this exam
    } catch (error) {
        console.error("Error loading exam:", error);
    }
}

// --- MODE 2: LOAD VOCAB BANK (Fetch ALL exams & Merge) ---
async function loadVocabBank() {
    try {
        // 1. Get the list of all file paths
        const indexResponse = await fetch(INDEX_URL);
        const filePaths = await indexResponse.json();

        // 2. Fetch ALL files in parallel (Super Fast)
        const requests = filePaths.map(path => fetch(path).then(res => res.json()));
        const allExams = await Promise.all(requests);

        // 3. Merge all questions into one giant array
        let allQuestions = [];
        allExams.forEach(exam => {
            // Optional: Tag questions with their exam source before merging
            const taggedQuestions = exam.questions.map(q => ({
                ...q, 
                source_exam: exam.info.title // Adds "46th BCS" to the question data
            }));
            allQuestions = [...allQuestions, ...taggedQuestions];
        });

        console.log(`Vocab Bank Loaded: ${allQuestions.length} total words.`);
        return allQuestions;

    } catch (error) {
        console.error("Error building Vocab Bank:", error);
    }
}
