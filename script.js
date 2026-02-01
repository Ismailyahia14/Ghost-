// ============ المتغيرات العامة ============
let userAnswers = {};
let score = 0;
let totalQuestions = 43; // عدد الأسئلة الكلي

// ============ تهيئة الموقع ============
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    setupEventListeners();
});

function initializeQuiz() {
    // تخزين الإجابات الصحيحة (يمكن تحميلها من ملف JSON)
    window.correctAnswers = {
        1: 1, 2: 4, 3: 1, 4: 1, 5: 4, 6: 4, 7: 3, 8: 1, 9: 2, 10: 2,
        11: 4, 12: 4, 13: 3, 14: 2, 15: 1, 16: 1, 17: 2, 18: 4, 19: 1, 20: 4,
        21: 2, 22: 4, 23: 4, 24: 4, 25: 4, 26: 2, 27: 4, 28: 2, 29: 3, 30: 2,
        31: 4, 32: 3, 33: 3, 34: 1, 35: 2, 36: 2, 37: 4, 38: 1, 39: 3, 40: 4,
        41: 3, 42: 3, 43: 4
    };

    // تهيئة كائن الإجابات
    userAnswers = {};
    score = 0;
    updateProgressBar();
}

function setupEventListeners() {
    // زر تبديل الوضع الليلي
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    
    // زر عرض النتيجة النهائية
    document.getElementById('showResults').addEventListener('click', showFinalResults);
    
    // زر إعادة المحاولة
    document.getElementById('restartQuiz').addEventListener('click', restartQuiz);
    
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
