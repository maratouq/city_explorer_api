let express = require('express');
let cors = require('cors');
let superagent = require('superagent');

let app = express();
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT;

app.get('/location', handleLocation);


function handleLocation(req, res) {

  // --->
  let city = req.query.city;
  //let jsonData = require('./data/location.json');
  let key = process.env.GEOCODE_API_KEY;
  superagent.get(`https://eu1.locationiq.com/v1/search.php?key=${key}&q=${city}&format=json`).then((data) => {
    let jsonObject = data.body[0];
    console.log(jsonObject);
    let locationObject = new Location(city, jsonObject.display_name, jsonObject.lat, jsonObject.lon);
    res.status(200).json(locationObject);
  }).catch(() => {
    res.send('error ... ');
  });
  // let jsonObject = jsonData[0];
  // let locationObject = new Location(city, jsonObject.display_name, jsonObject.lat, jsonObject.lon);
  // res.status(200).json(locationObject);

}

function Location(search_query, formatted_query, latitude, longitude) {
  this.search_query = search_query;
  this.formatted_query = formatted_query;
  this.latitude = latitude;
  this.longitude = longitude;
}

// {
//   "search_query": "seattle",
//   "formatted_query": "Seattle, WA, USA",
//   "latitude": "47.606210",
//   "longitude": "-122.332071"
// }

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
