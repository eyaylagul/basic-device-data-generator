const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const {faker} = require('@faker-js/faker');
const db = require("./db.json")

const app = express();
const server = http.createServer(app);

app.get('/devices', (req, res) => {
    return res.json(db)
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// socket
const socketApp = express();
const socketServer = http.createServer(socketApp);
const io = socketIo(socketServer);

io.on('connection', (socket) => {
    console.log('New client connected');

    const sendData = () => {
      const randomDeviceNumber = faker.number.int({min: 0, max: db.devices.length - 1})
        const data = {
            id: `device${randomDeviceNumber}`,
            temperature: faker.number.float({min: 20, max: 30}),
            pressure: faker.number.float({min: 90, max: 110}),
            speed: faker.number.float({min: 0, max: 10}),
            timestamp: new Date().toISOString()
        };
        socket.emit('deviceData', data);
    };

    const sendNotification = () => {
        const notifications = [
            {type: "temperature_high", message: "Temperature level is above 25°C"},
            {type: "pressure_low", message: "Pressure level is below 100 kPa"},
        ]
        const randomNotification = notifications[faker.number.int({min: 0, max: notifications.length - 1})]
        const randomDeviceNumber = faker.number.int({min: 0, max: db.devices.length - 1})
        const data = {
            id: faker.string.uuid(),
            deviceId: `device${randomDeviceNumber}`,
            type: randomNotification.type,
            message: randomNotification.message,
            timestamp: new Date().toISOString()
        }
        socket.emit('notifications', data)
    }

    (function loop() {
        var rand = faker.number.int({min: 100, max: 5000});
        setTimeout(function () {
            sendData();
            if (rand > 4250) sendNotification()
            loop();
        }, rand);
    }());

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3001;
socketServer.listen(WEBSOCKET_PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${WEBSOCKET_PORT}`);
});
