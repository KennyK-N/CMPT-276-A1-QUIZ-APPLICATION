var Index = 1;
var score = 0;
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
//NOTE CHECKBOX ANSWER MUST BE IN ORDER
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

//change this A FUNCTION to check correct answer when user press nextt
// Provide feedback for each answer selected (e.g., highlighting the user's answer and the correct answer).
// WHEN USER PRESS NEXT IT AUTO EVALUATE
//PROB DONT NEED A LOOP BUT WILL PROB NEED ARRAY TO KEEP TRACK OF WHATS RIGHT OR WRONG FOR END RESULT
function submit(e) {
  e.preventDefault();
  var current_type;
  var currentslide;
  var current_slide_multi;
  var matching_index = 0;
  var slide_array = document.getElementsByClassName("quiz_slides");
  for (var i = 0; i < 12; i++) {
    if (slide_array[i + 1].querySelectorAll("input").length === 1) {
      currentslide = slide_array[i + 1].querySelectorAll("input");
      current_type = currentslide[0].type;
    } else {
      current_slide_multi = slide_array[i + 1].querySelectorAll("input");
      current_type = current_slide_multi[0].type;
    }
    switch (current_type) {
      case "text":
        if (currentslide[0].value === answer[i]) {
          score++;
          console.log("work");
        } else {
          //display error message and correct answer
          console.log("No work");
        }
        break;
      case "radio":
        for (var j = 0; j < 4; j++) {
          if (
            current_slide_multi[j].checked === true &&
            current_slide_multi[j].value === answer[i]
          ) {
            score++;
          } else {
            //display error message and correct answer
          }
        }
        break;
      case "checkbox":
        for (var j = 0; j < 4; j++) {
          if (current_slide_multi[j].checked === true) {
            if (
              matching_index < answer[i].length &&
              current_slide_multi[j].value === answer[i][matching_index]
            ) {
              matching_index++;
            } else {
              //THERES AN ERROR IN WHICH IF U SELECT ALL OF THEM IT WILL STILL BE CORRECT
              //this is potential fix but not efficient
              matching_index--;
              //display error message and correct answer
            }
          }
        }
        if (matching_index === answer[i].length) {
          score++;
        }
        matching_index = 0;
        break;
      default:
        break;
    }
  }
  alert("Your score " + score + " done_remove later");
}

//test
