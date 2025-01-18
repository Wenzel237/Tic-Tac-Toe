const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = Array(9).fill(null); // Represents the game board

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Check if cell is already taken
    if (board[index] || checkWinner()) return;

    // Update the board and UI
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    // Check for a winner or a draw
    if (checkWinner()) {
        message.textContent = `${currentPlayer} Wins!`;
        highlightWinner(checkWinner());
    } else if (board.every(cell => cell)) {
        message.textContent = `It's a Draw!`;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Turn: ${currentPlayer}`;
    }
}

// Check for a winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return combination; // Return the winning combination
        }
    }
    return null;
}

// Highlight the winning cells
function highlightWinner(winningCombination) {
    winningCombination.forEach(index => {
        cells[index].classList.add('winner');
        cells[index].classList.remove('taken');
    });
}

// Restart the game
function restartGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    message.textContent = `Turn: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initialize message
message.textContent = `Turn: ${currentPlayer}`;
