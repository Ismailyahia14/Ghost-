// البيانات - جميع الأسئلة الـ 43
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
    {
        id: 4,
        question: "القيادة التي تحتاج إليها الأمة هي قيادة",
        options: [
            { text: "قرآنية", correct: true },
            { text: "وطنية", correct: false },
            { text: "قومية", correct: false },
            { text: "عربية", correct: false }
        ]
    },
    {
        id: 5,
        question: "عقوبات الله على اليهود",
        options: [
            { text: "الذلة والمسكنة", correct: false },
            { text: "يولون الأدبار عند القتال", correct: false },
            { text: "يقاتلون من وراء جدر", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 6,
        question: "مواقف القرآن الكريم وتوجيهات الله لنا تجاه اليهود والنصارى تضمن",
        options: [
            { text: "التحذير منهم واتخاذهم أعداء", correct: false },
            { text: "التحذير من توليهم ومعاداة كل من يتولاهم", correct: false },
            { text: "أهمية الإعداد لكل أسباب القوة لمواجهتهم", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 7,
        question: "من أهداف الحرب الشيطانية الناعمة",
        options: [
            { text: "إفساد الناس من أجل استعبادهم", correct: false },
            { text: "السيطرة المباشرة والتحكم بالإنسان وتجريده من هويته الإيمانية وقيمه ومبادئه", correct: false },
            { text: "كل ما ذكر", correct: true },
            { text: "لا شيء مما ذكر", correct: false }
        ]
    },
    {
        id: 8,
        question: "من أسباب لعن الله لليهود",
        options: [
            { text: "بما عصوا واعتدوا، وعدم التناهي عن المنكر", correct: true },
            { text: "موقف شخصي ضدهم", correct: false },
            { text: "كل ما ذكر", correct: false },
            { text: "لا شيء مما ذكر", correct: false }
        ]
    },
    {
        id: 9,
        question: "لَتَجِدَنَّ أَشَدَّ النَّاسِ عَدَاوَةً لِلَّذِينَ آمَنُوا الْيَهُودَ وَالَّذِينَ أَشْرَكُوا. هذه الآية الكريمة تؤكد على",
        options: [
            { text: "كراهية اليهود للمشركين", correct: false },
            { text: "أن أشد عدو لنا هم اليهود والمشركون", correct: true },
            { text: "عداوة المشركين لليهود", correct: false },
            { text: "كراهية اليهود للنصارى", correct: false }
        ]
    },
    {
        id: 10,
        question: 'قال تعالى: "مَا كَانَ إِبْرَاهِيمُ يَهُودِيًّا وَلَا نَصْرَانِيًّا وَلَكِنْ كَانَ حَنِيفًا مُسْلِمًا" إلا أن اليهود والنصارى عملوا على تقديم الدين باسم قوميتهم، وهذا من',
        options: [
            { text: "حقائق اليهود وصفاتهم", correct: false },
            { text: "خطط اليهود وأساليبهم في استهدافنا", correct: true },
            { text: "المعلومات العامة", correct: false },
            { text: "حقائق تعاملهم مع الكتب المقدسة", correct: false }
        ]
    },
    {
        id: 11,
        question: 'قال تعالى: "كُنْتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ" هذه الخيرية مرتبطة',
        options: [
            { text: "بمسؤولية كبيرة وعظيمة وهي رد الناس إلى دين الله", correct: false },
            { text: "برفع الظلم عن الناس، ولإصلاح العباد وتطهير الأرض من الفساد", correct: false },
            { text: "بعمارة الأرض", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 12,
        question: "طرق اليهود وأساليبهم في استهداف الأمة",
        options: [
            { text: "الخداع والتضليل", correct: false },
            { text: "مغالطتهم الثقافية", correct: false },
            { text: "فصل الأمة عن هويتها الإيمانية", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 13,
        question: "سببان مهمان للنصر",
        options: [
            { text: "الوطنية والإخلاص", correct: false },
            { text: "الإيمان والإسلام", correct: false },
            { text: "الجهاد في سبيل الله تحت قيادة يختارها الله", correct: true },
            { text: "لا شيء مما ذكر", correct: false }
        ]
    },
    {
        id: 14,
        question: '"لَنْ يَضُرُّوكُمْ إِلَّا أَذًى وَإِنْ يُقَاتِلُوكُمْ يُوَلُّوكُمُ الْأَدْبَارَ ثُمَّ لَا يُنْصَرُونَ" هذه الآية الكريمة تخبرنا عن',
        options: [
            { text: "نقاط قوة العدو", correct: false },
            { text: "نقاط ضعف العدو", correct: true },
            { text: "كل ما ذكر", correct: false },
            { text: "لا شيء مما ذكر", correct: false }
        ]
    },
    {
        id: 15,
        question: "هذه الآية تحذرنا من خطورة التفرق",
        options: [
            { text: '"وَلَا تَكُونُوا كَالَّذِينَ تَفَرَّقُوا وَاخْتَلَفُوا مِنْ بَعْدِ مَا جَاءَهُمُ الْبَيِّنَاتُ وَأُولَئِكَ لَهُمْ عَذَابٌ عَظِيمٌ"', correct: true },
            { text: '"وَأَمَّا الَّذِينَ ابْيَضَّتْ وُجُوهُهُمْ فَفِي رَحْمَةِ اللَّهِ هُمْ فِيهَا خَالِدُونَ"', correct: false },
            { text: '"تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ وَمَا اللَّهُ يُرِيدُ ظُلْمًا لِلْعَالَمِينَ"', correct: false },
            { text: '"وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَإِلَى اللَّهِ تُرْجَعُ الْأُمُورُ"', correct: false }
        ]
    },
    {
        id: 16,
        question: '"يَا أَيُّهَا الَّذِينَ آمَنُوا إِنْ تُطِيعُوا فَرِيقًا مِنَ الَّذِينَ أُوتُوا الْكِتَابَ يَرُدُّوكُمْ بَعْدَ إِيمَانِكُمْ كَافِرِينَ" ... تعبر عن',
        options: [
            { text: "خطورة العدو، والتحذير منه", correct: true },
            { text: "أهمية التوحد", correct: false },
            { text: "عدم التفرق", correct: false },
            { text: "لا شيء مما ذكر", correct: false }
        ]
    },
    {
        id: 17,
        question: "القضية الفلسطينية وطوفان الأقصى مسؤولية",
        options: [
            { text: "الفلسطينيين", correct: false },
            { text: "الأمة", correct: true },
            { text: "الشرق الأوسط", correct: false },
            { text: "العرب", correct: false }
        ]
    },
    {
        id: 18,
        question: "من أسباب تعدي اليهود على المسلمين واستهداف رموزها مثل سماحة السيد حسن نصر الله شهيد الإسلام والإنسانية",
        options: [
            { text: "تولي أغلب الأنظمة لليهود والنصارى", correct: false },
            { text: "الواقع الداخلي للأمة", correct: false },
            { text: "قصور النظرة تجاه الخطر الإسرائيلي", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 19,
        question: "قامت اليهود بترويض الأمة على",
        options: [
            { text: "الصمت", correct: true },
            { text: "التحرك", correct: false },
            { text: "الثورة", correct: false },
            { text: "المقاومة", correct: false }
        ]
    },
    {
        id: 20,
        question: "من أهم مجالات الصراع مع العدو الإسرائيلي",
        options: [
            { text: "المجال الإعلامي", correct: false },
            { text: "المجال الاقتصادي", correct: false },
            { text: "المجال الثقافي", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 21,
        question: '"يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا الْيَهُودَ وَالنَّصَارَى أَوْلِيَاءَ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ وَمَنْ يَتَوَلَّهُمْ مِنْكُمْ ..."',
        options: [
            { text: "فإن الله غفور رحيم", correct: false },
            { text: "فإنه منهم", correct: true },
            { text: "فالله بكل شيء عليم", correct: false },
            { text: "فليس بضار الله من شيء", correct: false }
        ]
    },
    {
        id: 22,
        question: "الهدف من دراسة مادة الصراع مع العدو الإسرائيلي",
        options: [
            { text: "لنزداد وعياً", correct: false },
            { text: "لنتحمل المسؤولية", correct: false },
            { text: "لنكون الغالبين", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 23,
        question: "بعض مواصفات بني إسرائيل في القرآن",
        options: [
            { text: "الكفر بكتب الله ورسله وقتلهم", correct: false },
            { text: "أكل أموال الناس بالباطل", correct: false },
            { text: "النقض للعهود والمواثيق", correct: false },
            { text: "كل ما ذكر", correct: true }
        ]
    },
    {
        id: 24,
        question: "كان الحافز الأساسي لتحرك اليهود لبناء كيانهم المزعوم هو",
        options: [
            { text: "الحافز المالي", correct: false },
            { text: "الحافز الاقتصادي", correct: false },
            { text: "الحافز الاجتماعي", correct: false },
            { text: "الحافز الديني", correct: true }
        ]
    },
    {
        id: 25,
        question: "النظام السعودي يمثل",
        options: [
            { text: "الاتجاه المعادي لإسرائيل", correct: false },
            { text: "دولة التوحيد", correct: false },
            { text: "الاتجاه الداعم لحركات المقاومة", correct: false },
            { text: "الاتجاه الموالي والداعم لإسرائيل", correct: true }
        ]
    },
    {
        id: 26,
        question: "الله أمر المسلمين في مواجهة بني إسرائيل",
        options: [
            { text: "إعداد قوة كافية لمواجهتهم", correct: false },
            { text: "إعداد ما استطاعوا من قوة وقتالهم", correct: true },
            { text: "جيوش مجهزة للدفاع عن النفس", correct: false },
            { text: "التسليم بالأمر الواقع", correct: false }
        ]
    },
    {
        id: 27,
        question: "يدعي أهل الكتاب أنه لن يدخل الجنة إلا",
        options: [
            { text: "من آمن بالله ورسله", correct: false },
            { text: "من آمن بكتب الله جميعاً", correct: false },
            { text: "من أحب الخير للناس جميعاً", correct: false },
            { text: "من كان يهودي أو نصراني", correct: true }
        ]
    },
    {
        id: 28,
        question: "الإسرائيليون يثقفون أبنائهم بأن",
        options: [
            { text: "يتركوا العنف والعيش بسلام", correct: false },
            { text: "بثقافة العنف والعداء للمسلمين", correct: true },
            { text: "يكونوا مسالمين لكل شعوب العالم", correct: false },
            { text: "كل الإجابات صحيحة", correct: false }
        ]
    },
    {
        id: 29,
        question: "من أهداف دراسة مقرر الصراع مع العدو الإسرائيلي",
        options: [
            { text: "أن نعمل للتعايش السلمي مع بني إسرائيل", correct: false },
            { text: "لنتحد ونكون الغالبيين بدون مواجهة", correct: false },
            { text: "لنزداد وعياً وبصيرة بأعدائنا ولنكون الغالبيين", correct: true },
            { text: "لنعمل على تقليدهم في كل شيء", correct: false }
        ]
    },
    {
        id: 30,
        question: "عرف اليهود أن القرآن منزل من الله، ومع ذلك",
        options: [
            { text: "حرفوه", correct: false },
            { text: "شككوا فيه", correct: true },
            { text: "أنكروا معرفتهم به", correct: false },
            { text: "عادوا الملائكة", correct: false }
        ]
    },
    {
        id: 31,
        question: "الصراع مع بني إسرائيل",
        options: [
            { text: "حضاري تاريخي", correct: false },
            { text: "تاريخي ديني", correct: false },
            { text: "وجودي كامل", correct: false },
            { text: "حضاري شامل", correct: true }
        ]
    },
    {
        id: 32,
        question: "عندما لا تأخذ كتاب الله بقوة سنصل إلى",
        options: [
            { text: "حالة اللاوعي", correct: false },
            { text: "مرحلة اليقظة بالته", correct: false },
            { text: "أسوأ مما وصل إليه بني إسرائيل", correct: true },
            { text: "بين الإيمان والكفر", correct: false }
        ]
    },
    {
        id: 33,
        question: "من وسائل بني إسرائيل في استهدافنا",
        options: [
            { text: "تطوير أساليب الرباء", correct: false },
            { text: "تحريف الكتب السماوية", correct: false },
            { text: "ليس الحق بالباطل", correct: true },
            { text: "تجنيد النخب علناً للعمل الاستخباراتي", correct: false }
        ]
    },
    {
        id: 34,
        question: "بني إسرائيل يقتلون الأنبياء أي أنهم",
        options: [
            { text: "مجرمون بالفطرة", correct: true },
            { text: "لا يقيمون وزناً للأنبياء", correct: false },
            { text: "لن يوقروا أي دماء", correct: false },
            { text: "غير ذلك", correct: false }
        ]
    },
    {
        id: 35,
        question: "من عوامل نشوء الكيان الإسرائيلي",
        options: [
            { text: "إصرار أمريكا وبريطانيا", correct: false },
            { text: "اهتمام اليهود تخاذل العرب", correct: true },
            { text: "اهتمام الشعوب الأوروبية", correct: false },
            { text: "رغبة العرب في إيواء اليهود", correct: false }
        ]
    },
    {
        id: 36,
        question: "نحن خير أمة أخرجت للناس أي",
        options: [
            { text: "شرف مجرد العرب", correct: false },
            { text: "العالم كله مسئوليتنا", correct: true },
            { text: "وسام الهي برغم الذلة والمهانة", correct: false },
            { text: "نحن أمة السلام المطلق", correct: false }
        ]
    },
    {
        id: 37,
        question: "إحياء حالة العداء لليهود والصهيونية",
        options: [
            { text: "خيار قومي", correct: false },
            { text: "خيار سياسي", correct: false },
            { text: "فريضة فكرية", correct: false },
            { text: "فريضة دينية", correct: true }
        ]
    },
    {
        id: 38,
        question: "نشأ اليهود كيانهم الغاصب في فلسطين انطلاقاً من",
        options: [
            { text: "العامل الديني", correct: true },
            { text: "العامل القوي", correct: false },
            { text: "رغبة الدول الاستعمارية", correct: false },
            { text: "العامل السياسي", correct: false }
        ]
    },
    {
        id: 39,
        question: "الحرب الناعمة هي",
        options: [
            { text: "مصطلح أمريكي غربي موجه", correct: false },
            { text: "حرب تستهدف الهوية الوطنية", correct: false },
            { text: "حرب شيطانية تهدف لإفساد الناس واستبعادهم", correct: true },
            { text: "حرب صهيونية غربية ساخنة لها ضحايا", correct: false }
        ]
    },
    {
        id: 40,
        question: "بعد نشوء الكيان الصهيوني برز اتجاهان في واقع الأمة",
        options: [
            { text: "موالي والآخر مسالم للعدو الصهيوني", correct: false },
            { text: "معادي والآخر مواجه للعدو الصهيوني", correct: false },
            { text: "محايد والآخر موالي للعدو الصهيوني", correct: false },
            { text: "معادي والآخر موالي للعدو الصهيوني", correct: true }
        ]
    },
    {
        id: 41,
        question: "ما يحدث لليمن منذ أكثر من 7 سنوات",
        options: [
            { text: "أزمة داخلية", correct: false },
            { text: "عدوان وحرب سنية شيعية", correct: false },
            { text: "عدوان أمريكي إسرائيلي عربي غاشم", correct: true },
            { text: "عدوان عربي ظالم وحسب", correct: false }
        ]
    },
    {
        id: 42,
        question: "الوعي بخطورة الشيطان والاستعاذة منه",
        options: [
            { text: "نوع من أنواع الأذكار", correct: false },
            { text: "من طرق الوقاية من أخطار الحرب عموماً", correct: false },
            { text: "من طرق الوقاية من أخطار الحرب الناعمة", correct: true },
            { text: "من طرق وأساليب العبادة القلبية", correct: false }
        ]
    },
    {
        id: 43,
        question: "من عوامل نشوء الكيان الصهيوني على أرض فلسطين",
        options: [
            { text: "وعد بلفور ووعد عبدالعزيز آل سعود", correct: false },
            { text: "وعد بلفور وكتاب برسي كوكس", correct: false },
            { text: "قرارات مؤتمر باريس للمصالحة 1918 م", correct: false },
            { text: "قرارات الحركة الصهيونية (بازل 1897 م)", correct: true }
        ]
    }
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
    
    // 
