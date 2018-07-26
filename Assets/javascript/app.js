// $(document).ready(function(){
$("#stay-in").on("click", function () {
  console.log("You clicked stay in");
  //$("#subwrapper").remove();   // This removes buttons when clicked

})

// Collapsible works with this here
// take out-------------------------------------------(AM)

$("#take-out").on("click", function () {
  $(".slideholder").fadeOut(500, function () {
  });
  $(".form-a").fadeIn(500, function () {
  });
  console.log("You clicked take out");
})

$("#next-a").on("click", function () {
  
  getRest();

  $(".form-a").fadeOut(500, function () {
  });
  $(".results-a").fadeIn(500, function () {
  });
  console.log("You clicked next-a");
})

// stay in---------------------------------------------
$("#stay-in").on("click", function () {
  $(".slideholder").fadeOut(500, function () {
  });
  $(".form-b").fadeIn(500, function () {
  });
  console.log("You clicked stay in");
})






var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;

  if (slideIndex > x.length) { slideIndex = 1 }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 4000); // Change image every 4 seconds
  //$(".dropdown-trigger").dropdown();
};
// });


// initialization for dropdowns don't touch!!!
document.addEventListener('DOMContentLoaded', function () {
  let options = [{}];
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, options);
});

$("select").change(function () {   // <<<<< this is the correct syntax
  // collecting .val() from RESTAURANT dropdowns (AM)
  $("#city option:selected").each(function () {

  });

  $("#cuisine option:selected").each(function () {

  });

  $("#range option:selected").each(function () {

  });
  // copy one of the 3 calls above and rename them accordingly to the recipie dropdown id's and paste below
  // collect .val() from RECIPE dropdowns
  // --------------------------------------------------------------------
});

// RESTAURANT api and ajax call (AM)


function randomize() {
  var num = Math.floor((Math.random() * 20) + 1);
  return num;
};

// Creating an AJAX call for the specific movie button being clicked (AM)
function getRest() {

  var city = $("#city option:selected").val();
  var cuisine = $("#cuisine option:selected").val();
  var price = $("#range option:selected").val();

  var qURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city + '&entity_type=city&count=20&cuisines=' + cuisine + '&sort=cost&order=' + price + '&apikey=e304ed6f3ad9f07bbf5b3447c1a94f04';

  $.ajax({
    url: qURL,
    method: "GET"
  }).then(function (response) {
    console.log("call sucess");
    // $("#results-a").append(restApi);
    // console.log(response);
    console.log(qURL);
    // $("#results-a").append(response.restaurants[0].restaurant.name);
    // $("#results-a").append(response.restaurants[0].restaurant.average_cost_for_two);
    // $("#results-a").append(response.restaurants[0].restaurant.location.address);
    // $("#results-a").append(response.restaurants[0].restaurant.menu_url);
    // console.log(response.restaurants[randomize()]);
  });
};
















