// Step 7: Functions
function markAnswer(i) {
    poll.selectedAnswer = +i;
    try {
        document.querySelector(".poll .answer.selected").classList.remove("selected");
    } catch (msg) {}
    document.querySelectorAll(".poll .answers .answer")[i].classList.add("selected");
    showResults();
}

function showResults() {
    let answers = document.querySelectorAll(".poll .answers .answer");
    for (let i = 0; i < answers.length; i++) {
        let percentage = 0;
        if (i === poll.selectedAnswer) {
            percentage = Math.round((poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1));
        } else {
            percentage = Math.round((poll.answersWeight[i]) * 100 / (poll.pollCount + 1));
        }
        answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
        answers[i].querySelector(".percentage-value").innerText = percentage + "%";
    }
}

// Step 1: Define your array of polls
window.onload = function(){
let todaysPoll = [
    [
        "Who is most likely to lead a drug cartel?",
        ["Stefan Niedes", "Christian Hernia", "Nina Claudia Del Rosario", "Samantha Lansoy", "Michaela Borces"]
    ],
    [
        "Who would win a hotdog eating contest?",
        ["Keith Ashly Domingo", "Christian Joseph Hernia", "Eryl Joseph Aspera", "I am out of names", "I don't know"]
    ]
];

// Step 2: Randomly pick a poll
let randomIndex = Math.floor(Math.random() * todaysPoll.length);
let [question, options] = todaysPoll[randomIndex];

// Step 3: Trim to 4 answers (optional, if needed)
let selectedAnswers = options.slice(0, 5); 

// Step 4: Create the poll object
let poll = {
    question: question,
    answers: selectedAnswers,
    pollCount: 20,
    answersWeight: [4, 4, 2, 10], // Make sure length matches answers
    selectedAnswer: -1
};

// Step 5: DOM elements
let pollDOM = {
    question: document.querySelector(".poll .question"),
    answers: document.querySelector(".poll .answers")
};

// Step 6: Assign question and answers to DOM
pollDOM.question.innerText = poll.question;
pollDOM.answers.innerHTML = poll.answers.map(function(answer, i) {
    return (
        `
        <div class="answer" onclick="markAnswer('${i}')">
            ${answer}
            <span class="percentage-bar"></span>
            <span class="percentage-value"></span>
        </div>
        `
    );
}).join("");

}