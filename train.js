 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCeqK2e-MqZ_DJHM6hr8S1WdOR7TLGR9nw",
    authDomain: "utahuniversityfirebase.firebaseapp.com",
    databaseURL: "https://utahuniversityfirebase.firebaseio.com",
    projectId: "utahuniversityfirebase",
    storageBucket: "utahuniversityfirebase.appspot.com",
    messagingSenderId: "310897204567"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Live Time of The Day 

  var updateTime = function(){
  	var now = moment().format('hh:mm');
  	$('#currentTime').html(now);
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);
});

  /*******************************************/

$('#submit').on('click', function(){

	// Retrieve user inputs from form
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Create an object for new train to be added
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');



	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;


	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + firstTrain + "</td><td>" + "Unknown" + "</td></tr>");

});
