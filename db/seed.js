require('dotenv').config();
const axios = require('axios');
const db = require('./index.js');
const Venues = require('./Venues.js');

const ticketmasterAPIKey = process.env.TICKETMASTER_API_KEY || 'YOUR_TICKETMASTER_API_KEY';

const venueSearch = async (longitude, latitude, page) => {
  const url = `https://app.ticketmaster.com/discovery/v2/venues.json?geoPoint=${latitude},${longitude}&page=${page}&apikey=${ticketmasterAPIKey}`;
  const results = await axios.get(url);
  const venues = results._embedded.venues;

  return venues;
};

const bulkInsertVenues = async (longitude, latitude, page) => {

  try {
      const documents = [];

      for await (let venue of venueSearch(longitude, latitude, page)) {
        const { name, type, id, url, images, distance, units, postalCode, city, state, country, address, location } = venue;
        const { longitude, latitude } = location;

        // TODO {Array} - images 
        let image = {};

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

        documents.push({
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
            coordinates: [longitude, latitude],
          },
        });

      }
      await Venues.bulkWrite(documents, { ordered: false });
  } catch(err) {
    console.log(err);
  }
};


// https://app.ticketmaster.com/discovery/v2/events.json?id=KovZ917Ah1H&apikey=YOUR_API_KEY_HERE
const totalPages = 3407;
for (let page = 0; page < totalPages; page++) {
  bulkInsertVenues(-122.45, 37.75, page);
}