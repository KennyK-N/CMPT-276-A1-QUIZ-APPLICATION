var Index = 1;
var score = 0;
var reached_end = false;
var submit_button = document.querySelector("button[id=Finish_button]");
submit_button.addEventListener("click", submit);
var button_disable = document.querySelectorAll("button");
var answer = ["1", "1", "4", "2", "3", "2", "3", "1", "3", "4", "2", "1"];
var correct_answer_position = {
  2: 1,
  3: 1,
  4: 4,
  5: 2,
  6: 3,
  7: 2,
  8: 3,
  9: 1,
  10: 3,
  11: 4,
  12: 2,
  13: 1,
};
var num_correct_question = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

function move_divs(n) {
  Index += n;
  showDivs(Index);
}

function showDivs(n) {
  var slide_array = document.getElementsByClassName("quiz_slides");
  if (n > slide_array.length) {
    switch (reached_end) {
      case true:
        Index = 1;
        break;
      case false:
        console.log("inf loop");
        Index = slide_array.length;
        return;
    }
  } else if (n < 1) {
    switch (reached_end) {
      case true:
        Index = slide_array.length;
        break;
      case false:
        console.log("inf loop");
        Index = 1;
        return;
    }
  }
  for (var i = 0; i < button_disable.length; i++) {
    button_disable[i].disabled = true;
  }
  console.log(Index);
  for (var i = 0; i < slide_array.length; i++) {
    slide_array[i].style.display = "none";
  }

  //
  var currentslide = slide_array[Index - 1];
  currentslide.addEventListener("animationend", function () {
    for (var i = 0; i < button_disable.length; i++) {
      button_disable[i].disabled = false;
    }
  });
  currentslide.style.display = "flex";
}

function submit_and_showdev(n) {
  var slide_array = document.getElementsByClassName("quiz_slides");
  var multi_checked_input = true;
  var currentslide =
    slide_array[Index - 1].querySelectorAll("input") != null
      ? slide_array[Index - 1].querySelectorAll("input")
      : null;
  if (
    currentslide != null &&
    currentslide.length !== 0 &&
    currentslide[0] != null
  ) {
    if (currentslide[0].disabled != true) {
      for (var j = 0; j < 4; j++) {
        if (
          currentslide[j].checked === true &&
          currentslide[j].value === answer[Index - 2]
        ) {
          disable_input(currentslide);
          score++;
          multi_checked_input = false;
          change_color_text(
            slide_array[Index - 1].querySelector(
              "input#ans_" + String(j + 1) + " + label"
            ),
            "#006400",
            " &#10003;"
          );
          num_correct_question[Index - 2] = true;
          break;
        } else if (currentslide[j].checked === true) {
          //display error message and correct answer
          //PLAY ANIMATION AND SLOWLY SHOW THE TEXT CHANGING COLOR, ETC, THEN MOVE THE NEXT PAGE
          // SIMILAR TO USING THE animation end thing
          disable_input(currentslide);
          change_color_text(
            slide_array[Index - 1].querySelector(
              "input#ans_" + String(j + 1) + " + label"
            ),
            "#990000",
            " &#10005;"
          );
          change_color_text(
            slide_array[Index - 1].querySelector(
              "input#ans_" + String(correct_answer_position[Index]) + " + label"
            ),
            "#006400",
            ""
          );
          multi_checked_input = false;
          break;
        }
      }
      if (multi_checked_input == true) return;
      multi_checked_input = true;
    }
  }
  move_divs(n);
}
function disable_input(currentslide) {
  currentslide[0].disabled = true;
  currentslide[1].disabled = true;
  currentslide[2].disabled = true;
  currentslide[3].disabled = true;
}
//change this A FUNCTION to check correct answer when user press nextt
// Provide feedback for each answer selected (e.g., highlighting the user's answer and the correct answer).
// WHEN USER PRESS NEXT IT AUTO EVALUATE
//PROB DONT NEED A LOOP BUT WILL PROB NEED ARRAY TO KEEP TRACK OF WHATS RIGHT OR WRONG FOR END RESULT
function submit(e) {
  e.preventDefault();
  var slide_array = document.getElementsByClassName("quiz_slides");
  var finalSlide = slide_array[13].querySelector("span");
  for (var i = 0; i < button_disable.length; i++) {
    button_disable[i].disabled = true;
  }
  openModal();
  finalSlide.innerHTML = "HELLO";
  //MAKE THIS A FUNCTION
  finalSlide.classList.add("fadeinout_animation");

  finalSlide.addEventListener("animationend", function () {
    for (var i = 0; i < button_disable.length; i++) {
      button_disable[i].disabled = false;
    }

    finalSlide.removeAttribute("class");
  });
  reached_end = true;
}

function change_color_text(html_element, usr_color, text) {
  html_element.innerHTML += text;
  html_element.style.color = usr_color;
}

// add an error message below the input box using span if user tries to submit an empty answer for each slide
// also remoe the error message when user successfully submitted

function openModal() {
  document.getElementById("overlay").style.display = "block";
  document.querySelector("#overlay h3").textContent =
    "Congratulations on finishing the quiz your score for the quiz is " +
    score +
    "/12";
  window.addEventListener("click", closeOnOutsideClick);
}

function closeModal() {
  document.getElementById("overlay").style.display = "none";
  window.removeEventListener("click", closeOnOutsideClick);
}

function closeOnOutsideClick(event) {
  event.preventDefault();
  if (event.target === document.getElementById("overlay")) {
    closeModal();
  }
}

showDivs(Index);
//REMOVE CONSOLE.LOG

//USE A TABLE FOR RESULT SECTION TO DISPLAY USER SCORE, ANSWER AND CHOICES
