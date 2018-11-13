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
    filtered: null,
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

  componentDidMount() {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.locations, "")
    });
  }

  toggleDrawer = () => {
    // toggle value for displaying drawer
    this.setState({
      open: !this.state.open
    });
  };

  updateQuery = (query) => {
    // Update query value and filter locations accordingly
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.locations, query)
    });
  };

  filterLocations = (locations, query) => {
    // filter locations to match query string
    return locations.filter(
      location => location.name.toLowerCase().includes(query.toLowerCase())
    );
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
          locations={this.state.filtered}/>
        <ListDrawer
          locations={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
          filterLocations={this.updateQuery}/>
      </div>
    );
  }
}

export default App;
