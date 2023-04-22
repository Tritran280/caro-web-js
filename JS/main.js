let player = null
const boardSize = 20
let uidboard = null
let board = make_empty_board(boardSize)
let moves = [];
let ish = null

const disp_home_ = document.getElementById('control-show')
const disp_pwm = document.getElementById('play-w-m')
const disp_pwh = document.getElementById('play-w-h')
const disp_ntr = document.getElementById('enter-id-form')
const disp_board_ = document.getElementById('create-board')
const btn_pwm = document.getElementById('play-with-computer')
const btn_pwh = document.getElementById('play-with-friend')
const back_btn_pwm = document.getElementById("back-btn-pwm")
const back_btn_pwh = document.getElementById("back-btn-pwh")
const enter_btn_room_ = document.getElementById('enter-room')
const back_btn_id_ = document.getElementById('back-btn-pwh-id')
const btn_go_ahead = document.getElementById('btn-go-ahead')
const btn_go_m = document.getElementById('btn-go-m')
const btn_quit_game = document.getElementById('btn-quit-game')
const caroDiv = document.querySelector('.caro');




disp_home_.addEventListener('click', function() {
    disp_home_.style.display = 'none';
})

btn_pwm.addEventListener('click', function() {
    disp_pwm.style.display = 'block';
    disp_home_.style.display = 'none'
})

back_btn_pwm.addEventListener('click', function() {
    disp_pwm.style.display = 'none';
    disp_home_.style.display = 'block'
})

btn_pwh.addEventListener('click', function() {
    disp_pwh.style.display = 'block';
    disp_home_.style.display = 'none'
})

back_btn_pwh.addEventListener('click', function() {
    disp_pwh.style.display = 'none';
    disp_home_.style.display = 'block'
})

enter_btn_room_.addEventListener('click', function() {
    disp_pwh.style.display = 'none'
    disp_ntr.style.display = 'block'
})

back_btn_id_.addEventListener('click', function() {
    disp_pwh.style.display = 'block'
    disp_ntr.style.display = 'none'
})


btn_go_ahead.addEventListener('click', function() {
    startGame(1);
})

btn_go_m.addEventListener('click', function() {
    startGame(0);
})

function startGame(p) {
    disp_board_.style.display = 'block';
    disp_pwm.style.display = 'none';
    uid = generateUid();
    document.querySelector('.game').setAttribute('id', uid);
    createBoard();
    if (p === 0) {
        player = 0
        addText(1, 9, 9);
    }else{
        player = 1
    }
}


// tạo uid ván game
function generateUid() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';
    for (let i = 0; i < 15; i++) {
        uid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uid;
}

function createBoard() {
    const boardElement = document.createElement('table');
    boardElement.setAttribute('id', 'board');
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', i * boardSize + j);
            cell.style.backgroundColor = (i + j) % 2 === 0 ? 'rgb(188, 168, 141, 0.5)' : '';
            cell.addEventListener('click', function() {
                clicked(i, j);
            });
            row.appendChild(cell);
        }
        boardElement.appendChild(row);
    }
    const game = document.getElementById(uid);
    game.innerHTML = '';
    game.appendChild(boardElement);
}



function clicked(i, j) {
    if (board[i][j] !== " ") { return };

    if (player === 1) {
        addText(1, i, j);
        const ai = new Best_move(boardSize);
        const xy = ai.best_move(board, 'o');
        addText(0, xy[0], xy[1]);

    } else if (player === 0) {
        addText(0, i, j);
        const ai = new Best_move(boardSize);
        const xy = ai.best_move(board, 'x');
        addText(1, xy[0], xy[1]);
    }
}

function addText(player, x, y) {
    const cell = document.getElementById(x * boardSize + y);
    cell.innerHTML = player === 1 ? 'X' : 'O';
    cell.classList.add(player === 1 ? 'X' : 'O');
    board[x][y] = player === 1 ? 'x' : 'o';
    moves.push([x, y, player]);
}

function make_empty_board(size) {
    return Array(size).fill().map(() => Array(size).fill(' '));
  }

// button thoát game
btn_quit_game.addEventListener('click', function() {
    const table = document.getElementById('board');
    table.parentNode.removeChild(table);
    disp_board_.style.display = 'none'
    disp_pwm.style.display = 'block'
    board = make_empty_board(boardSize)

});

// button undo
document.getElementById('btn-undo').addEventListener('click', function() {
    if(moves.length > 1) {
        delete_(2)
    }
})

// button new game
document.getElementById('btn-new-game').addEventListener('click', function() {
    delete_(moves.length)
    if(player === 0){
        addText(1, 9, 9);
    }
})

function delete_(n){
    for (let k = 0; k < n; k++) {
        const lastMove = moves.pop();
        const i = lastMove[0];
        const j = lastMove[1];
        board[i][j] = ' ';
        const cell = document.getElementById(i * boardSize + j);
        cell.innerHTML = ' ';
        cell.classList.remove('X', 'O');
    }
}