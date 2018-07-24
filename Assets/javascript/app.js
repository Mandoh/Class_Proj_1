$(document).ready(function () {
  $("#stay-in").on("click", function () {
    console.log("You clicked stay in");
    //$("#subwrapper").remove();   // This removes buttons when clicked

  });

  // Collapsible works with this here


  $("#take-out").on("click", function () {
    $(".slideholder").fadeOut(500, function () {
    });
    $(".form-a").fadeIn(500, function () {
    });
    console.log("You clicked take out");
  });


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
});
document.addEventListener('DOMContentLoaded', function () {
  let options = [{}];
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems, options);
  var instance = M.FormSelect.getInstance(elems);

  $("#next1").on("click", function () {

    console.log("next1");
    console.log(instance.getSelectedValues())
    //$("#subwrapper").remove();   // This removes buttons when clicked

  });
});

















