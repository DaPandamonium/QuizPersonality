document.addEventListener('DOMContentLoaded', function () {
    const welcomeMessage = document.getElementById('welcome-message');
    const characterSelection = document.getElementById('character-selection');
    const startButtonContainer = document.getElementById('start-button-container');
    const questionScreen = document.getElementById('question-screen');
    const resultScreen = document.getElementById('result-screen');
    const answersContainer = document.getElementById('answers');
    const progressBar = document.getElementById('progress-bar');


    let currentQuestionIndex = 0;
    let scores = { "AI/ML": 0, "Python": 0, "C#": 0, "HTML/CSS": 0, "JavaScript": 0, "React": 0, "Designer": 0 };

    document.getElementById('welcome-message').querySelector('button').addEventListener('click', showCharacterSelection);


    const questions = [
        {
            question: "You're about to embark on a digital adventure. Which tech gadget would you pack first?",
            answers: ["Smartphone", "SmartWatch", "Console", "Laptop"]
        },
        {
            question: "As you cross the bridge of Binary Streams, what color do you wish the bridge to be?",
            answers: ["Blue", "Red", "Green", "Black"]
        },
        {
            question: "You've discovered a hidden path that splits into four. Which path do you take, each leading to a different terrain?",
            answers: ["Beach", "Mountains", "City Tour", "Staycation"]
        },
        {
            question: "An old wizard offers you a game to test your intellect. Which type do you choose?",
            answers: ["Strategy", "Adventure", "Puzzle", "Action"]
        },
        {
            question: "In a tavern, you overhear coders discussing cloud services. Which service would you recommend?",
            answers: ["AWS", "Google Cloud", "Azure", "DigitalOcean"]
        },
        {
            question: "A local coder asks about your preferred tool in the crafting halls. What do you show them?",
            answers: ["JetBrains IDEs", "VS Code", "Sublime Text", "Vim"]
        },
        {
            question: "At a festive gathering, you're asked to choose the music that sets the mood for coding. What's your pick?",
            answers: ["Electronic", "Classical", "Rock", "Lofi Hip-Hop"]
        },
        {
            question: "You stumble upon a magical potion that enhances focus. What flavor is it?",
            answers: ["Coffee", "Tea", "Beer", "Smoothie"]
        },
        {
            question: "A legendary developer offers to teach you to build any type of project. What do you choose to learn?",
            answers: ["Web App", "Mobile App", "Data Science", "Game Dev"]
        },
        {
            question: "As you reach the end of your journey, you find a portal that leads to a developer's paradise. Which operating system powers it?",
            answers: ["Windows", "macOS", "Linux", "Chrome OS"]
        }
    ];
    
    const answerMapping = {
        "Smartphone": "JavaScript",
        "SmartWatch": "React",
        "Console": "C#",
        "Laptop": "C#",
        "Blue": "JavaScript",
        "Red": "React",
        "Green": "Python",
        "Black": "Designer",
        "Beach": "HTML/CSS",
        "Mountains": "Python",
        "City Tour": "JavaScript",
        "Staycation": "AI/ML",
        "Strategy": "Python",
        "Adventure": "JavaScript",
        "Puzzle": "AI/ML",
        "Action": "C#",
        "AWS": "Python",
        "Google Cloud": "AI/ML",
        "Azure": "C#",
        "DigitalOcean": "Python",
        "JetBrains IDEs": "C#",
        "VS Code": "JavaScript",
        "Sublime Text": "HTML/CSS",
        "Vim": "React",
        "Electronic": "JavaScript",
        "Classical": "Python",
        "Rock": "C#",
        "Lofi Hip-Hop": "Designer",
        "Coffee": "JavaScript",
        "Tea": "Python",
        "Beer": "C#",
        "Smoothie": "Designer",
        "Web App": "JavaScript",
        "Mobile App": "React",
        "Data Science": "Python",
        "Game Dev": "C#",
        "Windows": "C#",
        "macOS": "JavaScript",
        "Linux": "Python",
        "Chrome OS": "HTML/CSS"
    };
    


    const languageLogos = {
        "HTML/CSS": "html-css-logo.png",
        "Python": "python-logo.png",
        "AI/ML": "ai-ml-logo.png",
        "JavaScript": "javascript-logo.png",
        "C#": "csharp-logo.png",
        "React": "react-logo.png",
        "Designer": "design-logo.png"
    };
    


    document.getElementById('character1Button').addEventListener('click', function () {
        selectCharacter('Character 1', './assets/character1.png');
    });
    document.getElementById('character2Button').addEventListener('click', function () {
        selectCharacter('Character 2', './assets/character2.png');
    });
    document.getElementById('startQuizButton').addEventListener('click', startQuiz);

    function showCharacterSelection() {
        welcomeMessage.style.display = 'none';
        characterSelection.style.display = 'block';
    }

    function selectCharacter(character, imgSrc) {
        console.log("Character selected:", character, "with image:", imgSrc);
        sessionStorage.setItem('selectedAvatar', imgSrc);
    
        characterSelection.style.display = 'none';
        startButtonContainer.style.display = 'block';
    }
    



    function startQuiz() {
        startButtonContainer.style.display = 'none';
        questionScreen.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }
        const question = questions[currentQuestionIndex];
        document.getElementById('question').textContent = question.question;
        answersContainer.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('nes-btn', 'is-primary');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(answer));
            answersContainer.appendChild(button);
        });
        updateProgressBar();
    }

    function selectAnswer(answer) {
        console.log("Selected answer:", answer);
        if (answerMapping[answer]) {
            scores[answerMapping[answer]]++;
            console.log("Updated scores:", scores);
        } else {
            console.error("No mapping found for answer:", answer);
        }
        Array.from(answersContainer.children).forEach(button => button.disabled = true);
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 800);
    }


    function updateProgressBar() {
        const progressPercentage = (currentQuestionIndex + 1) / questions.length * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    function endQuiz() {
        const highestScoreKey = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        console.log("Final highest score key:", highestScoreKey);
    
        const characterSrc = sessionStorage.getItem('selectedAvatar');
        const logoSrc = `./assets/${languageLogos[highestScoreKey]}`;
    
        document.getElementById('result').textContent = ` ${highestScoreKey}!`;
        document.getElementById('character-img').src = characterSrc;
        document.getElementById('language-logo').src = logoSrc;
    
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        document.getElementById('result-buttons').style.display = 'block';
    }

});


function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch(err => console.error("Error copying link: ", err));
}

function downloadResultAsImage() {
    html2canvas(document.getElementById('result-screen')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'quiz-result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(err => console.error("Error generating image:", err));
}


function shareOnTwitter() {
    const text = encodeURIComponent(`Check out my developer personality! ${document.getElementById('result').textContent} Discover yours at `);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function postOnCodedex() {
    const resultText = `Check out my developer personality! ${document.getElementById('result').textContent}`;

    navigator.clipboard.writeText(resultText).then(() => {
        alert("Result text copied to clipboard. Now downloading the result image...");

        html2canvas(document.getElementById('result-screen')).then(canvas => {
            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'developer-personality-result.png';
                link.click();

                window.open(`https://www.codedex.io/community/post`, '_blank');
                alert("Paste the copied text and upload the downloaded image on Codédex.");
            });
        });

    }).catch(err => {
        console.error("Failed to copy result text: ", err);
        alert("Failed to copy text. Please manually copy the text from this page.");
        window.open(`https://www.codedex.io/community/post`, '_blank');
    });
}

function closeModal() {
    document.getElementById('intro-modal').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
}




