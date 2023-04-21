
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
    let player = 'x';
    disp_board_.style.display = 'block';
    disp_pwm.style.display = 'none';
    var boardGame = new Board(document.getElementById("board"), player);
})

btn_go_m.addEventListener('click', function() {
    let player = 'o';
    disp_board_.style.display = 'block';
    disp_pwm.style.display = 'none';
    var boardGame = new Board(document.getElementById('board'), player);
    boardGame.machine_();
})

btn_quit_game.addEventListener('click', function() {
    disp_board_.style.display = 'none'
    disp_pwm.style.display = 'block'
})


