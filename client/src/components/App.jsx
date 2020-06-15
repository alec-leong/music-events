import React from 'react';
import axios from 'axios';
import Map from './Map';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: {},
      venues: [],
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // read latitude and longitude
        const { coords } = position;
        const { longitude, latitude } = coords;

        const coordinates = {
          longitude,
          latitude,
        };

        axios.get(`/venues?longitude=${longitude}&latitude=${latitude}`)
          .then((res) => {
            const { data } = res;
            const venues = data;

            this.setState({
              coordinates,
              venues,
            });
          })
          .catch(console.error);
      },
      console.error,
      {
        enableHighAccuracy: true,
      }
    );
  }

  render() {
    const { coordinates, venues } = this.state;

    return (
      <div>
        {
          Object.keys(coordinates) && venues.length
            ? <Map coordinates={coordinates} venues={venues}/>
            : false
        }
      </div>
    );
  }
}

export default App;
