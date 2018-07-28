
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
$("#next-b").on("click", function () {

  getReci();

  $(".form-b").fadeOut(500, function () {
  });
  $(".results-b").fadeIn(500, function () {
  });
  console.log("You clicked next-b");
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

  var city;
  var cuisine;
  var price;
  $("#city option:selected").each(function () {
    city = $(this).val();
    console.log(city);
  });

  $("#cuisine option:selected").each(function () {
    cuisine = $(this).val();
    console.log(cuisine)
  });

  $("#range option:selected").each(function () {
    price = $(this).val();
    console.log(price)
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

  city = $("#city").find(":selected").val();
  cuisine = $("#cuisine").find(":selected").val();
  price = $("#range").find(":selected").val();

  var qURL = 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city + '&entity_type=city&count=20&cuisines=' + cuisine + '&sort=cost&order=' + price + '&apikey=e304ed6f3ad9f07bbf5b3447c1a94f04';

  $.ajax({
    url: qURL,
    method: "GET"
  }).then(function (response) {
    console.log("call success");
    let num = Math.floor((Math.random() * response.restaurants.length));
    console.log(num);

    console.log(city + cuisine + price);

    console.log(response.restaurants[num]);
    console.log(qURL);
    $("#results-a").append("<p>" + response.restaurants[num].restaurant.name);
    $("#results-a").append("<p>" +"$ for two: " + response.restaurants[num].restaurant.average_cost_for_two);
    $("#results-a").append("<p>" + response.restaurants[num].restaurant.location.address);
    // $("#results-a").append(response.restaurants[0].restaurant.menu_url);
    
  });
};
// function rand2() {
//   var num = Math.floor((Math.random() * response.meals.length) + 1);
//   return num;
// };

function getReci() {
  var mdbAreaURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a="
  var mdbSelectionURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
  var keywordAPI = $("#type option:selected").val();
  var queryURL = mdbAreaURL + keywordAPI;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    let num = Math.floor((Math.random() * response.meals.length));
    // console.log(response.meals[num].idMeal);
    // console.log(response);
    // console.log(keywordAPI);
    var mealID = response.meals[num].idMeal;
    var mealURL = mdbSelectionURL + mealID;
    $.ajax({
      url: mealURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      thumbDisplay(response, mealID);
      // recipeDisplay(response, mealID);
      displayMeal(response);
    })
  });

};

function thumbDisplay(e, id) {
  var tmbDiv = $("<a>");
  var showThumb = $("<img src=" + e.meals[0].strMealThumb + ">");
  // var recImg = $("<img src=" + e. + ">");
  // recDiv.prepend(recImg);
  tmbDiv.append(showThumb);
  $("#thumb-view").append(tmbDiv);
}


function getID(id) {
  //Function to fetch elements in index.html.
  return document.getElementById(id);
}

var outputDiv = getID('output');

function displayMeal(food) {
  //Displays the content for Read more of Random
  let meal = food.meals[0];
  const ingArray = [];
  const measArray = [];

  for (const ingMeas in meal) {

    if (ingMeas.includes('strIngredient')) {
      //Checks if strIngreient has value 
      //Then push it to an ingArray
      const ing = food.meals[0][ingMeas];
      if (ing) {
        ingArray.push(ing);
      }
    }

    if (ingMeas.includes('strMeasure')) {
      //Checks if strIngreient has value 
      //Then push it to an ingArray
      const meas = food.meals[0][ingMeas];
      if (meas) {
        measArray.push(meas);
      }
    }

  }

  for (const mealData of food.meals) {
    // mealData.strMeal = Meal title
    randomMeal = `
            <div class="recipeWrapper fadeOut">
                <h2><span class="textUppercase">${mealData.strMeal}</span></h2>
                <div class="ingredientsAndInstructions">
                    <div class="cookingIngredients">
                        <div id="ingredients">
                        </div>
                        <div id="measures">
                        </div>
                    </div>
                    <div class="cookingInstructions">
                        ${mealData.strInstructions}
                    </div>
                </div>
            </div>
        `;

    let ingTitles = "";
    for (const ingTitle of ingArray) {
      ingTitles += `<p>${ingTitle}</p>`;
    }

    let measTitles = "";
    for (const measTitle of measArray) {
      measTitles += `<p>${measTitle}</p>`;
    }


    //Adds the content to index.html.
    output.innerHTML = randomMeal;

    const ingDiv = getID('ingredients');
    const measDiv = getID('measures');

    ingDiv.innerHTML = ingTitles;
    measDiv.innerHTML = measTitles;

  }

}



























