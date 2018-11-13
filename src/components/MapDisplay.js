import React, {Component} from 'react';
import './InfoWindow.css';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const MAP_KEY = "AIzaSyA7-vNYPVyMmFizrfjY6NVbW42p1xFC7yw";

class MapDisplay extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  };

  mapReady = (props, map) => {
    // Save map reference to state, prepare location markers
    this.setState({map});
    this.updateMarkers(this.props.locations);
  };

  closeInfoWindow = () => {
    // Disable any active marker animation
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      activeMarkerProps: null
    });
  };

  onMarkerClick = (props, marker, e) => {
    // Close any info window display open
    this.closeInfoWindow();
    // Set state to show marker info
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      activeMarkerProps: props
    });
  };

  updateMarkers = (locations) => {
    // If all the locations have been filtered then we're done
    if (!locations) {
      return;
    }
    // Clear any existing markers from the map
    for (const marker of this.state.markers) {
      marker.setMap(null)
    }
    // Loop over the locations to create parallel references to marker
    // properties and markers which can be used to reference in interactions.
    // Add markers to map along the way.
    let markerProps = [];
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        rating: location.rating,
        position: location.pos,
        url: location.url
      };
      markerProps.push(mProps);

      let animation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map,
        animation
      });
      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    });
    this.setState({markers, markerProps});
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

    let amProps = this.state.activeMarkerProps;

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
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}>
          <div>
            <h3 className='remove-spacing title'>{amProps && amProps.name}</h3>
            <h4 className='remove-spacing rating'>Rating: {amProps && String(amProps.rating.toFixed(1))}</h4>
            {
              amProps && amProps.url ?
              (
                amProps.url !== 'Not Available' ?
                (
                  <a className='link-style' href={amProps.url}>See website</a>
                )
                :
                <span className='link-style'>Website N/A</span>
              )
              :
              ""
            }
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({apiKey: MAP_KEY})(MapDisplay);
