let currentQuestion = 1;
let totalScore = 0;
const totalQuestions = 3;
let answers = []; // Array to store individual answers

// DOM Elements
const progressBar = document.getElementById('progress');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');
const restartBtn = document.getElementById('restart-btn');
const confettiContainer = document.getElementById('confetti');

// Initialize the quiz
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateProgress();
});

function setupEventListeners() {
    // Add click listeners to all answer buttons
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', handleAnswerClick);
    });

    // Restart button listener
    restartBtn.addEventListener('click', restartQuiz);
}

function handleAnswerClick(event) {
    const button = event.target;
    const score = parseInt(button.dataset.score);
    
    // Store individual answer
    answers[currentQuestion - 1] = score;
    
    // Add score to total
    totalScore += score;
    
    // Add click animation
    button.classList.add('pulse');
    
    // Disable all buttons in current question
    const currentQuestionElement = document.querySelector('.question.active');
    const buttons = currentQuestionElement.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.style.pointerEvents = 'none');
    
    // Wait a bit then move to next question
    setTimeout(() => {
        if (currentQuestion < totalQuestions) {
            nextQuestion();
        } else {
            showResults();
        }
    }, 800);
}

function nextQuestion() {
    // Hide current question
    const currentQuestionElement = document.querySelector('.question.active');
    currentQuestionElement.classList.remove('active');
    
    // Show next question
    currentQuestion++;
    const nextQuestionElement = document.querySelector(`[data-question="${currentQuestion}"]`);
    
    setTimeout(() => {
        nextQuestionElement.classList.add('active');
        updateProgress();
    }, 300);
}

function updateProgress() {
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = progressPercentage + '%';
}

function showResults() {
    // Hide quiz container
    setTimeout(() => {
        quizContainer.style.display = 'none';
        resultContainer.classList.remove('hidden');
        
        // Update result content based on score
        updateResultContent();
        
        // Start confetti animation
        createConfetti();
        
    }, 500);
}

function updateResultContent() {
    const resultTitle = document.querySelector('.result-title');
    const resultText = document.querySelector('.result-text');
    const encouragement = document.querySelector('.encouragement');
    
    // Score ranges: 0-2: Beginner, 3-4: Intermediate, 5-6: Advanced
    if (totalScore >= 5) {
        // Advanced - All good!
        resultTitle.textContent = '🎉 כן, אתה בסדר גמור! 🎉';
        resultText.textContent = 'מעולה! אתה מתקדם בצורה מושלמת בקורס. יש לך את כל הכלים הבסיסיים ואתה מוכן להמשיך לשלבים המתקדמים!';
        encouragement.textContent = 'המשך ככה! אתה על הדרך הנכונה להיות מפתח מקצועי. 🚀';
    } else if (totalScore >= 3) {
        // Intermediate - Good progress
        resultTitle.textContent = '👍 אתה בדרך הנכונה! 👍';
        resultText.textContent = 'יופי! אתה מתקדם יפה בקורס. יש לך בסיס טוב, אבל כדאי לחזק עוד כמה נושאים כדי להרגיש בטוח יותר.';
        encouragement.textContent = 'המשך לתרגל ואל תפחד לשאול שאלות. אתה בדרך למקום טוב! 💪';
    } else {
        // Beginner - Need more work
        resultTitle.textContent = '🌱 בואו נתחיל מההתחלה! 🌱';
        resultText.textContent = 'זה בסדר גמור! כולנו מתחילים איפשהו. יש לך את המוטיבציה וזה הדבר הכי חשוב. בואו נעבור יחד על הבסיס.';
        encouragement.textContent = 'אל תתייאש! כל מומחה היה פעם מתחיל. קדימה, בואו נלמד יחד! 🎯';
    }
}

function createConfetti() {
    const colors = ['#00ff41', '#ff0000', '#66ff66', '#33ff33', '#009900', '#cc0000'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti-piece';
            confettiPiece.style.left = Math.random() * 100 + '%';
            confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiPiece.style.animationDelay = Math.random() * 3 + 's';
            confettiPiece.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            // Random shape
            if (Math.random() > 0.5) {
                confettiPiece.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confettiPiece);
            
            // Remove confetti piece after animation
            setTimeout(() => {
                if (confettiPiece.parentNode) {
                    confettiPiece.parentNode.removeChild(confettiPiece);
                }
            }, 5000);
        }, i * 100);
    }
}

function restartQuiz() {
    // Reset variables
    currentQuestion = 1;
    totalScore = 0;
    answers = []; // Clear answers array
    
    // Clear confetti
    confettiContainer.innerHTML = '';
    
    // Reset UI
    resultContainer.classList.add('hidden');
    quizContainer.style.display = 'block';
    
    // Reset questions
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, index) => {
        question.classList.remove('active');
        if (index === 0) {
            question.classList.add('active');
        }
        
        // Re-enable buttons
        const buttons = question.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            btn.style.pointerEvents = 'auto';
            btn.classList.remove('pulse');
        });
    });
    
    // Reset progress
    updateProgress();
}

// Add some fun interactions
document.addEventListener('mousemove', function(e) {
    // Create subtle floating particles on mouse move
    if (Math.random() > 0.98) {
        createFloatingParticle(e.clientX, e.clientY);
    }
});

function createFloatingParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#fff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = 'fadeOut 2s ease-out forwards';
    particle.style.zIndex = '1000';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

// Add fadeOut animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key >= '1' && e.key <= '4') {
        const currentQuestionElement = document.querySelector('.question.active');
        if (currentQuestionElement) {
            const buttons = currentQuestionElement.querySelectorAll('.answer-btn');
            const buttonIndex = parseInt(e.key) - 1;
            if (buttons[buttonIndex] && buttons[buttonIndex].style.pointerEvents !== 'none') {
                buttons[buttonIndex].click();
            }
        }
    }
    
    if (e.key === 'Enter' && !resultContainer.classList.contains('hidden')) {
        restartBtn.click();
    }
});

// Add some encouraging messages during the quiz
const encouragingMessages = [
    "נהדר! 🌟",
    "מעולה! 💪", 
    "כל הכבוד! 🎉",
    "אתה מדהים! ✨"
];

function showEncouragingMessage() {
    const message = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.fontSize = '2rem';
    messageElement.style.fontWeight = 'bold';
    messageElement.style.color = '#00ff41';
    messageElement.style.textShadow = '0 0 3px rgba(0, 255, 65, 0.5)';
    messageElement.style.zIndex = '1001';
    messageElement.style.animation = 'encourageAnimation 1.5s ease-out forwards';
    messageElement.style.pointerEvents = 'none';
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 1500);
}

// Add encourage animation
const encourageStyle = document.createElement('style');
encourageStyle.textContent = `
    @keyframes encourageAnimation {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(encourageStyle); 