const ROWS = 6;
const COLS = 7;
let currentPlayer = 'X';
let gameActive = true;
const board = [];

function initializeBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; ++row) {
        board[row] = [];
        for (let col = 0; col < COLS; ++col) {
            board[row][col] = '';
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}
function countInDirection(row, col, rowDir, colDir) {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += rowDir;
        c += colDir;
    }
    return count;
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 1;
    count += countInDirection(row, col, rowDir, colDir);
    count += countInDirection(row, col, -rowDir, -colDir);
    return count >= 4;
}

function checkWin(row, col) {
    return checkDirection(row, col, 1, 0) ||
           checkDirection(row, col, 0, 1) ||
           checkDirection(row, col, 1, 1) || 
           checkDirection(row, col, 1, -1);
}

function updateCell(row, col) {
    const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
    cell.innerText = currentPlayer;
    if (currentPlayer === 'X') {
        cell.style.backgroundColor = 'red';
    } else {
        cell.style.backgroundColor = 'yellow';
    }
}

function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    document.getElementById('message').innerText = `It is player ${currentPlayer} turn.`;
}

function handleCellClick(event) {
    if (!gameActive) {
        return;
    }
    const col = parseInt(event.target.dataset.col);
    for (let row = ROWS - 1; row >= 0; --row) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            updateCell(row, col);
            if (checkWin(row, col)) {
                document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else {
                switchPlayer();
            }
            return;
        }
    }
}

initializeBoard();
