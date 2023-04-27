class PvPGameplayUI {
    constructor() 
        {
        this.isObjectVisible = false;
        this.boards = []
        this._display = document.getElementById("create-board-h");
        this.quitGameButton = document.getElementById("btn-quit-game-h");
        this.roomId = document.querySelector(".id-room-h");
        this.boardGame = document.querySelector(".game-h");
        this.winner = document.querySelector('.winner');
    
        this.quitGameButton.addEventListener("click", this.quitPvpGame.bind(this));
    
        setInterval(() => {
            if (this.quitGameButton && this.quitGameButton.offsetParent !== null) {
            this.getTableData()
            }
        }, 1000);
        }
  
    setDisplayStyle(style) {
        this._display.style.display = style;
    }
  
    quitPvpGame() {
        let table = document.getElementById("board");
        table.parentNode.removeChild(table);
    
        this.roomId.innerHTML = "";
        this.setDisplayStyle("none");
        pvpUI.setDisplayStyle("block");
        callApi(`${baseUrl}delete_table.php?uid=table_${room.id}&id=${room.id}`)
        callApi(`${baseUrl}delete_val_id_table.php?uid=table_${room.id}&id=${room.id}`)
    
        gameplay.clearBoard();
        this.boards = [];
        callApi(`${baseUrl}setNumPlayer.php?id=${room.id}`);
        gameplay.ended = false
        room.isTwoPlayer = false
    }
  
    getTableData() {
        xmlHttpRequest.onreadystatechange = function () {
            try {
                if (xmlHttpRequest.readyState === 4 && xmlHttpRequest.status === 200) {
                    const data = JSON.parse(xmlHttpRequest.responseText);
    
                    data.forEach((item) => {
                        const matchingBoard = this.boards.find((board) => board[0] === item.x && board[1] === item.y)
                        if (matchingBoard) {
                            matchingBoard[2] = item.value;
                        } else {
                            this.boards.push([item.x, item.y, item.player])
                        }
                    });
    
                    this.boards = this.boards.filter((board) => data.some((item) => item.x === board[0] && item.y === board[1]))
                    let lastMove = this.boards.pop()
                    this.updateBoard(lastMove, lastMove !== undefined);
                }
            } catch (error) {
                console.error('!!!!!!!!!!!!!!!!');
            }
        }.bind(this)
    
        xmlHttpRequest.open("GET", `${baseUrl}get_data_table.php?uid=${room.id}`, true);
        xmlHttpRequest.send();
    }
    
    updateBoard(vals = [0, 0, 0], isValid)
    {
        if (!isValid) return;
        let lastPlayer = parseInt(vals[2])
        room.lastPlayer = lastPlayer
        gameplay.makeSilentMove(lastPlayer, parseInt(vals[0]), parseInt(vals[1]))
    }

    checkWiner(arr, player) {
        const size = arr.length;
        const winCondition = 5;
      
        for (let i = 0; i < size; i++) {
            for (let j = 0; j <= size - winCondition; j++) {
                let count = 0;
                for (let k = 0; k < winCondition; k++) {
                    if (arr[i][j + k] === player) {
                        count++;
                    }
                }
                if (count === winCondition) {
                    return true;
                }
            }
        }
    
        // Kiểm tra hàng ngang
        for (let i = 0; i <= size - winCondition; i++) {
            for (let j = 0; j < size; j++) {
                let count = 0;
                for (let k = 0; k < winCondition; k++) {
                    if (arr[i + k][j] === player) {
                        count++;
                    }
                }
                if (count === winCondition) {
                    return true;
                }
            }
        }
    
        // Kiểm tra đường chéo chính
        for (let i = 0; i <= size - winCondition; i++) {
            for (let j = 0; j <= size - winCondition; j++) {
                let count = 0;
                for (let k = 0; k < winCondition; k++) {
                    if (arr[i + k][j + k] === player) {
                        count++;
                    }
                }
                if (count === winCondition) {
                    return true;
                }
            }
        }
    
        // Kiểm tra đường chéo phụ
        for (let i = winCondition - 1; i < size; i++) {
            for (let j = 0; j <= size - winCondition; j++) {
                let count = 0;
                for (let k = 0; k < winCondition; k++) {
                    if (arr[i - k][j + k] === player) {
                        count++;
                    }
                }
                if (count === winCondition) {
                    return true;
                }
            }
        }
        return false;
    } 
}