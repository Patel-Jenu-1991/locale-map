import React, { Component } from 'react';
import './Errors.css';

class NoMapDisplay extends Component {
  state = {
    show: false,
    timeout: null
  };

  componentDidMount() {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillUnmount() {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show:true});
  };

  render() {
    return (
      <div>
        {
          this.state.show
            ? (
              <div>
                <h1 className='error-heading'>
                  <i className='fas fa-exclamation-circle'></i>
                  &nbsp;
                  Error Loading Map
                </h1>
                <p className='error-msg'>
                  Cannot load map due to a network error.
                  Plese check network connection and try again.
                </p>
              </div>
            )
            :
            (
              <div>
                <h1 className='spinner'>
                  <i className='fas fa-spinner'></i>
                  Loading...
                </h1>
              </div>
            )
        }
      </div>
    );
  }
}

export default NoMapDisplay;
