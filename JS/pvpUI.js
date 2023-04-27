class PvPUI {
    constructor() 
    {
        this.roomIds = [];
        this._display = document.getElementById('room');
        this.findRoomButton = document.getElementById('btn-find-room');
        this.enterRoomButton = document.getElementById('enter-room');
        this.createRoomButton = document.getElementById('btn-create-room');
        this.backButton = document.getElementById('btn-back-h');
        this.allRoomDiv = document.querySelector('.all-room');

        this.findRoomButton.addEventListener('click', this.findRoom.bind(this))
        this.createRoomButton.addEventListener('click', this.createRoom.bind(this))
        this.backButton.addEventListener('click', this.back.bind(this))

        setInterval(() => 
        {
            if (this.createRoomButton && this.createRoomButton.offsetParent !== null) {
            this.getAllRoomIds();
            }
        }, 1000)
    }

    back()
    {
        this.setDisplayStyle('none')
        mainMenu.setDisplayStyle('block')
    }

    setDisplayStyle(style) 
    {
        this._display.style.display = style;
    }

    getAllRoomIds() 
    {
        console.log(this.roomIds);
        this.roomIds = [];

        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) 
            {
                var data = JSON.parse(xmlHttpRequest.responseText)
                for (var i = 0; i < data.length; i++) 
                {
                    this.roomIds.push(data[i].id_room)
                }
                this.showAllRooms(this.roomIds)
            }
        }

        xmlHttpRequest.open('GET', `${baseUrl}get_room_id.php`, true)
        xmlHttpRequest.send()
    }

    showAllRooms(ids) 
    {
        this.allRoomDiv.innerHTML = ids.map((id) => `<div class="room card" id="${id}">${id}</div>`).join('')
        this.addClickListenersToRooms();
    }

    addClickListenersToRooms() 
    {
        const rooms = document.querySelectorAll('.room')
        rooms.forEach(roomId => 
        {
            roomId.addEventListener('click', () => 
            {   
                room.id = roomId.id
                gameplay.currentPlayer = 0

                callApi(`${baseUrl}checkstatus.php?id=${room.id}`)
		        this.enterRoom()
            })
        })
    }

    enterRoom()
    {
        pvpUI.setDisplayStyle('none')
        pvpGameplayUI.setDisplayStyle('block')

        pvpGameplayUI.roomId.innerHTML = 'ID: ' + room.id
        pvpGameplayUI.boardGame.setAttribute('id', room.id)

        pveUI.createBoard(true)
    }
    
    findRoom()
    {   
        var roomId = document.getElementById("room-id-input").value
        if (this.roomIds.includes(roomId)) 
        {
            room.id = roomId
            gameplay.currentPlayer = 0
            callApi(`${baseUrl}checkstatus.php?id=${room.id}`)
            this.enterRoom()
            
        }
        else
        {
            this.message(`Phòng ${roomId} không tồn tại!`)
        }
    }
    message(message)
    {
        var mes = document.getElementById('message').innerHTML = message;
        var mes = document.getElementById("message");
        mes.style.display = "block";
        setTimeout(function(){
            mes.style.display = "none";
        }, 3000);
    }

    createRoom()
    {
        gameplay.currentPlayer = 1
        room.isTwoPlayer = true

        room.id = IDGenerator.generateId()
        room.uid = IDGenerator.generateUid()

        // message(`Phòng ${room.id} đang được tạo ...`)

        setTimeout(function()
        {
            room.Status = 1
            callApi(`${baseUrl}add_value.php?player=1&id_room=${room.id}&uid_room=${room.id}&room_status=${room.Status}`)
            callApi(`${baseUrl}create_table.php?id=${room.id}`)
        }, 1000);
        
        this.enterRoom()
    }
}