class PvEUI
{
    constructor()
    {
        this._display = document.getElementById('play-w-m')
        this.playerStartButton = document.getElementById('btn-go-ahead')
        this.computerStartButton = document.getElementById('btn-go-m')
        this.backButton = document.getElementById("back-btn-pwm")

        this.playerStartButton.addEventListener('click', this.startPvEGame.bind(this, true))
        this.computerStartButton.addEventListener('click', this.startPvEGame.bind(this, false))

        this.backButton.addEventListener('click', this.back.bind(this))
    }

    back()
    {
        this.setDisplayStyle('none')
        mainMenu.setDisplayStyle('block')
    }

    setDisplayStyle(style)
    {
        this._display.style.display = style
    }

    startPvEGame(playerGoFirst)
    {
        pveGameplayUI.setBoardStyle('block')
        pveUI.setDisplayStyle('none')

        room.id = IDGenerator.generateId();
        document.querySelector('.game').setAttribute('id', room.id)

        this.createBoard();

        if (playerGoFirst)
        {
            gameplay.currentPlayer = 1
        }
        else
        {
            gameplay.currentPlayer = 0
            gameplay.makeSilentMove(1, 9, 9, false)
        }

        document.addEventListener('moveMade', pveGameplayUI.makeComputerMove)
    }

    createBoard(isPvP = false)
    {
        let boardElement = document.createElement('table')
        boardElement.setAttribute('id', 'board')

        for (let i = 0; i < boardSize; i++)
        {
            let row = document.createElement('tr')
            for (let j = 0; j < boardSize; j++)
            {
                let cell = document.createElement('td')
                cell.setAttribute('id', i * boardSize + j)
                cell.addEventListener('click', function()
                {
                    if ((isPvP && room.lastPlayer === gameplay.currentPlayer) || gameplay.ended) return
                    gameplay.makeMove(gameplay.currentPlayer, i, j, isPvP)
                })

                row.appendChild(cell);
            }
            boardElement.appendChild(row);
        }

        let game = document.getElementById(room.id);
        game.innerHTML = '';
        game.appendChild(boardElement);
    }
}