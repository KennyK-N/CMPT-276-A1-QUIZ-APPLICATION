var Index = 1;
var submit_button = document.querySelector("button[id=Finish_button]");
submit_button.addEventListener("click", submit);
var answer = [];
var button_disable = document.querySelectorAll("button");
var multiple_choice_usr_ans = document.querySelectorAll(
  "input[class='multiple_choice']"
);
var written_usr_ans = document.querySelectorAll("input[class='written']");
var matching_usr_ans = document.querySelectorAll("input[class='matching']");

showDivs(Index);

function move_divs(n) {
  console.log(Index);
  showDivs((Index += n));
}

function showDivs(n) {
  for (var i = 0; i < button_disable.length; i++) {
    button_disable[i].disabled = true;
  }
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
      ? slide_array[Index - 1].querySelector("input").type
      : null;
  var currentslide = slide_array[Index - 1];
  console.log(input_check);
  currentslide.addEventListener("animationend", function () {
    for (var i = 0; i < button_disable.length; i++) {
      button_disable[i].disabled = false;
    }
  });
  currentslide.style.display = "flex";
}

function submit(e) {
  e.preventDefault();
  alert("done_remove later");
}
