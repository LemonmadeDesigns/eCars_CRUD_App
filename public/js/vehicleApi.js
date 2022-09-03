$( document ).ready(function() {

	// CREATE GET REQUEST ON CLICK - (target eventhandler)
	$("#allVehicles").click(function (event) {

		// Prevent the form from submitting via the browser.
		// event.preventDefault()
		console.log('clicked')

		// CALL AJAX GET FUNCTION
		ajaxGet()
	})

	// CREATE DELETE REQUEST ON CLICK - (target eventhandler)
	$("body").on('click', 'button.deleteVehicle', (evt) => {

		// Prevent the form from submitting via the browser.
		evt.preventDefault()
		const targetId = evt.target.id

		console.log('deleting, ', targetId)
		ajaxDelete(targetId)
	})
	
	// SUBMIT FORM ON CLICK - (target eventhandler)
  $("#vehicleForm").submit(function(event) {
		
		// Prevent the form from submitting via the browser.
		event.preventDefault();

		// CALL AJAX POST FUNCTION
		ajaxPost();
	});
})

// CREATE AJAX GET FUNCTION
function ajaxGet() {
	$.ajax({
		type: "GET",
		url: "/api/vehicles/all",

		// IF SUCCESS, DISPLAY
		success: function (result) {
			$('#getResultDiv ul').empty();
			$.each(result, function (i, vehicle) {
					$('#getResultDiv .list-group').append(vehicleData(vehicle, i))
			});
			
			// DISPLAY IN CONSOLE
			console.log("Success: ", result);
		},
		// IF ERROR, DISPLAY
		error: function (e) {
			$("#getResultDiv").html("<strong>Error</strong>");

			// DISPLAY IN CONSOLE
			console.log("ERROR: ", e);
		}
	});
}

// CREATE AJAX DELETE FUNCTION
function ajaxDelete(vehicleId) {
	$.ajax({
		type: 'DELETE',
		url: `/api/vehicles/delete/${vehicleId}`,

		// IF SUCCESS, DISPLAY IN CONSOLE
		success: (result) => {
			console.log('deleted ', result)
		}
	})
}

// CREATE AJAX POST FUNCTION
function ajaxPost(){
		
	// PREPARE FORM DATA
	const formData = {
		make:  	$("#make").val(),
		model: 	$("#model").val(),
		engine: $("#engine").val(),
		color: 	$("#color").val(),
		tires: 	$("#tires").val()
	}
	
	// POST DATA
	$.ajax({

		// CREATE HEADER
		type : "POST",
		contentType : "application/json",
		url : window.location + "api/vehicles/save",
		data : JSON.stringify(formData),
		dataType : 'json',

		// IF SUCCESS, DISPLAY VEHICLE OBJECT
		success : function(vehicle) {
			$("#postResult").html(
        `<p>Post Successfully! <br>--> A ${vehicle.color} ${vehicle.make} ${vehicle.model} on ${vehicle.tires}'s </p>`
      );
		},
		error : function(e) {
			alert("Error!")

			// DISPLAY IN CONSOLE
			console.log("ERROR: ", e);
		}
	});
		
	// RESET FORM DATA AFTER POSTING
	resetData();

}

// CREATE RESET FORM DATA FUNCTION
function resetData() {
	$("#make").val("");
	$("#model").val("");
	$("#engine").val("");
	$("#color").val("");
	$("#tires").val("");
}

// CREATE FUNCTION THAT APPENDS DELETE BUTTON ON EACH VEHICLE OBJECT
const vehicleData = (vehicle, vehicleNumber) => {
	const deleteButton = document.createElement('button')
	deleteButton.onclick = () => console.log(`delete vehicle id ${vehicle.id}`)
	return (
		`<div>
			<div># ${vehicleNumber+1}</div>
			<div><h3>Make:</h3> ${vehicle.make}</div>
			<div><h3>Model:</h3> ${vehicle.model}</div>
			<div><h3>Engine:</h3> ${vehicle.engine}</div>
			<div><h3>Color:</h3> ${vehicle.color}</div>
			<div><h3>Tires:</h3> ${vehicle.tires}</div>
			<button class="deleteVehicle" id="${vehicle._id}">Delete</button>
		</div>
		<br/>`
	)
}
