// REQUIRE MONGOOSE
const mongoose = require('mongoose');

// CREATE SCHEMA THAT STORES DATA TO DATABASE
// EACH CAR SHOULD HAVE A MAKE, MODEL, ENGINE, COLOR, AND TIRE SIZW ASSOCIATED WITH IT)
const VehicleSchema = mongoose.Schema({
   make: String,
   model: String,
   engine: {
      type: String,
      enum: [
         'V6 - Auto Trans 2.5hp',
         'V6 - Manual Trans 4.0hp',
         'V8 - Auto Trans 3.5hp',
         'V8 - Auto Trans 6.4hp',
         'V12 - Manual Trans 6.5hp',
      ],
      default: 'V6 - Auto Trans 2.5hp'
   },
   color: {
      type: String,
      enum: [
         'JET BLACK',
         'WHITE DIAMOND',
         'BLUE (w/ Metallic Flakes)',
         'GOLD (w/ Metallic Flakes)',
         'SILVER (w/ Metallic Flakes)',
         'BURGUNDY (w/ Metallic Flakes)',
      ],
      default: 'JET BLACK'
   },
   tires: {
      type: String,
      enum: [
         '20 - Asanti',
         '20 - Forgiato',
         '22 - Asanti',
         '22 - Forgiato',
         '24 - Asanti',
         '24 - Forgiato',
      ],
      default: '20 - Asanti'
   },
});

// EXPORT VEHICLE SCHEMA
module.exports = mongoose.model('Vehicle', VehicleSchema);
