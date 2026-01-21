/* =========================================
   JOBVOCAB BD - PREMIUM DESIGN SYSTEM
   ========================================= */

/* --- 1. FONTS IMPORT --- */
/* Plus Jakarta Sans (Modern English) & Hind Siliguri (Premium Bengali) */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');

:root {
    --primary: #4F46E5;       /* Indigo 600 */
    --primary-soft: #EEF2FF;  /* Indigo 50 */
    --surface: #F8FAFC;       /* Slate 50 */
    --text-main: #0F172A;     /* Slate 900 */
    --text-muted: #64748B;    /* Slate 500 */
    --glass-border: rgba(255, 255, 255, 0.6);
}

/* --- 2. GLOBAL RESET --- */
body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: var(--surface);
    color: var(--text-main);
    -webkit-font-smoothing: antialiased; /* HD Text Rendering for Mac/iOS */
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
}

/* Bengali Text Specific Class */
.bn-font {
    font-family: 'Hind Siliguri', sans-serif;
    line-height: 1.6;
}

/* --- 3. GLASSMORPHISM & CARDS --- */

/* The "HD" Card Style */
.hd-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid white;
    box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.02), 
        0 10px 15px -3px rgba(0, 0, 0, 0.03);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
}

.hd-card:active {
    transform: scale(0.98);
}

/* --- 4. ANIMATIONS --- */

/* Skeleton Shimmer (Loading State) */
@keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
}

.skeleton {
    animation: shimmer 2s infinite linear;
    background: linear-gradient(to right, #f1f5f9 4%, #e2e8f0 25%, #f1f5f9 36%);
    background-size: 1000px 100%;
}

/* Fade In (Smooth Page Load) */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

/* Pulse (For 'NEW' Badges) */
@keyframes softPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}
.animate-pulse-slow {
    animation: softPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* --- 5. UI COMPONENTS --- */

/* Hide Scrollbar (Clean Horizontal Lists) */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* 3D Button Effect (For Quiz Options) */
.option-btn {
    transition: all 0.15s ease;
    border-bottom-width: 4px; /* The "Chunky" look */
}
.option-btn:active {
    border-bottom-width: 0px;
    transform: translateY(4px);
    background-color: #F1F5F9; /* Slight darkening */
}

/* Safe Area (iPhone Home Indicator) */
.pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
}
