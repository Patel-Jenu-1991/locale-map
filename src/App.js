import React, { Component } from 'react';
import './App.css';
import restaurants from './data/locations.json';
import MapDisplay from './components/MapDisplay';

class App extends Component {
  state = {
    lat: 29.7811983,
    lng: -95.1455308,
    zoom: 14,
    locations: restaurants
  };

  render() {
    return (
      <div className='App'>
        <div>
          <h1>Mexican Restaurants of Channelview, TX Locality</h1>
        </div>
        <MapDisplay
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.locations}/>
      </div>
    );
  }
}

export default App;
