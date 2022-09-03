// --- CREATE CONTROLLER --- //

// ROUTE TO VEHICLE MODELS
const Vehicle = require('../models/Vehicle.js');

// FETCH (find) ALL VEHICLES
exports.findAll = (req, res) =>  {
  console.log("Fetching all vehicles");
  Vehicle.find()

  // THEN PROMISE (successCallback)
  .then(vehicles => {
      res.send(vehicles);
      console.log(`Fetching all ${vehicles}`);

  // THEN PROMISE (failureCallback)
  }).catch(err => {
      res.status(500).send({
          message: err.message
      });
  });
};

// SAVE `FormData` - VEHICLE TO MongoDB
exports.save = (req, res) => {
  console.log(`Post a Vehicle: ${JSON.stringify(req.body)}`);
    
  // CREATE A NEW VEHICLE OBJECT ( make, model, engine, color, tires)
  const vehicle = new Vehicle({
    make: req.body.make,
    model: req.body.model,
    engine: req.body.engine,
    color: req.body.color,
    tires: req.body.tires
  });

  // SAVE A VEHICLE IN THE MongoDB
  vehicle.save()
    
    // THEN PROMISE (successCallback)
    .then(data => {
        res.send(data);

    // THEN PROMISE (failureCallback)    
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// DELETE VEHICLE BY ID
exports.deleteById = (req, res) => {
  console.log(`Looking up vehicle ${req.params.id}`)

  Vehicle.deleteOne({
    _id: req.params.id
  })
  // THEN PROMISE (successCallback)
  .then((vehicle) => {
    res.send('Vehicle successfully deleted!')
    console.log(`Delete vehicle ${vehicle._id}`);
    console.log(`Delete vehicle ${req.params.id}`);
    
    // CATCH PROMISE (failureCallback)
  }).catch(err => {
    res.status(500).send({
      message: err.message
    })
  })
}
