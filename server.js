const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.listen(port);

const deliverers = [
    {'id': 75948483939, type: 'MOTORCYCLE', position: 100, deliveryTime: null},
    {'id': 82123781273, type: 'CAR', position: 200, deliveryTime: null},
    {'id': 98644423232, type: 'CAR', position: 300, deliveryTime: null},
    {'id': 59684983872, type: 'TRUCK', position: 400, deliveryTime: null},
    {'id': 40954458382, type: 'BIKE', position: 500, deliveryTime: null},
    {'id': 13485487234, type: 'MOTORCYCLE', position: 600, deliveryTime: null},
    {'id': 56586309554, type: 'MOTORCYCLE', position: 700, deliveryTime: null},
    {'id': 59649583049, type: 'BIKE', position: 800, deliveryTime: null},
    {'id': 48572039202, type: 'BIKE', position: 900, deliveryTime: null},
    {'id': 12109324934, type: 'TRUCK', position: 1000, deliveryTime: null}
];

const getTypeByWeight = (weight) => {
    let types = ['TRUCK'];
    if (weight <= 40) types.push('CAR');
    if (weight <= 20) types.push('MOTORCYCLE');
    if (weight <= 10) types.push('BIKE');
    return types;
}

const chooseDeliverer = (address, weight) => {
    let typesAvailable = getTypeByWeight(weight);
    let deliverersAvailable = deliverers.filter(deliveryman => typesAvailable.includes(deliveryman.type));
    if (address < 100) return deliverersAvailable[0];
    if (address > 1000) return deliverersAvailable[deliverersAvailable.length-1];
    return deliverersAvailable.find(deliveryman => deliveryman.position <= address && deliveryman.position+100 > address);
}

const calculateTime = (address, deliveryPosition) => {
    let time = Math.abs(deliveryPosition - address);
    return time === 0 ? 1 : time; 
}

app.get('/', (request, response) => {
    response.json('Hey, dev! :D');
});

app.get('/api/v1/deliveryman/find', (request, response) => {
    let address = request.query.address;
    let weight = request.query.weight;
    let delivery = chooseDeliverer(address, weight);
    delivery.deliveryTime = calculateTime(address, delivery.position);
    response.json(delivery);
});

console.log('API started on:' + port);