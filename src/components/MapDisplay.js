import React, {Component} from 'react';
import './InfoWindow.css';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

const {MAP_KEY, FS_CLIENT, FS_SECRET, FS_VERSION} = {
  MAP_KEY: 'AIzaSyA7-vNYPVyMmFizrfjY6NVbW42p1xFC7yw',
  FS_CLIENT: 'II3TX0WUQHPM43CBACLPC1RP21EPYRMBWBHY4G1FYGGPLVKD',
  FS_SECRET: 'P0G30WCHPN5PJ2H43BYCGYNQVEHKYGGMQGDNLNJYMG2A400O',
  FS_VERSION: '20180323'
};

class MapDisplay extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  };

  componentWillReceiveProps = (props) => {
    this.setState({firstDrop: false});

    // Change in the number of locations, update markers
    if (this.state.markers.length !== props.locations.length) {
      this.closeInfoWindow();
      this.updateMarkers(props.locations);
      this.setState({activeMarker: null});

      return;
    }

    // Close info window when selected item is not the same as the active marker
    if (!props.selectedIndex || (this.state.activeMarker &&
        (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
        this.closeInfoWindow();
    }

    // Ensure there's a selected index
    if (props.selectedIndex === null || typeof(props.selectedIndex) === undefined) {
      return;
    }
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

  getBusinessInfo = (props, data) => {
    // Look for matching restaurant data using FourSquare API
    // besides what is already available
    return data.response.venues.filter(
      item => item.name.includes(props.name) || props.name.includes(item.name)
    );
  };

  onMarkerClick = (props, marker, e) => {
    // Close any info window display open
    this.closeInfoWindow();

    // Fetch the FourSquare data for the selected restaurant
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });

    // Create props for an active marker
    let activeMarkerProps;
    fetch(request)
      .then(response => response.json())
      .then(result => {
        // Get business reference for the chosen restaurant using FourSquare API
        let restaurant = this.getBusinessInfo(props, result);
        activeMarkerProps = {
          ...props,
          foursquare: restaurant[0]
        };

        // Get image listing for the restaurant if the FourSquare data is available
        // or finish setting up state with existing data
        if (activeMarkerProps.foursquare) {
          let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${FS_CLIENT}&client_secret=${FS_SECRET}&v=${FS_VERSION}`;
          fetch(url)
            .then(response => response.json())
            .then(result => {
              activeMarkerProps = {
                ...activeMarkerProps,
                images: result.response.photos
              };
              if (this.state.activeMarker) {
                this.state.activeMarker.setAnimation(null);
              }
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
              // Set state to show marker info
              this.setState({
                showingInfoWindow: true,
                activeMarker: marker,
                activeMarkerProps
              });
            });
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            activeMarkerProps
          });
        }
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

      let animation = this.state.firstDrop ? this.props.google.maps.Animation.DROP : null;
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
            <h3 className='remove-spacing title'>
              {amProps && amProps.name}
            </h3>
            <h4 className='remove-spacing rating'>
              Rating: {amProps && String(amProps.rating.toFixed(1))}
            </h4>
            {
              amProps && amProps.images
                ? (
                  <div>
                    <img
                      className='resto-photo'
                      alt={amProps.name + ' food picture'}
                      src={amProps.images.items[0].prefix + '100x100' + amProps.images.items[0].suffix}/>
                    <p>Image from FourSquare</p>
                  </div>
                )
                :
                ""
            }
            {
              amProps && amProps.url
                ? (
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
