
  
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDWZCLrPn_miQM2md5_ZY1Joni4NhE3RH4",
    authDomain: "trains-c1ea0.firebaseapp.com",
    databaseURL: "https://trains-c1ea0.firebaseio.com",
    projectId: "trains-c1ea0",
    storageBucket: "trains-c1ea0.appspot.com",
    messagingSenderId: "756253599898"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  $(document).ready(function() {
  //  Button for trains

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var timeInput = ("#time-input").val().trim();
    var frequencyInput = ("#frequency-input").val().trim();

    var newTrain = {
      name: trainName,
      place: destination,
      time: timeInput,
      frequency: frequencyInput

    };
    
    database.ref().push(newTrain);

    // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("")


  });
});
//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());



  trainName = childSnapshot.val().name;
  destination = childSnapshot.val().place;
  timeInput = childSnapshot.val().time;
  frequencyInput = childSnapshot.val().frequency;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTrainConverted = moment(timeInput, "hh:mm").subtract(1,"years");

  //current time
  var currentTime = moment();
  console.log(currentTime)

  // Difference between the trains
  var diffTime =moment().diff(moment(firstTrainConverted),"minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % frequencyInput;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = frequencyInput - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   // create new row to hold the new train data
   var newTrain = $('<tr>').append(
    $('<td>').text(trainName),
    $('<td>').text(destination),
    $('<td class="centered">').text('every ' + frequency + ' mins'),
    $('<td class="centered">').text(moment(nextTrain).format('hh:mm a')),
    $('<td class="centered">').text(tMinutesTillTrain + ' mins away')        
  );
    //add new train to table
    $("#train-table").append(newTrain);

});
