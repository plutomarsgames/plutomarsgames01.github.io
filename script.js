const size = 8;
const minesCount = 10;
let board = [];

function startGame() {
    const game = document.getElementById("game");
    game.innerHTML = "";
    board = [];

    // Create board
    for (let i = 0; i < size * size; i++) {
        board.push({
            mine: false,
            revealed: false
        });
    }

    // Place mines
    let placed = 0;
    while (placed < minesCount) {
        let index = Math.floor(Math.random() * board.length);
        if (!board[index].mine) {
            board[index].mine = true;
            placed++;
        }
    }

    // Create UI
    board.forEach((cell, index) => {
        const div = document.createElement("div");
        div.classList.add("cell");

        div.onclick = () => revealCell(index, div);

        game.appendChild(div);
    });
}

function revealCell(index, element) {
    if (board[index].revealed) return;

    board[index].revealed = true;
    element.classList.add("revealed");

    if (board[index].mine) {
        element.classList.add("mine");
        element.innerText = "💣";
        alert("Game Over!");
        startGame();
    } else {
        let count = countMines(index);
        element.innerText = count > 0 ? count : "";
    }
}

function countMines(index) {
    const directions = [-1, 1, -size, size, -size-1, -size+1, size-1, size+1];
    let count = 0;

    directions.forEach(dir => {
        let i = index + dir;
        if (i >= 0 && i < board.length && board[i].mine) {
            count++;
        }
    });

    return count;
}

startGame();
