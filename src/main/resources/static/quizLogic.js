var Index = 1;
var submit_button = document.querySelector("button[id=Finish_button]");
var slide_array_s = document.querySelectorAll(
  "div.quiz_slides input[class='written']"
);
submit_button.addEventListener("click", submit);
var answer = [];

showDivs(Index);

function move_divs(n) {
  console.log(Index);
  showDivs((Index += n));
}

function showDivs(n) {
  var slide_array = document.getElementsByClassName("quiz_slides");
  if (n > slide_array.length) {
    console.log("work");
    Index = 1;
  }
  if (n < 1) {
    Index = slide_array.length;
  }
  for (var i = 0; i < slide_array.length; i++) {
    slide_array[i].style.display = "none";
  }
  var input_check =
    slide_array[Index - 1].querySelector("input") != null
      ? slide_array[Index - 1].querySelector("input")
      : null;
  console.log(input_check);
  slide_array[Index - 1].style.display = "flex";
}

function submit(e) {
  e.preventDefault();
  alert("done_remove later");
}
