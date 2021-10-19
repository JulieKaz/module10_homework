document.addEventListener('DOMContentLoaded', () => {
    const wsUri = "wss://echo.websocket.org/";

    const message = document.querySelector('.message_input');
    const send = document.querySelector('.send');
    const location = document.querySelector('.location');
    const dialog = document.querySelector('.dialog');
    const status = document.querySelector('.status');

    function writeToScreen(message, message_class) {
        let pre = document.createElement('span');
        pre.className = 'message';
        pre.classList.add(message_class);
        pre.innerHTML = message;
        dialog.appendChild(pre);
    }

    let websocket = new WebSocket(wsUri);
    websocket.onopen = function (e) {
        status.innerText = 'Соединение установлено';
    };
    websocket.onclose = function (e) {
        status.innerText = 'Нет соединения';
    };
    websocket.onmessage = function (e) {
        writeToScreen(e.data, 'answer');
    };
    websocket.onerror = function (e) {
        status.innerText = 'Ошибка соединение';
    };

    send.addEventListener('click', () => {
        const message_text = message.value;
        if (message_text === '') {
            return false;
        }
        writeToScreen(message_text, 'user');
        websocket.send(message_text);
        message.value = '';
    });

    location.addEventListener('click', () => {
        if (!navigator.geolocation) {
            writeToScreen('Не поддерживается браузером', 'user');
        } else {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        }
    });

    const locationError = () => {
        writeToScreen('Невозможно получить местоположение', 'user');
    };
    const locationSuccess = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const map_href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        writeToScreen(`<a href = ${map_href} target="_blank">Гео-локация</a>`, 'user');
    };
});