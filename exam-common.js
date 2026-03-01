// exam-common.js - الدوال المشتركة لجميع الاختبارات

// ==================== المتغيرات العامة ====================
let currentQuestionIndex = 0;
let userAnswers = [];
let startTime = null;
let timerInterval = null;
let timeLeft = 60 * 60; // 60 دقيقة افتراضياً
let examCompleted = false;
let currentQuestions = [];
let shuffledQuestions = [];
let usedQuestionIds = new Set();
let currentSessionQuestions = [];

// عناصر DOM (سيتم ربطها لاحقاً)
let startScreen, examScreen, resultsScreen, startExamBtn, endExamBtn, prevBtn, nextBtn,
    questionText, questionNumber, optionsContainer, progressFill, progressText, progressPercent,
    timer, darkModeToggle, reviewBtn, retryBtn, newTestBtn, reviewSection, wrongAnswersList,
    noWrongAnswers, closeReviewBtn, finalScore, percentage, grade, correctAnswers, wrongAnswers,
    timeTaken, scorePercentage, scoreCircle, confirmModal, cancelEndBtn, confirmEndBtn,
    remainingQuestions, unansweredAlert, unansweredCount, questionsGrid, scrollTopBtn;

// ==================== الدوال المساعدة ====================

// التمرير للأعلى
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// إعداد زر التمرير للأعلى
function setupScrollTop() {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    scrollTopBtn.addEventListener('click', scrollToTop);
}

// تبديل الوضع الليلي
function toggleDarkMode() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    
    if (isDark) {
        document.body.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.title = 'الوضع الليلي';
        localStorage.setItem('darkMode', 'false');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.title = 'الوضع النهاري';
        localStorage.setItem('darkMode', 'true');
    }
    
    setTimeout(() => document.body.style.transition = '', 500);
}

// خلط مصفوفة
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// بدء الامتحان (يستدعي الدوال الخاصة بكل صفحة)
function startExam() {
    startScreen.classList.remove('active');
    examScreen.classList.add('active');
    
    startTime = new Date();
    timeLeft = 60 * 60;
    userAnswers = [];
    examCompleted = false;
    currentQuestionIndex = 0;
    
    selectRandomQuestions(); // معرفة في كل صفحة
    shuffleAllOptions();     // معرفة في كل صفحة
    
    startTimer();
    loadQuestion(currentQuestionIndex);
    updateQuestionsGrid();
    updateUnansweredAlert();
}

// بدء المؤقت
function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) endExam();
    }, 1000);
}

// تحديث عرض المؤقت
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.querySelector('span').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft < 300) timer.style.color = 'var(--accent-color)';
    else if (timeLeft < 600) timer.style.color = 'var(--warning-color)';
}

// تحميل السؤال
function loadQuestion(index) {
    const question = shuffledQuestions[index];
    
    questionNumber.textContent = `س${index + 1}`;
    questionText.textContent = question.question;
    
    const progress = ((index + 1) / shuffledQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `السؤال ${index + 1} من ${shuffledQuestions.length}`;
    progressPercent.textContent = `${Math.round(progress)}%`;
    
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === shuffledQuestions.length - 1 ? 'إنهاء الاختبار' : 'التالي';
    
    optionsContainer.innerHTML = '';
    question.shuffledOptions.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = `option ${userAnswers[index] === optionIndex ? 'selected' : ''}`;
        
        const marker = document.createElement('div');
        marker.className = 'option-marker';
        marker.textContent = String.fromCharCode(1632 + optionIndex + 1);
        
        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = option;
        
        optionElement.append(marker, text);
        optionElement.addEventListener('click', () => selectOption(optionIndex));
        optionsContainer.appendChild(optionElement);
    });
    
    updateQuestionStatus(index);
    updateQuestionsGrid();
}

// تحديث حالة السؤال
function updateQuestionStatus(index) {
    const statusElement = document.getElementById('questionStatus');
    if (userAnswers[index] === null) {
        statusElement.innerHTML = '<i class="fas fa-star"></i> جديد';
        statusElement.style.color = 'var(--warning-color)';
    } else {
        statusElement.innerHTML = '<i class="fas fa-check"></i> تم الإجابة';
        statusElement.style.color = 'var(--success-color)';
    }
}

// تحديث شبكة التنقل
function updateQuestionsGrid() {
    questionsGrid.innerHTML = '';
    shuffledQuestions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'question-nav-btn';
        btn.textContent = index + 1;
        
        if (index === currentQuestionIndex) btn.classList.add('current');
        else if (userAnswers[index] !== null) btn.classList.add('answered');
        else btn.classList.add('unanswered');
        
        btn.addEventListener('click', () => {
            currentQuestionIndex = index;
            loadQuestion(index);
            setTimeout(scrollToTop, 50);
        });
        
        questionsGrid.appendChild(btn);
    });
}

// تحديث تنبيه الأسئلة غير المحلولة
function updateUnansweredAlert() {
    const unanswered = userAnswers.filter(a => a === null).length;
    if (unanswered > 0) {
        unansweredCount.textContent = `${unanswered} أسئلة من أصل ${shuffledQuestions.length}`;
        unansweredAlert.style.display = 'flex';
    } else {
        unansweredAlert.style.display = 'none';
    }
}

// اختيار إجابة
function selectOption(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    loadQuestion(currentQuestionIndex);
    updateUnansweredAlert();
}

// السؤال السابق
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

// السؤال التالي
function nextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showConfirmModal();
    }
}

// عرض نموذج التأكيد
function showConfirmModal() {
    remainingQuestions.textContent = userAnswers.filter(a => a === null).length;
    confirmModal.style.display = 'flex';
}

// إنهاء الامتحان
function endExam() {
    confirmModal.style.display = 'none';
    clearInterval(timerInterval);
    examCompleted = true;
    
    examScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    calculateResults();
    if (parseInt(correctAnswers.textContent) >= Math.ceil(shuffledQuestions.length * 0.6)) {
        showConfetti();
    }
    
    setTimeout(scrollToTop, 100);
}

// حساب النتائج
function calculateResults() {
    let correct = 0, wrong = 0;
    shuffledQuestions.forEach((q, i) => {
        const ans = userAnswers[i];
        if (ans !== null) {
            if (ans === q.shuffledCorrect) correct++;
            else wrong++;
        }
    });
    
    const total = shuffledQuestions.length;
    const percent = (correct / total) * 100;
    
    finalScore.textContent = `${correct}/${total}`;
    percentage.textContent = `${percent.toFixed(1)}%`;
    scorePercentage.textContent = `${percent.toFixed(1)}%`;
    correctAnswers.textContent = correct;
    wrongAnswers.textContent = wrong;
    
    const gradeText = percent >= 90 ? 'امتياز' :
                     percent >= 80 ? 'جيد جداً' :
                     percent >= 70 ? 'جيد' :
                     percent >= 60 ? 'مقبول' : 'راسب';
    grade.textContent = gradeText;
    grade.style.color = percent >= 60 ? 'var(--success-color)' : 'var(--accent-color)';
    
    const diff = Math.floor((new Date() - startTime) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    timeTaken.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    
    const circleLength = 800;
    scoreCircle.style.strokeDashoffset = circleLength - (circleLength * (percent / 100));
    
    if (percent >= 90) scoreCircle.style.stroke = '#9b59b6';
    else if (percent >= 80) scoreCircle.style.stroke = 'var(--success-color)';
    else if (percent >= 70) scoreCircle.style.stroke = '#2ecc71';
    else if (percent >= 60) scoreCircle.style.stroke = 'var(--warning-color)';
    else scoreCircle.style.stroke = 'var(--accent-color)';
}

// تأثير الكونفيتي
function showConfetti() {
    const colors = ['#4299e1', '#e53e3e', '#38a169', '#d69e2e', '#9b59b6'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed; left: ${Math.random() * 100}vw; top: -10px;
                width: 10px; height: 10px; background: ${colors[Math.floor(Math.random() * colors.length)]};
                opacity: 0.8; border-radius: 50%; z-index: 9999; pointer-events: none;
            `;
            document.body.appendChild(confetti);
            
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
                { transform: `translateY(${window.innerHeight}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            }).onfinish = () => confetti.remove();
        }, i * 50);
    }
}

// عرض/إخفاء المراجعة
function toggleReview() {
    if (reviewSection.style.display === 'block') {
        reviewSection.style.display = 'none';
        reviewBtn.innerHTML = '<i class="fas fa-list-check"></i> مراجعة الإجابات الخاطئة';
        setTimeout(scrollToTop, 100);
    } else {
        reviewSection.style.display = 'block';
        reviewBtn.innerHTML = '<i class="fas fa-times"></i> إغلاق المراجعة';
        generateWrongAnswersReview();
        setTimeout(() => reviewSection.scrollIntoView({ behavior: 'smooth' }), 100);
    }
}

// توليد مراجعة الإجابات الخاطئة
function generateWrongAnswersReview() {
    wrongAnswersList.innerHTML = '';
    let wrongCount = 0;
    
    shuffledQuestions.forEach((q, i) => {
        const userAns = userAnswers[i];
        if (userAns !== null && userAns !== q.shuffledCorrect) {
            wrongCount++;
            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <div class="review-question">${i + 1}. ${q.question}</div>
                <div class="review-answers">
                    <div class="answer-item user-answer">
                        <i class="fas fa-user"></i> <span>إجابتك: ${q.shuffledOptions[userAns]}</span>
                    </div>
                    <div class="answer-item correct-answer">
                        <i class="fas fa-check"></i> <span>الإجابة الصحيحة: ${q.shuffledOptions[q.shuffledCorrect]}</span>
                    </div>
                    ${q.explanation ? `<div style="margin-top:0.5rem;font-size:0.95rem;color:var(--text-color);opacity:0.8;">${q.explanation}</div>` : ''}
                </div>
            `;
            wrongAnswersList.appendChild(item);
        }
    });
    
    if (wrongCount === 0) {
        wrongAnswersList.style.display = 'none';
        noWrongAnswers.style.display = 'block';
    } else {
        wrongAnswersList.style.display = 'block';
        noWrongAnswers.style.display = 'none';
    }
}

// إعادة نفس الاختبار
function retryExam() {
    currentQuestionIndex = 0;
    userAnswers = new Array(shuffledQuestions.length).fill(null);
    examCompleted = false;
    
    resultsScreen.classList.remove('active');
    examScreen.classList.add('active');
    
    reviewSection.style.display = 'none';
    reviewBtn.innerHTML = '<i class="fas fa-list-check"></i> مراجعة الإجابات الخاطئة';
    
    startTime = new Date();
    timeLeft = 60 * 60;
    startTimer();
    loadQuestion(currentQuestionIndex);
    updateUnansweredAlert();
    
    setTimeout(scrollToTop, 100);
}

// اختبار جديد
function startNewExam() {
    startScreen.classList.remove('active');
    examScreen.classList.add('active');
    resultsScreen.classList.remove('active');
    
    currentQuestionIndex = 0;
    userAnswers = [];
    examCompleted = false;
    
    selectRandomQuestions();
    shuffleAllOptions();
    
    startTime = new Date();
    timeLeft = 60 * 60;
    startTimer();
    loadQuestion(currentQuestionIndex);
    updateUnansweredAlert();
    
    reviewSection.style.display = 'none';
    reviewBtn.innerHTML = '<i class="fas fa-list-check"></i> مراجعة الإجابات الخاطئة';
    
    setTimeout(scrollToTop, 100);
}

// تهيئة التطبيق (ربط العناصر وإعداد المستمعات)
function initApp() {
    // ربط عناصر DOM
    startScreen = document.getElementById('startScreen');
    examScreen = document.getElementById('examScreen');
    resultsScreen = document.getElementById('resultsScreen');
    startExamBtn = document.getElementById('startExamBtn');
    endExamBtn = document.getElementById('endExamBtn');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    questionText = document.getElementById('questionText');
    questionNumber = document.getElementById('questionNumber');
    optionsContainer = document.getElementById('optionsContainer');
    progressFill = document.getElementById('progressFill');
    progressText = document.getElementById('progressText');
    progressPercent = document.getElementById('progressPercent');
    timer = document.getElementById('timer');
    darkModeToggle = document.getElementById('darkModeToggle');
    reviewBtn = document.getElementById('reviewBtn');
    retryBtn = document.getElementById('retryBtn');
    newTestBtn = document.getElementById('newTestBtn');
    reviewSection = document.getElementById('reviewSection');
    wrongAnswersList = document.getElementById('wrongAnswersList');
    noWrongAnswers = document.getElementById('noWrongAnswers');
    closeReviewBtn = document.getElementById('closeReviewBtn');
    finalScore = document.getElementById('finalScore');
    percentage = document.getElementById('percentage');
    grade = document.getElementById('grade');
    correctAnswers = document.getElementById('correctAnswers');
    wrongAnswers = document.getElementById('wrongAnswers');
    timeTaken = document.getElementById('timeTaken');
    scorePercentage = document.getElementById('scorePercentage');
    scoreCircle = document.getElementById('scoreCircle');
    confirmModal = document.getElementById('confirmModal');
    cancelEndBtn = document.getElementById('cancelEndBtn');
    confirmEndBtn = document.getElementById('confirmEndBtn');
    remainingQuestions = document.getElementById('remainingQuestions');
    unansweredAlert = document.getElementById('unansweredAlert');
    unansweredCount = document.getElementById('unansweredCount');
    questionsGrid = document.getElementById('questionsGrid');
    scrollTopBtn = document.getElementById('scrollTopBtn');

    // استعادة الوضع الليلي
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        darkModeToggle.title = 'الوضع النهاري';
    } else {
        darkModeToggle.title = 'الوضع الليلي';
    }

    // إضافة transition للعناصر
    document.querySelectorAll('.container, .navbar, .footer, .screen, .exam-header, .instructions, .exam-controls, .questions-nav-grid, .question-container, .review-section, .result-card, .modal-content')
        .forEach(el => el.classList.add('theme-transition'));

    // إعداد المستمعات
    startExamBtn.addEventListener('click', () => { startExam(); setTimeout(scrollToTop, 100); });
    endExamBtn.addEventListener('click', showConfirmModal);
    prevBtn.addEventListener('click', () => { prevQuestion(); setTimeout(scrollToTop, 50); });
    nextBtn.addEventListener('click', () => { nextQuestion(); setTimeout(scrollToTop, 50); });
    darkModeToggle.addEventListener('click', toggleDarkMode);
    reviewBtn.addEventListener('click', toggleReview);
    retryBtn.addEventListener('click', retryExam);
    newTestBtn.addEventListener('click', startNewExam);
    closeReviewBtn.addEventListener('click', () => reviewSection.style.display = 'none');
    cancelEndBtn.addEventListener('click', () => confirmModal.style.display = 'none');
    confirmEndBtn.addEventListener('click', endExam);
    confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) confirmModal.style.display = 'none'; });

    setupScrollTop();
}