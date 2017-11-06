
# Golden Ratio Realty!

## Getting Started
IMPORTANT: Execute the following commands in the terminal where you have mongo running:

```
use realestate;

db.rentals.update({}, {$set: {values: 0}}, {multi: true});

db.rentals.find().forEach(function(r){r.values = Math.round(1000*r.sqft/r.rent)/1000; db.rentals.save(r);})

db.listings.update({}, {$set: {values: 0}}, {multi: true});

db.listings.find().forEach(function(r){r.values = Math.round(1000*r.sqft/r.cost)/1000; db.listings.save(r);})
```

## Functionality
View, post, edit and delete real estate properties to your heart's content! You can search and sort them too! I took steps toward implementing favorites functionality, but we didn't quite get there!
