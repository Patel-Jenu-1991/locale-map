import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class ListDrawer extends Component {
  state = {
    open: false,
    query: ""
  };

  styles = {
    list: {
      width: '250px',
      padding: '0 15px 0'
    },
    noBullets: {
      listStyleType: 'none',
      padding: 0
    },
    fullList: {
      width: 'auto'
    },
    listItem: {
      marginBottom: '15px'
    },
    listLink: {
      background: 'rgba(6, 5, 9, 0.76)',
      border: '2px ridge rgba(34, 120, 94, 0.75)',
      borderRadius: '15px',
      color: 'rgba(246, 244, 244, 1)',
      fontSize: '16px',
      fontWeight: 'bold',
      padding: '8px',
      letterSpacing: '1px'
    },
    filterEntry: {
      border: '1px solid gray',
      fontSize: '16px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      padding: '3px',
      margin: '30px 0 10px',
      width: '100%'
    }
  };

  updateQuery = (newQuery) => {
    // Save the new query string in state and
    // pass the string up the call tree
    this.setState({ query: newQuery });
    this.props.filterLocations(newQuery);
  };

  render() {
    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
          <div style={this.styles.list}>
            <input
              style={this.styles.filterEntry}
              type='text'
              placeholder='Filter list'
              name='filter'
              onChange={event => this.updateQuery(event.target.value)}
              value={this.state.query}/>
            <ul style={this.styles.noBullets}>
              {
                this.props.locations && this.props.locations.map(
                  (location, index) => {
                    return (
                      <li style={this.styles.listItem} key={index}>
                        <button
                          style={this.styles.listLink}
                          key={index}
                          onClick={e => this.props.clickListItem(index)}>
                          {location.name}
                        </button>
                      </li>
                    )
                  }
                )
              }
            </ul>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ListDrawer;
