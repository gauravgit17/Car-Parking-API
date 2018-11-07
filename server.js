const express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');

var {Parking} = require('./db/parking');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

mongoose.connect('mongodb://utkarsh:utkarsh123@ds123182.mlab.com:23182/car-parking', {useNewUrlParser: true});

app.get('/', (req, res) => {
  res.send('Parking Project Working');
});

app.get('/allspots', (req, res) => {
    Parking.find({}).then((data) => {
      res.send(data);
    }).catch((e) => {
      res.sendStatus(500);
    });
});

function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum/1000;
}

app.get('/getuser/:id', (req, res) => {
  var numberPlate = req.params.id;
  Parking.find({numberPlate}).then((user) => {
    if(!user) {
      res.send('No candidate found');
    }else {
      var now = toTimestamp(new Date());
      var timeThen = user[0]._id.getTimestamp();
      console.log(now);
      console.log(timeThen);
      res.send({
        name: user[0].name,
        numberPlate: user[0].numberPlate,
        parkingNumber: user[0].parkingNumber,
        parkingTime: timeThen,
        timePeriod: now - toTimestamp(timeThen)
      });
    }
  })
});

app.post('/newparking', (req, res) => {
  var user = {
    name: req.body.name,
    numberPlate: req.body.numberPlate,
    parkingNumber: req.body.parkingNumber
  };
  var newParking = new Parking(user);
  newParking.save().then((parkingSpot) => {
    res.send(parkingSpot);
  }).catch((e) => {
    res.send(`Unable to save ${e}`);
  });
});

app.listen(3000, () => {
  console.log(`Port up`);
})
