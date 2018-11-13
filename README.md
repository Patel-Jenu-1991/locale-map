# Neighborhood Map
---

## Summary
This is Project 7 of the Front End Nanodegree Program at Udacity. The project is based on React along with the Google Maps API to display a map of the locality which is Channelview, TX in this case.

### **Project Dependencies:**
* React
* Google Maps API
* FourSquare API
* React-Material UI for the Hamburger Menu
* google-maps-react for primary map display
* Fontawesome

### **Description:**
The app basically displays a locale map of Channelview, TX. It has a collection of location data in JSON format to show map markers for some popular Mexican restaurants in the locality. Clicking on a marker displays an InfoWindow containing details about the restaurant like name, rating, a picture from the FourSquare API (subject to availability) and a link to the restaurant website (if available). Clicking on the Hamburger Menu (top left of the screen) slides a drawer containing a text box followed by a listing of all the location/markers. Typing into the text box filters out the list of venues. Clicking a restaurant on the list pops out it's InfoWindow on the map marker. Clicking outside the drawer toggles it's visibility. Clicking anywhere on the map closes any active InfoWindow for a particular marker on the map.

Common error handling techniques have been used to provide fallbacks gracefully when data from an API cannot be retrieved and when there are network problems. A service worker (bootstrapped with create-react-app) has been registered to allow for offline access.

---

## How to install and run the project:
* You'll need to have [NodeJS](https://nodejs.org/en/) installed
* Clone the repo - `$ git clone https://github.com/Patel-Jenu-1991/locale-map.git`
* Run `npm install` to install dependencies
* Run `npm start` to start development server
---

## Credits
* Instructors at Udacity
* Reviewers at Udacity
* Classmates from the GwG FEND Nanodegree Program
---

## References
* MDN
* Ract Docs
* Classsroom Lectures
* Stack Overflow
* FourSquare API Docs
* google-maps-react docs
* React-Material UI Docs
* Fontawesome
* Colorzilla
* Knowledge Base at Udacity
* Student Hub at Udacity
---
