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
/*var multiple_choice_usr_ans = document.querySelectorAll(
  "input[class='multiple_choice']"
);*/
//var written_usr_ans = document.querySelectorAll("input[class='written']");
//var checkbox_usr_ans = document.querySelectorAll("input[class='matching']");

showDivs(Index);

function move_divs(n) {
  Index += n;
  showDivs(Index);
}

function showDivs(n) {
  for (var i = 0; i < button_disable.length; i++) {
    button_disable[i].disabled = true;
  }
  var slide_array = document.getElementsByClassName("quiz_slides");
  if (n > slide_array.length) {
    console.log("work");
    Index = 1;
  } else if (n < 1) {
    Index = slide_array.length;
    //set to 1
  }
  console.log(Index);
  for (var i = 0; i < slide_array.length; i++) {
    slide_array[i].style.display = "none";
  }
  var input_check =
    slide_array[Index - 1].querySelector("input") != null
      ? slide_array[Index - 1].querySelector("input").type
      : null;

  //CALL THE CHECK ANSWER FUNCTION

  //
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
  var html_item_overwrite;
  var multI_ans_wrong = true;
  var currentslide;
  var checkbox_index = 0;
  var slide_array = document.getElementsByClassName("quiz_slides");
  for (var i = 0; i < 12; i++) {
    currentslide = slide_array[i + 1].querySelectorAll("input");
    switch (currentslide[0].type) {
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
          html_item_overwrite = slide_array[i + 1].querySelector(
            "input#ans_" + String(j + 1) + " + label"
          );
          if (
            currentslide[j].checked === true &&
            currentslide[j].value === answer[i]
          ) {
            score++;
            change_color_text(html_item_overwrite, "green", " &#10003;");
            break;
          } else if (currentslide[j].checked === true) {
            //display error message and correct answer
            //PLAY ANIMATION AND SLOWLY SHOW THE TEXT CHANGING COLOR, ETC, THEN MOVE THE NEXT PAGE
            // SIMILAR TO USING THE animation end thing
            change_color_text(html_item_overwrite, "red", " &#10005;");
            //HARD CODE AND STYLE COLOR THE CORRECT ANSWER
            break;
          }
        }
        break;
      case "checkbox":
        for (var j = 0; j < 4; j++) {
          //rewrite to be cleaner
          if (currentslide[j].checked === true) {
            if (
              checkbox_index < answer[i].length &&
              currentslide[j].value === answer[i][checkbox_index]
            ) {
              checkbox_index++;
              multI_ans_wrong = false;
            } else {
              //THERES AN ERROR IN WHICH IF U SELECT ALL OF THEM IT WILL STILL BE CORRECT
              //this is potential fix but not efficient
              multI_ans_wrong = true;
              //display error message and correct answer
            }
          }
        }
        if (multI_ans_wrong == false) {
          score++;
        }
        multI_ans_wrong = true;
        checkbox_index = 0;
        break;
      default:
        break;
    }
  }
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
  //alert("Your score " + score + " done_remove later");
}

function change_color_text(html_element, usr_color, text) {
  html_element.innerHTML += text;
  html_element.style.color = usr_color;
}
//test
