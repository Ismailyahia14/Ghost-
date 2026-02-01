// البيانات - الأسئلة والإجابات
const questions = [
    {
        id: 1,
        question: "مسؤوليتنا اليوم تجاه العدو الإسرائيلي",
        options: [
            { text: "إحياء حالة العداء له", correct: true },
            { text: "الولاء له", correct: false },
            { text: "مسح النظرة العدائية له", correct: false },
            { text: "التطبيع معه", correct: false }
        ]
    },
    {
        id: 2,
        question: "عرض القرآن الكريم للنفسية اليهودية",
        options: [
            { text: "لا يودون أن ينزل على الناس من خير من ربهم", correct: false },
            { text: "أشد عداوة للمؤمنين", correct: false },
            { text: "العدوانية والوحشية", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 3,
        question: "الصراع بين الحق والباطل",
        options: [
            { text: "سنة إلهية", correct: true },
            { text: "أمر قليل الحدوث", correct: false },
            { text: "يحصل غالباً", correct: false },
            { text: "قضية عبثية", correct: false }
        ]
    },
    // ... يمكنك إضافة بقية الأسئلة هنا
    // لاحظ: لقد قمت بإضافة أول 3 أسئلة كمثال. تحتاج لإضافة بقية الأسئلة
];

// متغيرات التطبيق
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let startTime = null;
let timerInterval = null;
let timeLeft = 60 * 60; // 60 دقيقة بالثواني
let examCompleted = false;

// عناصر DOM
const startScreen = document.getElementById('startScreen');
const examScreen = document.getElementById('examScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startExamBtn = document.getElementById('startExamBtn');
const endExamBtn = document.getElementById('endExamBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const optionsContainer = document.getElementById('optionsContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const timer = document.getElementById('timer');
const darkModeToggle = document.getElementById('darkModeToggle');
const timerToggle = document.getElementById('timerToggle');
const reviewBtn = document.getElementById('reviewBtn');
const retryBtn = document.getElementById('retryBtn');
const reviewSection = document.getElementById('reviewSection');
const reviewList = document.getElementById('reviewList');
const finalScore = document.getElementById('finalScore');
const percentage = document.getElementById('percentage');
const correctAnswers = document.getElementById('correctAnswers');
const wrongAnswers = document.getElementById('wrongAnswers');
const timeTaken = document.getElementById('timeTaken');
const scoreCircle = document.getElementById('scoreCircle');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    // تعيين الوضع الليلي إذا كان محفوظاً
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // تعيين إعدادات المؤقت
    if (localStorage.getItem('showTimer') === 'false') {
        timer.style.display = 'none';
        timerToggle.innerHTML = '<i class="fas fa-clock-slash"></i>';
    }

    // تهيئة الحدث
    initializeEventListeners();
});

// تهيئة مستمعي الأحداث
function initializeEventListeners() {
    startExamBtn.addEventListener('click', startExam);
    endExamBtn.addEventListener('click', endExam);
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    darkModeToggle.addEventListener('click', toggleDarkMode);
    timerToggle.addEventListener('click', toggleTimer);
    reviewBtn.addEventListener('click', toggleReview);
    retryBtn.addEventListener('click', retryExam);
}

// بدء الامتحان
function startExam() {
    startScreen.classList.remove('active');
    examScreen.classList.add('active');
    
    startTime = new Date();
    timeLeft = 60 * 60;
    startTimer();
    loadQuestion(currentQuestion);
}

// تحميل السؤال
function loadQuestion(index) {
    const question = questions[index];
    
    questionNumber.textContent = `السؤال ${question.id}`;
    questionText.textContent = question.question;
    
    // تحديث شريط التقدم
    const progress = ((index + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `السؤال ${index + 1} من ${questions.length}`;
    
    // تحديث أزرار التنقل
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === questions.length - 1 ? 'إنهاء' : 'التالي';
    
    // تحميل الخيارات
    optionsContainer.innerHTML = '';
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        
        const marker = document.createElement('div');
        marker.className = 'option-marker';
        marker.textContent = String.fromCharCode(1632 + optionIndex); // أرقام عربية
        
        const text = document.createElement('div');
        text.className = 'option-text';
        text.textContent = option.text;
        
        optionElement.appendChild(marker);
        optionElement.appendChild(text);
        
        optionElement.addEventListener('click', () => selectOption(optionIndex));
        optionsContainer.appendChild(optionElement);
    });
}

// اختيار إجابة
function selectOption(optionIndex) {
    userAnswers[currentQuestion] = optionIndex;
    loadQuestion(currentQuestion);
}

// السؤال السابق
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

// السؤال التالي
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    } else {
        endExam();
    }
}

// بدء المؤقت
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            endExam();
        }
    }, 1000);
}

// تحديث عرض المؤقت
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // تغيير اللون عند انخفاض الوقت
    if (timeLeft < 300) { // أقل من 5 دقائق
        timer.style.color = 'var(--accent-color)';
    } else if (timeLeft < 600) { // أقل من 10 دقائق
        timer.style.color = 'var(--warning-color)';
    }
}

// إنهاء الامتحان
function endExam() {
    clearInterval(timerInterval);
    examCompleted = true;
    
    examScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    calculateResults();
}

// حساب النتائج
function calculateResults() {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    
    // حساب الإجابات الصحيحة والخاطئة
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        
        if (userAnswer === null) {
            unansweredCount++;
        } else if (question.options[userAnswer].correct) {
            correctCount++;
        } else {
            wrongCount++;
        }
    });
    
    // حساب النتيجة
    const score = correctCount * (50 / questions.length);
    const scorePercentage = (correctCount / questions.length) * 100;
    
    // تحديث العناصر
    finalScore.textContent = `${score.toFixed(1)}/50`;
    percentage.textContent = `${scorePercentage.toFixed(1)}%`;
    correctAnswers.textContent = correctCount;
    wrongAnswers.textContent = wrongCount;
    
    // حساب الوقت المستغرق
    const endTime = new Date();
    const timeDiff = Math.floor((endTime - startTime) / 1000);
    const minutesTaken = Math.floor(timeDiff / 60);
    const secondsTaken = timeDiff % 60;
    timeTaken.textContent = `${minutesTaken}:${secondsTaken.toString().padStart(2, '0')}`;
    
    // تحديث دائرة النتيجة
    const circleLength = 565;
    const offset = circleLength - (circleLength * (scorePercentage / 100));
    scoreCircle.style.strokeDashoffset = offset;
    
    // تغيير لون الدائرة بناءً على النتيجة
    if (scorePercentage >= 80) {
        scoreCircle.style.stroke = 'var(--success-color)';
    } else if (scorePercentage >= 60) {
        scoreCircle.style.stroke = 'var(--warning-color)';
    } else {
        scoreCircle.style.stroke = 'var(--accent-color)';
    }
}

// تبديل الوضع الليلي
function toggleDarkMode() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.body.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', 'false');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'true');
    }
}

// تبديل عرض المؤقت
function toggleTimer() {
    const isVisible = timer.style.display !== 'none';
    
    if (isVisible) {
        timer.style.display = 'none';
        timerToggle.innerHTML = '<i class="fas fa-clock-slash"></i>';
        localStorage.setItem('showTimer', 'false');
    } else {
        timer.style.display = 'block';
        timerToggle.innerHTML = '<i class="fas fa-clock"></i>';
        localStorage.setItem('showTimer', 'true');
    }
}

// عرض/إخفاء المراجعة
function toggleReview() {
    const isVisible = reviewSection.style.display === 'block';
    
    if (isVisible) {
        reviewSection.style.display = 'none';
        reviewBtn.innerHTML = '<i class="fas fa-list"></i> مراجعة الإجابات';
    } else {
        reviewSection.style.display = 'block';
        reviewBtn.innerHTML = '<i class="fas fa-times"></i> إخفاء المراجعة';
        generateReview();
    }
}

// توليد مراجعة الإجابات
function generateReview() {
    reviewList.innerHTML = '';
    
    questions.forEach((question, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';
        questionDiv.textContent = `${index + 1}. ${question.question}`;
        
        const answersDiv = document.createElement('div');
        answersDiv.className = 'review-answers';
        
        // إضافة إجابة المستخدم
        const userAnswerIndex = userAnswers[index];
        if (userAnswerIndex !== null) {
            const userAnswerItem = document.createElement('div');
            userAnswerItem.className = 'answer-item user-answer';
            userAnswerItem.innerHTML = `
                <i class="fas fa-user"></i>
                <span>إجابتك: ${question.options[userAnswerIndex].text}</span>
            `;
            answersDiv.appendChild(userAnswerItem);
        }
        
        // إضافة الإجابة الصحيحة
        const correctOption = question.options.find(option => option.correct);
        const correctAnswerItem = document.createElement('div');
        correctAnswerItem.className = 'answer-item correct-answer';
        correctAnswerItem.innerHTML = `
            <i class="fas fa-check"></i>
            <span>الإجابة الصحيحة: ${correctOption.text}</span>
        `;
        answersDiv.appendChild(correctAnswerItem);
        
        reviewItem.appendChild(questionDiv);
        reviewItem.appendChild(answersDiv);
        reviewList.appendChild(reviewItem);
    });
}

// إعادة المحاولة
function retryExam() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    examCompleted = false;
    
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    reviewSection.style.display = 'none';
    reviewBtn.innerHTML = '<i class="fas fa-list"></i> مراجعة الإجابات';
}    
    // زر مقارنة الإجابات
    document.getElementById('compareAnswers').addEventListener('click', compareAllAnswers);
    
    // متابعة تغيير الإجابات
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const questionId = this.name.replace('q', '');
            const answerValue = this.value;
            userAnswers[questionId] = parseInt(answerValue);
            updateProgressBar();
        });
    });
}

// ============ وظيفة التحقق من إجابة واحدة ============
function checkSingleAnswer(button) {
    const questionCard = button.closest('.question-card');
    const questionId = questionCard.dataset.questionId;
    const selectedOption = questionCard.querySelector('input:checked');
    const resultDiv = questionCard.querySelector('.result');
    
    if (!selectedOption) {
        resultDiv.innerHTML = '<span style="color: orange;">⚠️ الرجاء اختيار إجابة</span>';
        resultDiv.classList.remove('hidden');
        return;
    }
    
    const answerValue = parseInt(selectedOption.value);
    userAnswers[questionId] = answerValue;
    
    // التحقق من الإجابة
    const isCorrect = (answerValue === correctAnswers[questionId]);
    
    // تلوين الإجابات
    const options = questionCard.querySelectorAll('.option');
    options.forEach(option => {
        const optionValue = parseInt(option.querySelector('input').value);
        option.classList.remove('correct', 'wrong');
        
        if (optionValue === correctAnswers[questionId]) {
            option.classList.add('correct');
        } else if (optionValue === answerValue && !isCorrect) {
            option.classList.add('wrong');
        }
    });
    
    // عرض النتيجة
    if (isCorrect) {
        resultDiv.innerHTML = '<span style="color: var(--correct-color);">✅ إجابة صحيحة</span>';
        if (!questionCard.classList.contains('answered-correctly')) {
            score++;
            questionCard.classList.add('answered-correctly');
        }
    } else {
        resultDiv.innerHTML = '<span style="color: var(--wrong-color);">❌ إجابة خاطئة</span>';
    }
    
    resultDiv.classList.remove('hidden');
    updateProgressBar();
    updateScore();
}

// ============ عرض النتيجة النهائية ============
function showFinalResults() {
    // حساب الدرجة
    let calculatedScore = 0;
    const total = Object.keys(correctAnswers).length;
    
    Object.keys(userAnswers).forEach(qId => {
        if (userAnswers[qId] === correctAnswers[qId]) {
            calculatedScore++;
        }
    });
    
    score = calculatedScore;
    
    // إنشاء رسالة النتيجة
    const percentage = Math.round((score / total) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        message = 'ممتاز! نتيجة رائعة';
        emoji = '🎉';
    } else if (percentage >= 70) {
        message = 'جيد جداً';
        emoji = '👍';
    } else if (percentage >= 50) {
        message = 'مقبول، يمكنك التحسين';
        emoji = '📚';
    } else {
        message = 'يحتاج إلى مراجعة';
        emoji = '🔍';
    }
    
    // عرض النتيجة في مودال
    const resultsHTML = `
        <div class="results-modal">
            <div class="results-content">
                <h3>النتيجة النهائية ${emoji}</h3>
                <div class="score-circle">
                    <div class="score-number">${score}/${total}</div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <p class="result-message">${message}</p>
                
                <div class="detailed-results">
                    <h4>تفاصيل النتيجة:</h4>
                    <div class="result-stats">
                        <div class="stat correct-stat">
                            <span class="stat-label">الإجابات الصحيحة:</span>
                            <span class="stat-value">${score}</span>
                        </div>
                        <div class="stat wrong-stat">
                            <span class="stat-label">الإجابات الخاطئة:</span>
                            <span class="stat-value">${total - score}</span>
                        </div>
                        <div class="stat unanswered-stat">
                            <span class="stat-label">الأسئلة غير المجابة:</span>
                            <span class="stat-value">${total - Object.keys(userAnswers).length}</span>
                        </div>
                    </div>
                </div>
                
                <div class="results-buttons">
                    <button id="closeResults" class="btn">إغلاق</button>
                    <button id="compareAll" class="btn">مقارنة جميع الإجابات</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة المودال للصفحة
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = resultsHTML;
    document.body.appendChild(modalContainer);
    
    // إضافة أحداث للأزرار داخل المودال
    document.getElementById('closeResults').addEventListener('click', () => {
        modalContainer.remove();
    });
    
    document.getElementById('compareAll').addEventListener('click', () => {
        modalContainer.remove();
        compareAllAnswers();
    });
}

// ============ مقارنة جميع الإجابات ============
function compareAllAnswers() {
    // إنشاء صفحة مقارنة
    const comparisonHTML = `
        <div class="comparison-page">
            <div class="comparison-header">
                <h2>📊 مقارنة الإجابات</h2>
                <button id="backToQuiz" class="btn">العودة للاختبار</button>
            </div>
            
            <div class="comparison-summary">
                <h3>ملخص النتائج</h3>
                <div class="summary-grid">
                    ${generateComparisonSummary()}
                </div>
            </div>
            
            <div class="detailed-comparison">
                <h3>تفاصيل الإجابات</h3>
                <div class="comparison-table-container">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>رقم السؤال</th>
                                <th>إجابتك</th>
                                <th>الإجابة الصحيحة</th>
                                <th>الحالة</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateComparisonRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // إخفاء الأسئلة وإظهار المقارنة
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('comparisonContainer').innerHTML = comparisonHTML;
    document.getElementById('comparisonContainer').classList.remove('hidden');
    
    // زر العودة
    document.getElementById('backToQuiz').addEventListener('click', () => {
        document.getElementById('comparisonContainer').classList.add('hidden');
        document.getElementById('quizContainer').classList.remove('hidden');
    });
}

function generateComparisonSummary() {
    let correctCount = 0;
    let wrongCount = 0;
    let unanswered = 0;
    
    Object.keys(correctAnswers).forEach(qId => {
        if (userAnswers[qId]) {
            if (userAnswers[qId] === correctAnswers[qId]) {
                correctCount++;
            } else {
                wrongCount++;
            }
        } else {
            unanswered++;
        }
    });
    
    return `
        <div class="summary-item correct">
            <div class="summary-icon">✅</div>
            <div class="summary-text">
                <div class="summary-count">${correctCount}</div>
                <div class="summary-label">صحيحة</div>
            </div>
        </div>
        <div class="summary-item wrong">
            <div class="summary-icon">❌</div>
            <div class="summary-text">
                <div class="summary-count">${wrongCount}</div>
                <div class="summary-label">خاطئة</div>
            </div>
        </div>
        <div class="summary-item unanswered">
            <div class="summary-icon">❓</div>
            <div class="summary-text">
                <div class="summary-count">${unanswered}</div>
                <div class="summary-label">غير مجابة</div>
            </div>
        </div>
    `;
}

function generateComparisonRows() {
    let rows = '';
    
    Object.keys(correctAnswers).forEach(qId => {
        const userAnswer = userAnswers[qId];
        const correctAnswer = correctAnswers[qId];
        const isCorrect = userAnswer === correctAnswer;
        const isAnswered = userAnswer !== undefined;
        
        let userAnswerText = isAnswered ? `الخيار ${userAnswer}` : 'لم تتم الإجابة';
        let correctAnswerText = `الخيار ${correctAnswer}`;
        let status = isAnswered ? (isCorrect ? '✅ صحيحة' : '❌ خاطئة') : '⚠️ غير مجابة';
        let rowClass = isAnswered ? (isCorrect ? 'correct-row' : 'wrong-row') : 'unanswered-row';
        
        rows += `
            <tr class="${rowClass}">
                <td>${qId}</td>
                <td>${userAnswerText}</td>
                <td>${correctAnswerText}</td>
                <td>${status}</td>
            </tr>
        `;
    });
    
    return rows;
}

// ============ إعادة المحاولة ============
function restartQuiz() {
    if (confirm('هل تريد إعادة الاختبار؟ سيتم مسح جميع إجاباتك.')) {
        // مسح جميع الإجابات
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        
        // مسح نتائج الأسئلة
        document.querySelectorAll('.question-card').forEach(card => {
            card.classList.remove('answered-correctly');
            card.querySelectorAll('.option').forEach(option => {
                option.classList.remove('correct', 'wrong');
            });
            card.querySelector('.result').classList.add('hidden');
        });
        
        // إعادة التعيين
        userAnswers = {};
        score = 0;
        updateProgressBar();
        updateScore();
        
        // إذا كان في صفحة المقارنة، العودة للأسئلة
        document.getElementById('comparisonContainer').classList.add('hidden');
        document.getElementById('quizContainer').classList.remove('hidden');
        
        // التمرير للأعلى
        window.scrollTo(0, 0);
    }
}

// ============ تحديث شريط التقدم ============
function updateProgressBar() {
    const answered = Object.keys(userAnswers).length;
    const progressPercentage = (answered / totalQuestions) * 100;
    
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${answered}/${totalQuestions}`;
    }
}

function updateScore() {
    const scoreElement = document.getElementById('currentScore');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

// ============ تبديل الوضع الليلي ============
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#darkModeToggle i');
    const button = document.querySelector('#darkModeToggle');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        button.innerHTML = '<i class="fas fa-sun"></i> الوضع النهاري';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        button.innerHTML = '<i class="fas fa-moon"></i> الوضع الليلي';
        localStorage.setItem('theme', 'light');
    }
}

