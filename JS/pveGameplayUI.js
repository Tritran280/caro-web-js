class PvEGameplayUI
{
    constructor()
    {
        this._boardUI = document.getElementById('create-board')
        this.newGameButton = document.getElementById('btn-new-game')
        this.undoButton = document.getElementById('btn-undo')
        this.quitButton = document.getElementById('btn-quit-game')

        this.quitButton.addEventListener('click', this.quitGame.bind(this))
        this.newGameButton.addEventListener('click', this.reset.bind(this))
        this.undoButton.addEventListener('click', this.undo.bind(this))
    }

    setBoardStyle(style)
    {
        this._boardUI.style.display = style
    }

    quitGame()
    {
        let table = document.getElementById('board')
        table.parentNode.removeChild(table)

        pveGameplayUI.setBoardStyle('none')
        pveUI.setDisplayStyle('block')
        
        gameplay.clearBoard()
        document.removeEventListener('moveMade', this.makeComputerMove.bind(this))
        gameplay.ended = false
        pvpGameplayUI.winner.innerHTML = ''
    }

    makeComputerMove()
    {
        if (gameplay.currentPlayer === 1)
        {
            let xy = moveFinder.find(gameplay.board, 'o');
            gameplay.makeSilentMove(0, xy[0], xy[1]);
        }
        else if (gameplay.currentPlayer === 0)
        {
            let xy = moveFinder.find(gameplay.board, 'x');
            gameplay.makeSilentMove(1, xy[0], xy[1]);
        }
    }

    reset()
    {
        this.delete_(gameplay.moves.length)
        gameplay.ended = false
        pvpGameplayUI.winner.innerHTML = ''

        if (gameplay.currentPlayer === 0)
        {
            gameplay.makeSilentMove(1, 9, 9)
        }
    }

    undo()
    {
        if (gameplay.moves.length > 1) this.delete_(2)
    }

    delete_(n)
    {
        for (let k = 0; k < n; k++)
        {
            let lastMove = gameplay.moves.pop();
            let i = lastMove[0];
            let j = lastMove[1];
            
            gameplay.board[i][j] = ' ';
            
            let cell = gameplay.getCell(i, j);
            cell.innerHTML = ' ';
            cell.classList.remove('X', 'O');
        }
    }

}