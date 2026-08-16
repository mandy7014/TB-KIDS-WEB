// =========================
// 首頁 → 故事
// =========================

function startGame() {

    window.location.href = "story.html";

}


// =========================
// 故事 → 角色選擇
// =========================

function goToCharacter() {

    window.location.href = "character.html";

}


// =========================
// 角色選擇
// =========================

let selectedCharacter = null;


function selectCharacter(character) {

    selectedCharacter = character;

    const choices =
        document.querySelectorAll(
            ".character-choice"
        );


    choices.forEach(function(choice) {

        choice.classList.remove("selected");

    });


    if (character === "boy") {

        choices[0].classList.add("selected");

        document.getElementById(
            "selected-message"
        ).textContent =
            "👦 你選擇了小男孩！";

    }


    if (character === "girl") {

        choices[1].classList.add("selected");

        document.getElementById(
            "selected-message"
        ).textContent =
            "👧 你選擇了小女孩！";

    }


    document.getElementById(
        "confirm-button"
    ).disabled = false;

}


function confirmCharacter() {

    if (selectedCharacter === null) {

        return;

    }


    localStorage.setItem(
        "playerCharacter",
        selectedCharacter
    );


    window.location.href =
        "map.html";

}


// =========================
// 關卡地圖
// =========================

function startLevel(level) {

    if (level === 1) {

        window.location.href =
            "level1.html";

    }


    if (level === 2) {

        const completed =
            localStorage.getItem(
                "level1Completed"
            );


        if (completed === "true") {

            window.location.href =
                "level2.html";

        }

        else {

            alert(
                "🔒 請先完成第一關喔！"
            );

        }

    }

}


// =========================
// 第一關
// =========================

let level1Completed = false;


function checkAnswer(answer) {

    const feedback =
        document.getElementById(
            "feedback"
        );


    const answers =
        document.querySelectorAll(
            ".answer"
        );


    answers.forEach(function(button) {

        button.disabled = true;

    });


    if (answer === "bacteria") {

        feedback.textContent =
            "🎉 答對了！肺結核是由結核菌造成的！";

        feedback.style.color =
            "#43a047";


        answers[0].classList.add(
            "correct"
        );


        document.getElementById(
            "score"
        ).textContent =
            "⭐ 100 分";


        document.getElementById(
            "next-button"
        ).style.display =
            "inline-block";


        level1Completed = true;

    }

    else {

        feedback.textContent =
            "💡 再想一想！肺結核不是由這個造成的喔。";

        feedback.style.color =
            "#e53935";


        answers.forEach(function(button) {

            button.disabled = false;

        });


        const wrongButton =
            document.querySelector(
                `button[onclick="checkAnswer('${answer}')"]`
            );


        if (wrongButton) {

            wrongButton.classList.add(
                "wrong"
            );

        }

    }

}


function finishLevel1() {

    if (!level1Completed) {

        return;

    }


    localStorage.setItem(
        "level1Completed",
        "true"
    );


    window.location.href =
        "map.html";

}


// =========================
// 第二關
// =========================

const level2Questions = [

    {
        icon: "😷",
        title: "情境 1",
        text: "有肺結核的患者在室內咳嗽。",
        answer: true
    },

    {
        icon: "🌬️",
        title: "情境 2",
        text: "室內空氣不流通，長時間和具有傳染性的肺結核患者共處。",
        answer: true
    },

    {
        icon: "🤝",
        title: "情境 3",
        text: "和朋友握手。",
        answer: false
    },

    {
        icon: "🍽️",
        title: "情境 4",
        text: "和朋友一起吃飯、共用餐具。",
        answer: false
    }

];


let currentLevel2Question = 0;

let level2Score = 0;

let level2Answered = false;


function showLevel2Question() {

    const question =
        level2Questions[
            currentLevel2Question
        ];


    document.getElementById(
        "scenario-icon"
    ).textContent =
        question.icon;


    document.getElementById(
        "scenario-title"
    ).textContent =
        question.title;


    document.getElementById(
        "scenario-text"
    ).textContent =
        question.text;


    document.getElementById(
        "level2-feedback"
    ).textContent =
        "";


    document.getElementById(
        "next-question"
    ).style.display =
        "none";


    document.getElementById(
        "finish-level2"
    ).style.display =
        "none";


    level2Answered = false;


    document
        .querySelectorAll(".answer")
        .forEach(function(button) {

            button.disabled = false;

            button.classList.remove(
                "correct",
                "wrong"
            );

        });

}


function answerLevel2(userAnswer) {

    if (level2Answered) {

        return;

    }


    level2Answered = true;


    const correctAnswer =
        level2Questions[
            currentLevel2Question
        ].answer;


    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(function(button) {

        button.disabled = true;

    });


    if (userAnswer === correctAnswer) {

        level2Score++;


        document.getElementById(
            "level2-feedback"
        ).textContent =
            "🎉 答對了！你是傳播小偵探！";


        document.getElementById(
            "level2-feedback"
        ).style.color =
            "#43a047";


        document.getElementById(
            "level2-score"
        ).textContent =
            "⭐ " +
            level2Score +
            " / 4";

    }

    else {

        document.getElementById(
            "level2-feedback"
        ).textContent =
            "💡 再想一想！這不是肺結核主要的傳播方式喔。";


        document.getElementById(
            "level2-feedback"
        ).style.color =
            "#e53935";

    }


    if (
        currentLevel2Question <
        level2Questions.length - 1
    ) {

        document.getElementById(
            "next-question"
        ).style.display =
            "inline-block";

    }

    else {

        document.getElementById(
            "finish-level2"
        ).style.display =
            "inline-block";

    }

}


function nextLevel2Question() {

    currentLevel2Question++;

    showLevel2Question();

}


function finishLevel2() {

    localStorage.setItem(
        "level2Completed",
        "true"
    );


    window.location.href =
        "map.html";

}
