import React, { Component } from 'react';
import './App.css';
import restaurants from './data/locations.json';
import MapDisplay from './components/MapDisplay';
import ListDrawer from './components/ListDrawer';

class App extends Component {
  state = {
    lat: 29.7811983,
    lng: -95.1455308,
    zoom: 14,
    locations: restaurants,
    open: false
  };

  styles = {
    menuButton: {
      marginLeft: 10,
      marginRight: 20,
      position: 'absolute',
      left: 10,
      top: 20,
      background: 'white',
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: '0'
    }
  };

  toggleDrawer = () => {
    // toggle value for displaying drawer
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    return (
      <div className='App'>
        <div>
          <button onClick={this.toggleDrawer} style={this.styles.menuButton}>
            <i className='fa fa-bars'></i>
          </button>
          <h1>Mexican Restaurants of Channelview, TX Locality</h1>
        </div>
        <MapDisplay
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.locations}/>
        <ListDrawer
          locations={this.state.locations}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}/>
      </div>
    );
  }
}

export default App;
