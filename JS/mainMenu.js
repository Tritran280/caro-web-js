class MainMenu
{
    constructor()
    {
        this._ui = document.getElementById('control-show')
        this.pveButton = document.getElementById('play-with-computer')
        this.pvpButton = document.getElementById('play-with-friend')
    }

    setDisplayStyle(style)
    {
        this._ui.style.display = style
    }
}