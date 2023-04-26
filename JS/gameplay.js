class Gameplay
{
    constructor(boardSize)
    {
        this.boardSize = boardSize
        this.board = this.create_empty_board(boardSize)
        this.currentPlayer = -1
        this.moves = []
        this.moveMadeEvent = new Event('moveMade')
        this.ended = false
    }
    
    create_empty_board(size)
    {
        return Array(size).fill().map(() => Array(size).fill(' '))
    }
    
    makeMove(player, x, y, uploadMove = false)
    {
		if (this.board[x][y] !== " ") return

		this.makeSilentMove(player, x, y)

        document.dispatchEvent(this.moveMadeEvent)
        if (uploadMove) callApi(`${baseUrl}add_value_table.php?uid=table_${room.id}&player=${player}&x=${x}&y=${y}`)
    }

	makeSilentMove(player, x, y)
	{
		if (this.board[x][y] !== " ") return

		this.board[x][y] = player === 1 ? 'x' : 'o';
		this.moves.push([x, y, player]);
		this.addText(player, x, y)
        if (!room.isTwoPlayer)
        {
            console.log('Còn 1 người chơi')
        }

        if (pvpGameplayUI.checkWiner(gameplay.board, 'x'))
        {
            pvpGameplayUI.winner.innerHTML = 'X win'
            this.ended = true
        }
        else if (pvpGameplayUI.checkWiner(gameplay.board, 'o'))
        {
            pvpGameplayUI.winner.innerHTML = 'O win'
            this.ended = true
        }
	}

    addText(player, x, y)
    {
        let cell = this.getCell(x, y);
        cell.innerHTML = player === 1 ? 'X' : 'O';
        cell.classList.add(player === 1 ? 'X' : 'O');
    }

    

    getCell(x, y)
    {
        return document.getElementById(x * this.boardSize + y)
    }


    clearBoard()
    {
        this.board = this.create_empty_board(boardSize)
    }
}