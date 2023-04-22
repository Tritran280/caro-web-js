class Board {
    constructor(canvas, player) {
      this.size = 20;
      this.square_size = 30;
      this.player = player;
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.canvas.width = this.square_size * this.size;
      this.canvas.height = this.square_size * this.size;
      this.row_ = null;
      this.col_ = null;
      this.context.font = "24px Arial";
      this.board = this.make_empty_board();
  
      this.clicked = this.clicked.bind(this);
      this.canvas.addEventListener("click", this.clicked);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.canvas.addEventListener("mousemove", this.handleMouseMove);
  
      this.draw_board();
    }
  
    make_empty_board() {
      return Array(this.size).fill().map(() => Array(this.size).fill(' '));
    }
  
    draw_board() {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          this.context.fillStyle = (i + j) % 2 === 0 ? "#f2d9d9" : "#f9ecec";
          this.context.fillRect(j * this.square_size, i * this.square_size, this.square_size, this.square_size);
        }
      }
    }
  
    clicked() {
      if(this.board[this.col_][this.row_] !== ' ') {
        return;
      }
      
      // x đánh trước
      if(this.player === 'x') {
        this.addText(1, this.col_, this.row_)
        const aicaro = new Best_move(this.size)
        const xy = aicaro.best_move(this.board, "o")
        this.addText(0, xy[0], xy[1])
      }else if(this.player === 'o'){
        this.addText(0, this.col_, this.row_)
        const aicaro = new Best_move(this.size)
        const xy = aicaro.best_move(this.board, "x")
        this.addText(1, xy[0], xy[1])
      }
    }

    machine_() {
      this.addText(1, 9, 9)
    }
    
    addText(player, x, y) {
      console.log(player)
      const color = player === 1 ? "#f00000" : "#0000CD";
      const symbol = player === 1 ? "X" : "O";
      this.context.fillStyle = color;
      this.context.fillText(symbol, x * this.square_size + this.square_size / 2 - 8, y * this.square_size + this.square_size / 2 + 8);
      this.board[x][y] = symbol.toLowerCase();
    }
  
    handleMouseMove(event) {
      const rect = this.canvas.getBoundingClientRect();
      this.col_ = Math.floor((event.clientX - rect.left) / this.square_size);
      this.row_ = Math.floor((event.clientY - rect.top) / this.square_size);
    }

    quitGame(){
    }
  }
  
  