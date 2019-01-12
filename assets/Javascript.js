


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfvCstMjyaeJs7S08PelMh-MiIzyOqdoE",
  authDomain: "trains2-7fc15.firebaseapp.com",
  databaseURL: "https://trains2-7fc15.firebaseio.com",
  projectId: "trains2-7fc15",
  storageBucket: "trains2-7fc15.appspot.com",
  messagingSenderId: "512203242111"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {
  var currentTime = new moment().format("HH:mm");
  console.log(currentTime);

  //  Button for trains
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainNameinput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var timeInput = $("#timeInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    

    database.ref().push({
      trainName: trainName,
      destination: destination,
      timeInput: timeInput,
      frequencyInput: frequencyInput,


    });
    

    
    

    // Clears all of the text-boxes
    $("#trainNameinput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");


  });
});
//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());


// grab data from firebase
  trainName = childSnapshot.val().trainName;
  destination = childSnapshot.val().destination;
  timeInput = childSnapshot.val().timeInput;
  frequencyInput = childSnapshot.val().frequencyInput;

  frequencyInput = parseInt(frequencyInput)
  timeInput = parseInt(timeInput)

  //moment JS

  var firstTrain = moment(timeInput, "hh:mm").subtract(1, "years");

  // calculate time between current time and first train

  var inBetween = moment().diff(moment(firstTrain), "minutes");

  // divide inBetween by frequency of trains

  var timeApart = inBetween % frequencyInput;

  var minutesAway = frequencyInput - timeApart

  var nextTrainArrival = moment().add(minutesAway, "minutes");

  var newRow = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td class="centered">').text('every ' + frequencyInput + ' mins'),
    $('<td class="centered">').text(moment(nextTrainArrival).format('hh:mm a')),
    $('<td class="centered">').text(minutesAway + ' mins away')        
);

// add new train row to table body
$("tbody").append(newRow);


});
  //   var timeRemainder = moment().diff(moment.unix(timeInput), "minutes") % frequencyInput;
  //   var minutes = frequencyInput - timeRemainder; 

  //   var nextTrainArrival = moment().add(minutes, "minutes").format("hh:mm"); 
   
    
    
  //   $("tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + timeInput + "</td><td>" + nextTrainArrival + "</td><td>" + frequencyInput + "</td><td>" + minutes + "</td></tr>");
 
  // });