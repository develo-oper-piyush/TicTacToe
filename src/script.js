let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let msg = document.querySelector("#msg");
const turn_o_sfx = new Audio("turn_o.mp3"),
    turn_x_sfx = new Audio("turn_x.mp3"),
    winner_sfx = new Audio("winner.mp3");

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let turnO = true,
    moveCount = 0,
    gameActive = true,
    winner = "";

function endGame(result) {
    // result = "X" | "O" | "draw"
    gameActive = false;
    winner = result;
    winner_sfx.play();

    msg.textContent =
        result === "draw" ? "The game is a Draw." : `${result} is the Winner`;

    msg.className = msg.className.replace(
        /\btext-(?:amber|emerald|violet)-\d{3}\b/g,
        ""
    );
    msg.classList.add(
        result === "draw" ? "text-violet-500" : "text-emerald-500"
    );

    resetBtn.textContent = "New Game";
    resetBtn.className = resetBtn.className.replace(
        /\b(?:bg|ring|shadow)-\S+/g,
        ""
    );
    let theme = result === "draw" ? "violet" : "emerald";
    resetBtn.classList.add(
        `bg-${theme}-500`,
        `ring-${theme}-400`,
        `shadow-slate-900/5`
    );

    document.querySelector("#game").classList.add("pointer-events-none");
}

function checkWinner() {
    for (let [i, j, k] of winPatterns) {
        let a = boxes[i].textContent,
            b = boxes[j].textContent,
            c = boxes[k].textContent;

        if (a && b === a && c === a) {
            endGame(a);
            return true;
        }
    }
    return false;
}

boxes.forEach((box) =>
    box.addEventListener("click", function () {
        if (!gameActive || box.textContent) return;

        if (turnO) {
            box.classList.remove("text-white", "text-amber-800");
            box.classList.add("text-amber-300");
            box.textContent = "O";
            turn_o_sfx.play();
            msg.textContent = "X's Turn";
        } else {
            box.classList.remove("text-white", "text-amber-300");
            box.classList.add("text-amber-800");
            box.textContent = "X";
            turn_x_sfx.play();
            msg.textContent = "O's Turn";
        }

        turnO = !turnO;
        moveCount++;
        if (!checkWinner() && moveCount === 9) {
            endGame("draw");
        }
    })
);

resetBtn.addEventListener("click", function () {
    turnO = true;
    moveCount = 0;
    gameActive = true;
    winner = "";

    msg.textContent = "O's Turn";
    msg.className = msg.className.replace(
        /\btext-(?:emerald|violet|amber)-\d{3}\b/g,
        ""
    );
    msg.classList.add("text-amber-500");

    resetBtn.textContent = "Reset";
    resetBtn.className = resetBtn.className.replace(
        /\b(?:bg|ring|shadow)-\S+/g,
        ""
    );
    resetBtn.classList.add("bg-[#14213D]", "ring-sec", "shadow-sec");

    document.querySelector("#game").classList.remove("pointer-events-none");

    boxes.forEach((b) => {
        b.textContent = "";
        b.classList.remove("text-amber-300", "text-amber-800");
        b.classList.add("text-white");
    });
});
