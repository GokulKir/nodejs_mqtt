const express = require('express');

const app = express();
 
const http = require('http').createServer(app);

const mqtt = require('mqtt')


const host = "sonic.domainenroll.com";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;


const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "domainenroll",
  password: "de120467",
  reconnectPeriod: 1000,
});

const topic = "/user_data";
const userData = "/devlacus/hubo";



// MQTT client event listeners
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe(`${topic}`);
});


client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
  

  
  // Express routes
  app.get('/', (req, res) => {
    res.send('Hello MQTT in Node.js Express!');
  });
  
  // Start the Express server
  const PORT = process.env.PORT || 3001;
  http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });