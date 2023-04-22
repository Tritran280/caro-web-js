let player = null
const boardSize = 20
let uidboard = null
let board = make_empty_board(boardSize)

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
    disp_board_.style.display = 'block';
    disp_pwm.style.display = 'none';
    uid = generateUid()
    document.querySelector('.game').setAttribute('id', uid);
    player = 1
    createBoard();

})

btn_go_m.addEventListener('click', function() {
    disp_board_.style.display = 'block';
    disp_pwm.style.display = 'none';
    uid = generateUid()
    player = 0
    document.querySelector('.game').setAttribute('id', uid);
    createBoard();

})

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
    const board = document.createElement('table');
    board.setAttribute('id', 'board');
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', i * boardSize + j);
            cell.addEventListener('click', function() {
                clicked(i, j);
            });
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    const game = document.getElementById(uid);
    game.innerHTML = '';
    game.appendChild(board);
  }
  
function clicked(i, j) {
    if (player === 1) {
        const celll = document.getElementById(i * boardSize + j);
        celll.innerHTML = 'X';
        celll.classList.add('X');
        board[i][j] = 'x'

        const ai = new Best_move(boardSize)
        xy = ai.best_move(board, 'o')
        console.log(xy)
        const cell = document.getElementById(xy[0] * boardSize + xy[1]);
        cell.innerHTML = 'O';
        cell.classList.add('O');
        board[xy[0]][xy[1]] = 'o'

    }
// } else {
//     cell.innerHTML = 'O';
//     cell.classList.add('O');
//     player = 1;
}


function make_empty_board(size) {
    return Array(size).fill().map(() => Array(size).fill(' '));
  }



btn_quit_game.addEventListener('click', function() {
    // Xóa bảng (phần tử table) khỏi phần tử có id là "game"
    const table = document.getElementById('board');
    table.parentNode.removeChild(table);

    disp_board_.style.display = 'none'
    disp_pwm.style.display = 'block'
    board = make_empty_board(boardSize)

});

