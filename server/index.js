require('dotenv').config();
const axios = require('axios');
const colors = require('colors');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const spdy = require('spdy');
const db = require('../db/index.js');
const spdyServerOptions = require('./config.js');

const Venues = require('../db/Venues.js');

const ticketmasterAPIKey = process.env.TICKETMASTER_API_KEY || 'YOUR_TICKETMASTER_API_KEY';

/* ======================================= Express server ======================================= */

const PORT = process.env.EXPRESS_JS_APP_PORT || 3000;

// create express application
const app = express();

// enable cors
app.use(cors());

// compression middleware
app.use(compression());

app.use(express.urlencoded({ extended: false }));

// set 'Content-Type' middleware will parse
app.use(express.json());

// logger
app.use(morgan('dev'));

// serving static file
app.use(express.static(path.join(__dirname, '../client/dist')));

// HTTPS server
const server = spdy.createServer(spdyServerOptions, app);
server.listen(PORT, () => console.log(`HTTP/2 NodeJS server listening on port ${colors.green(PORT)}`));


/* ==================================== HTTP request helpers ==================================== */

const venueSearchByGeoPoint = async (longitude, latitude) => {
  const url = `https://app.ticketmaster.com/discovery/v2/venues.json?geoPoint=${latitude},${longitude}&size=25&apikey=${ticketmasterAPIKey}`;
  const response = await axios.get(url);
  const { data: { _embedded: { venues } } } = response;

  return venues;
};

const getAndInsertVenues = async (req, res, longitude, latitude) => {
 try {
  const venues = await venueSearchByGeoPoint(longitude, latitude);
  const refractoredVenues = []

  for (let venue of venues) {
    const { name, type, id, url, images, distance, units, postalCode, city, state, country, address, location } = venue;
    const { longitude, latitude } = location;

    // // TODO {Array} - images 
    let image = {};

    if (images) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].ratio === '16_9') {
          image = {
            aspect_ratio: {
              width: 16,
              height: 9,
            },
            url: images[i].url,
          };

          break;
        }
      }
    }

    refractoredVenues.push({
      _id: id,
      name,
      type,
      url,
      image,
      distance: {
        value: distance,
        units,
      },
      address: {
        line_1: address.line1,
        city: city.name,
        state: state.name,
        state_code: state.stateCode,
        postal_code: postalCode,
        country: country.name,
        country_code: country.countryCode,
        full_name: `${address.line1}, ${city.name}, ${state.name} ${postalCode}, ${country.name}`,
      },
      location: {
        coordinates: [Number.parseFloat(longitude), Number.parseFloat(latitude)],
      },
    });

  } // end outer loop

  res.send(refractoredVenues);

  Venues.insertMany(refractoredVenues, { ordered: false })
    .then(console.log)
    .catch(console.error);

 } catch (err) {
  console.error(err);
  res.status(404).send(err);
 }
};

/* ==================================== HTTP request handlers =================================== */

app.get('/venues', (req, res) => {
  const { longitude, latitude } = req.query;
  console.log(req.query)
  console.log(longitude.red);
  console.log(latitude.red);
  getAndInsertVenues(req, res, longitude, latitude);
});
