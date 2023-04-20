
const size = 20
const square_size = 30;
var aicaro = new Best_move(size);
const board = aicaro.make_empty_board(size)

const tooltip1 = document.getElementById("tooltip1");

let row_ = null
let col_ = null

let row_h = null
let col_h = null

const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

canvas.width = square_size * size;
canvas.height = square_size * size;

// Vẽ các ô trên bàn cờ
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        context.fillStyle = (i + j) % 2 === 0 ? "#f2d9d9" : "#f9ecec";
        context.fillRect(j * square_size, i * square_size, square_size, square_size);
    }
}

function a(){
    
    context.font = "24px Arial";
    context.fillText(player.toUpperCase(), x * SQUARE_SIZE + SQUARE_SIZE / 2 - 8, y * SQUARE_SIZE + SQUARE_SIZE / 2 + 8);
}

function clicked(){
    context.font = "24px Arial";
    
    if (board[col_][row_] === ' '){
        
        context.fillStyle = 'x' === 'x' ? "#f00000" : "red";
        context.fillText("X", col_ * square_size + square_size / 2 - 8, row_ * square_size + square_size / 2 + 8);
        board[col_ ][row_] = 'x'
        
        xy = aicaro.best_move(board, "o")
        context.fillStyle = 'o' === 'o' ? "	#0000CD" : "blue";
        context.fillText("O", xy[0] * square_size + square_size / 2 - 8, xy[1] * square_size + square_size / 2 + 8);
        board[xy[0]][xy[1]] = 'o'
    }
    tooltip1.innerText = `Tọa độ X (${row_}, ${col_}) || Tọa độ O (${xy[0]}, ${xy[1]})`;
}

function handleMouseMove(event) {
    // Tính toán tọa độ của chuột trên bàn cờ
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Tính toán vị trí của ô tương ứng với tọa độ của chuột
    col_ = Math.floor(x / square_size);
    row_ = Math.floor(y / square_size);
    
}

canvas.addEventListener("click", clicked);
canvas.addEventListener("mousemove", handleMouseMove);