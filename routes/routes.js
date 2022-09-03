// EXPORT ROUTES TO CONTROLLERS
module.exports = function(app) {
	const express = require("express");
	const router = express.Router();
   
	// CREATE LINK TO CONTROLLERS
	const vehicleController = require('../controllers/vehicle_controller.js');
	const path = `${__basedir}/views/`;
  
	// CREATE ROUTE TO CORRESPOND TO HTTP METHOD
	router.use(function (req, res, next) {
		console.log("/" + req.method);
		next();
	});

	// CREATE ROUTE TO SEND DATA TO "HOME" PAGE
	app.get('/', (req,res) => {
		res.sendFile(`${path}index.html`);
	});
	 
	// SAVE A VEHICLE TO MongoDB - CREATE
	app.post('/', vehicleController.save);

	// RETRIEVE ALL VEHICLES - READ
	app.get('/api/vehicles/all', vehicleController.findAll);

	// DELETE A VEHICLE BY ID - DELETE
	app.delete('/api/vehicles/delete/:id', vehicleController.deleteById)
	
	// CREATE ROUTE TO RETRIEVE VEHICLES
	app.use("/",router);

	// 6. CREATE ROUTE TO 404.html PAGE, IF ROUTE/PAGE IS "NOT FOUND"
	app.use("*", (req,res) => {
		res.sendFile(`${path}404.html`);
	})
} 
