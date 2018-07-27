// Initialize Firebase
var config = {
    apiKey: "AIzaSyAg9qttwGz5qzU9c6llBX2IkmCDNHhQ5KU",
    authDomain: "take-in-cbc30.firebaseapp.com",
    databaseURL: "https://take-in-cbc30.firebaseio.com",
    projectId: "take-in-cbc30",
    storageBucket: "take-in-cbc30.appspot.com",
    messagingSenderId: "482325799781"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var userid;
  var password;
  var userFirst;
  var userLast; 
  var emailvalidate;

  $(".submit").on("click", function(event) {
    event.preventDefault();
     email = $("#email").val().trim();
     emailValidate = $("#email_inline").val().trim();


    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    userFirst = $("#first_name").val().trim();
    email = $("#email").val().trim();
    userLast = $("#last_name").val().trim();
    password = $("#password").val().trim();


    // authentication variable 
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password)
         
    promise.catch( e => console.log(e.message));


    if (email === emailValidate){
        email = $(this).val().trim();

      } else { console.log("emails dont match");
              $("#email").text("Emails Don't Match");
              $("#email_inline").text("Emails Don't Match");
       }         email = null;
    
       

    // Code for the push
    database.ref().push({
      
      userFirst: userFirst,
      email: email,
      userLast: userLast,
      password: password,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    resetForm();
  });

  database.ref().on("value", function(snapshot) {
     
    
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().password);
    console.log(snapshot.val().email);
    console.log(snapshot.val().userLast + snapshot.val().userFirst);
    

   

    // Change the HTML to reflect
    $(".account_display").removeClass("hide");
    $(".account_display").append("<span> Welcome:" +snapshot.val().email +"</span>" +  "<span>" + snapshot.val().userFirst + snapshot.val().userFirst + "</span>");
       
    resetForm();

    database.ref().set({
        userFirst: "",
        email: "",
        userLast: "",
        password: "",

    })
    

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

 
function resetForm() {
   
    
    $("#first_name").val("");
    $("#email").val("");
    $("#last_name").val("");
    $("#password").val("");
    $("#email_inline").val("");

}