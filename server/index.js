require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var ForecastIo = require('forecastio');
var axios = require('axios');

const app = express()
app.use( bodyParser.json())
app.listen(process.env.SERVER_PORT, ()=>{console.log(`Server listening on port ${process.env.SERVER_PORT}`)})

const favorites = []
var id=0


///////////////Endpoints////////////////

app.get('/api/coordinates/:location',(req,res)=>{
    axios.get(`https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODE_API_KEY}Format=kvp&outFormat=json&location=${req.params.location}&thumbMaps=false`)
    .then(response=>{
        var latLong = response.data.results[0].locations[0].latLng
        // res.status(200).send(latLong)
            var forecastIo = new ForecastIo(process.env.WEATHER_API_KEY);
            forecastIo.forecast(latLong.lat, latLong.lng).then(function(data) {
            console.log(JSON.stringify(data, null, 2));
            res.status(200).send(data)
        });
        })
    })

app.post('/api/favorites',(req,res)=>{
    console.log(req.body)
    favorites.push({location:req.body.location,id})
    id++
    res.status(200).send(favorites)
    console.log(favorites)
})

app.get('/api/favorites',(req,res) =>{
    res.status(200).send(JSON.stringify(favorites))
})

app.delete('/api/favorites/:key',(req,res)=>{
    let deleteId = req.params.key
    locationIndex=favorites.findIndex(val=>val.id==deleteId)
    console.log(locationIndex)
    if(locationIndex == -1){
        res.status(400).send("Id not found!")
    } else{
    favorites.splice(locationIndex,1)
    res.status(200).send(favorites)}
})

app.put('/api/favorites/:key',(req,res)=>{
    let editId = req.params.key
    locationIndex=favorites.findIndex(val=>val.id==editId)
    favorites[locationIndex]={location:req.body.location,id:editId}
    res.status(200).send(favorites)
})



app.get('/api/test', (req,res)=>{
    res.status(200).send(console.log('cat'))
})

//////////////Endpoints///////////////




// app.get('/api/weather',(req, res)=>{
//     var forecastIo = new ForecastIo('f7b1b1253f4102c38bb0f89190a53140');
//     forecastIo.forecast('51.506', '-0.127').then(function(data) {
//     console.log(JSON.stringify(data, null, 2));
//     res.status(200).send(data)
// });
// })



// res.status(200).send({key: 'hello'})


// app.get('/api/calculate/add/:x/:y',(req, res)=>{
//     let total = req.params.x * 1 + req.params.y * 1

//     res.send({total: total})
// })

// THIS IS FOR RETURNING WEATHER DATA FROM COORDINATES
// var forecastIo = new ForecastIo('f7b1b1253f4102c38bb0f89190a53140');
// forecastIo.forecast('51.506', '-0.127').then(function(data) {
//   console.log(JSON.stringify(data, null, 2));
// });



// THIS IS FOR GEOCODING CITIES
// https://www.mapquestapi.com/geocoding/v1/address?key=LaBkW2D7F0qWVUxu0hkZktBBcQGjgruG&inFormat=kvp&outFormat=json&location=Provo&thumbMaps=false


// Separate, but unbroken Queries

// app.get('/api/coordinates',(req,res)=>{
//     axios.get('https://www.mapquestapi.com/geocoding/v1/address?key=LaBkW2D7F0qWVUxu0hkZktBBcQGjgruG&inFormat=kvp&outFormat=json&location=Provo&thumbMaps=false')
//     .then(response=>{
//         var answer = response.data
//         res.status(200).send(response.data)
//     })
// })


// app.get('/api/weather',(req, res)=>{
//     var forecastIo = new ForecastIo('f7b1b1253f4102c38bb0f89190a53140');
//     forecastIo.forecast('51.506', '-0.127').then(function(data) {
//     console.log(JSON.stringify(data, null, 2));
//     res.status(200).send(data)
// });
// })