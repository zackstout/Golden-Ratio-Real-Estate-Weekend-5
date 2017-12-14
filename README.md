
# Golden Ratio Realty!
View, post, edit and delete real estate properties to your heart's content! You can search and sort them too! I took steps toward implementing favorites functionality, but we didn't quite get there!

## Built With
- Front-end: Angular.js, angular-route, Sweet Alerts
- Back-end: Express, node.js, mongoDB, mongoose

## Getting Started

### Prerequisites

- Node.js
- mongoDB

### Installing

1. Download this project.
2. `npm install`
3. `npm start`
4. Navigate to localhost:6660 in your browser.

### Database Setup
IMPORTANT: Execute the following commands in the terminal where you have mongo running:
```
use realestate;

db.rentals.update({}, {$set: {values: 0}}, {multi: true});

db.rentals.find().forEach(function(r){r.values = Math.round(1000*r.sqft/r.rent)/1000; db.rentals.save(r);})

db.listings.update({}, {$set: {values: 0}}, {multi: true});

db.listings.find().forEach(function(r){r.values = Math.round(1000*r.sqft/r.cost)/1000; db.listings.save(r);})
```

## Screenshots

Main view with top deals:
![wkd5_preview](https://user-images.githubusercontent.com/29472568/33973474-b774ddf2-e048-11e7-801c-cd3d9d3c6014.png)

Search and sort functionality:
![wkd5_preview2](https://user-images.githubusercontent.com/29472568/33973477-bbed8820-e048-11e7-8adc-13480d2c4d18.png)


### Completed Features

- [x] Post new properties
- [x] Delete properties
- [x] Edit properties
- [x] Search through displayed properties
- [x] Sort properties by cost or by size

### Next Steps

- [] Favorites functionality
- [] Form validation
- [] Images of houses
- [] Refactor code to handle rentals and listings with a single set of functions
- [] Add filter options to search (cost range, number of hits)
