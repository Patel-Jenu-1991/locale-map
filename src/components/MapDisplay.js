import React, {Component} from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyA7-vNYPVyMmFizrfjY6NVbW42p1xFC7yw";

class MapDisplay extends Component {
  state = {
    map: null
  };

  mapReady = (props, map) => {
    // Save map reference in state, prepare location markers
    this.setState({map});
  };

  render() {
    // Definte default map style and central coordinate
    const {style, center} = {
      style: {
        width: '100%',
        height: '100%'
      },
      center: {
        lat: this.props.lat,
        lng: this.props.lng
      }
    };

    return (
      <Map
        role='application'
        aria-label='map'
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        style={style}
        initialCenter={center}
        onClick={this.closeInfoWindow}>
      </Map>
    );
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay);
