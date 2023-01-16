window.addEventListener('load', function () {
    var protocol = location.host === 'localhost' ? 'ws' : 'wss'
    var serverUrl = protocol + '://' + location.host;

    // TODO: change roomId when too many players are connected
    var roomId = (new URLSearchParams(location.search)).get('room') || 'cowrunner'
    var levelId = 'level1'

    //сцена
    var scene = new Scene({
        canvas: 'scene',
        view: {
            width: 840,
            height: 480
        }
    });

    var started = false;
    //При клике на кнопку "присоединиться"
    $('#joining-button').click(function () {
        if (!started) {
            started = true;
            //Игрок
            var player = new Player(scene, {
                radius: 16,
                offsetX: 32,
                offsetY: 32,
                width: 32,
                height: 32,
                name: nickNames[getRandomNumber(0, nickNames.length - 1)],
                controls: {
                    jump: 38, // 87
                    right: 39, // 68
                    left: 37 // 65
                }
            });

            //коннектимся к серверу
            player.connect(serverUrl, roomId, levelId, function (lvl, shadows, matrixChanges, room_is_paused) {
                window.game = new Game(scene, player);

                document.getElementById('joining-screen').style.display = 'none'
                scene.domRoot.style.display = 'block'

                game.getLevel(lvl, function () {
                    game.initConnection(lvl, player, shadows, matrixChanges, room_is_paused);
                });
            });
        }
    });
});
