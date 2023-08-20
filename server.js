const express = require('express');

const app = express();
 
const http = require('http').createServer(app);

const mqtt = require('mqtt')



const client = mqtt.connect({
    uri: 'mqtt://sonic.domainenroll.com:1883',
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    user: 'domainenroll',
    pass: 'de120467'
  });


// MQTT client event listeners
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('/user_data');
});


client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});
  

  
  // Express routes
  app.get('/', (req, res) => {
    res.send('Hello MQTT in Node.js Express!');
  });
  
  // Start the Express server
  const PORT = process.env.PORT || 3000;
  http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });