
# Golden Ratio Realty!

## Getting Started
IMPORTANT: Execute the following commands in the terminal where you have mongo running:

```
use realestate;

db.rentals.update({}, {$set: {values: 0}}, {multi: true});

db.rentals.find().forEach(function(r){r.values = Math.round(1000*r.sqft/r.rent)/1000; db.rentals.save(r);})
```
