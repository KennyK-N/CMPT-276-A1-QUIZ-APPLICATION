var Index = 1;
var score = 0;
var reached_end = false;
var submit_button = document.querySelector("button[id=Finish_button]");
submit_button.addEventListener("click", submit);
var answer = [
  "website",
  "1",
  "web",
  "w32b",
  "wbx",
  "2",
  ["up"],
  ["salmon", "up"],
  "3",
  "4",
  "mxb",
  "1",
];
var multi_ans_idx = {
  3: 1,
  7: 2,
  8: { 0: 4 },
  9: {
    0: 1,
    1: 4,
  },
  10: 3,
  11: 4,
  13: 1,
};
var num_correct_question = [
  false,
  false,
  false,
  false,
  false,
  false,
  [false],
  [false, false],
  false,
  false,
  false,
  false,
];

var button_disable = document.querySelectorAll("button");

showDivs(Index);

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
  var checkbox_index = 0;
  var multi_checked_input = true;
  var checkbox_no_wrong_value = true;
  var currentslide =
    slide_array[Index - 1].querySelectorAll("input") != null
      ? slide_array[Index - 1].querySelectorAll("input")
      : null;
  if (
    currentslide != null &&
    currentslide.length !== 0 &&
    currentslide[0] != null
  ) {
    switch (currentslide[0].type) {
      case "text":
        if (currentslide[0].disabled == true) break;
        var inputValue = currentslide[0].value.trim();
        if (inputValue === answer[Index - 2]) {
          score++;
          currentslide[0].style.backgroundColor = "#cdeccd";
          currentslide[0].style.color = "#006400";
          num_correct_question[Index - 2] = true;
        } else if (inputValue === "") {
          return;
        } else {
          currentslide[0].style.backgroundColor = "#ffcccc";
          currentslide[0].style.color = "#990000";
          //display error message and correct answer
        }
        currentslide[0].disabled = true;
        break;
      case "radio":
        if (currentslide[0].disabled == true) break;
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
                "input#ans_" + String(multi_ans_idx[Index]) + " + label"
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
        break;
      case "checkbox":
        if (currentslide[0].disabled == true) break;
        for (var j = 0; j < 4; j++) {
          //rewrite to be cleaner
          if (currentslide[j].checked === true) {
            disable_input(currentslide);
            if (
              checkbox_index < answer[Index - 2].length &&
              currentslide[j].value === answer[Index - 2][checkbox_index]
            ) {
              checkbox_index++;
              if (checkbox_no_wrong_value == true) {
                multi_checked_input = false;
                num_correct_question[Index - 2][checkbox_index] = true;
              }
            } else {
              multi_checked_input = false;
              checkbox_no_wrong_value = false;
              change_color_text(
                slide_array[Index - 1].querySelector(
                  "input#ans_" + String(j + 1) + " + label"
                ),
                "#990000",
                " &#10005;"
              );
              //display error message and correct answer
            }
          }
        }
        if (multi_checked_input == true) return;
        if (checkbox_no_wrong_value == true) {
          score++;
        } else {
          for (var i = 0; i < answer[Index - 2].length; i++) {
            num_correct_question[Index - 2][i] = false;
          }
        }
        for (var i = 0; i < answer[Index - 2].length; i++) {
          if (
            num_correct_question[Index - 2][i] == false &&
            checkbox_no_wrong_value == false
          ) {
            change_color_text(
              slide_array[Index - 1].querySelector(
                "input#ans_" + String(multi_ans_idx[Index][i]) + " + label"
              ),
              "#006400",
              ""
            );
          } else {
            change_color_text(
              slide_array[Index - 1].querySelector(
                "input#ans_" + String(multi_ans_idx[Index][i]) + " + label"
              ),
              "#006400",
              " &#10003;"
            );
          }
        }
        multi_checked_input = true;
        checkbox_index = 0;
        checkbox_no_wrong_value = true;
        break;
      default:
        break;
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
  finalSlide.innerHTML = "HELLO";

  finalSlide.classList.add("fadeinout_animation");

  finalSlide.addEventListener("animationend", function () {
    for (var i = 0; i < button_disable.length; i++) {
      button_disable[i].disabled = false;
    }

    finalSlide.removeAttribute("class");
  });
  alert("Your score " + score + " done_remove later");
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
