import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      longitude: this.props.coordinates.longitude,
      latitude: this.props.coordinates.latitude,
      zoom: 12,
      styleType: 'streets-v11',
    };
  }

  componentDidMount() {    
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: `mapbox://styles/mapbox/${this.state.styleType}`,
      center: [this.state.longitude, this.state.latitude],
      zoom: this.state.zoom
    });

    // user 
    const user = new mapboxgl.Marker()
      .setLngLat([this.state.longitude, this.state.latitude])
      .setPopup(new mapboxgl.Popup().setHTML(`<h1>You</h1>`))
      .addTo(map);
    user.togglePopup();

    // venues
    const markers = this.props.venues.map((venue) => {
      const customMarker = { color: '#FF0000' };
      let imageElement = '';

      if (venue.image.url) {
        imageElement = `<img src="${venue.image.url}" alt="${venue.name}"></img>`;
      }

      new mapboxgl.Marker(customMarker)
        .setLngLat(venue.location.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`<center><h2><a href="${venue.url}" target="_blank">${venue.name}</a></h2>${imageElement}</center><h3>Address</h3><p>${venue.address.full_name}</p><h3>Distance</h3><p>${venue.distance.value} ${venue.distance.units.toLowerCase()}</p>`))
        .addTo(map);
    });

    const scale = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'imperial'
    });

    map.addControl(scale);
    scale.setUnit('metric');

    map.addControl(new mapboxgl.NavigationControl());
    
    
    map.on('move', () => {
      this.setState({
        longitude: map.getCenter().lng.toFixed(4),
        latitude: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { longitude, latitude, zoom } = this.state;

    return (
      <div>
        <div className='sidebarStyle'>
          <div>Longitude: {longitude} | Latitude: {latitude} | Zoom: {zoom}</div>
          <center><button type="button" onClick={() => this.setState({ styleType: 'dark-v10' })}>Enable Dark Mode</button></center>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
  );
  }
}

export default Map;
