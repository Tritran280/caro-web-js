const boardSize = 20
const moveFinder = new MoveFinder(boardSize)

let baseUrl = 'https://mtphone.000webhostapp.com/apicrg/'

const xmlHttpRequest = new XMLHttpRequest();
const room = new Room()
const gameplay = new Gameplay(boardSize)

const mainMenu = new MainMenu()
const pvpUI = new PvPUI()
const pveUI = new PvEUI()
const pvpGameplayUI = new PvPGameplayUI()
const pveGameplayUI = new PvEGameplayUI()


mainMenu.pvpButton.addEventListener('click', function() {
    pvpUI.setDisplayStyle('block')
    mainMenu.setDisplayStyle('none')
})
mainMenu.pveButton.addEventListener('click', function() {
    pveUI.setDisplayStyle('block')
    mainMenu.setDisplayStyle('none')
})


// call api
function callApi(url)
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
}