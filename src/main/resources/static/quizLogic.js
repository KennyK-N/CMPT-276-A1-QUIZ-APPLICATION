var Index = 1;
var score = 0;
var reached_end = false;
var movenext_div = true;
var submit_button = document.querySelector("button[id=Finish_button]");
submit_button.addEventListener("click", submit);
var start_button = document.querySelector("button[id=start]");
var answer = [
  "25",
  "121",
  "4",
  "12",
  "0",
  "4",
  "900",
  "-1",
  "27",
  "8",
  "24",
  "1",
];
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

start_button.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".btn-container").style.display = "flex";
  start_button.remove();
  document
    .querySelector(".btn-container")
    .scrollIntoView({ behavior: "smooth" });
});

function move_divs(n, current_button) {
  Index += n;
  showDivs(Index, current_button);
}

function showDivs(n, current_button) {
  var button_disable = document.querySelectorAll("button");
  var slide_array = document.getElementsByClassName("quiz_slides");
  if (n > slide_array.length) {
    switch (reached_end) {
      case true:
        Index = 1;
        break;
      case false:
        Index = slide_array.length;
        error_animation_player(current_button);
        return;
    }
  } else if (n < 1) {
    switch (reached_end) {
      case true:
        Index = slide_array.length;
        break;
      case false:
        Index = 1;
        error_animation_player(current_button);
        return;
    }
  }
  for (var i = 0; i < button_disable.length; i++) {
    button_disable[i].disabled = true;
  }

  for (var i = 0; i < slide_array.length; i++) {
    slide_array[i].style.display = "none";
  }

  var currentslide = slide_array[Index - 1];
  currentslide.addEventListener("animationend", function () {
    for (var i = 0; i < button_disable.length; i++) {
      button_disable[i].disabled = false;
    }
  });
  currentslide.style.display = "flex";
}

function submit_and_showdev(n, current_button) {
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
            slide_array[Index - 1].querySelectorAll("input + label")[j],
            "#006400",
            " &#10003;"
          );
          animation_player(
            slide_array[Index - 1].querySelectorAll("input + label")[j]
          );
          num_correct_question[Index - 2] = true;
          break;
        } else if (currentslide[j].checked === true) {
          disable_input(currentslide);
          change_color_text(
            slide_array[Index - 1].querySelectorAll("input + label")[j],
            "#990000",
            " &#10005;"
          );
          animation_player(
            slide_array[Index - 1].querySelectorAll("input + label")[j]
          );
          change_color_text(
            slide_array[Index - 1].querySelectorAll("input + label")[
              correct_answer_position[Index] - 1
            ],
            "#006400",
            ""
          );
          animation_player(
            slide_array[Index - 1].querySelectorAll("input + label")[
              correct_answer_position[Index] - 1
            ]
          );
          multi_checked_input = false;
          break;
        }
      }
      if (multi_checked_input == true) {
        error_animation_player(current_button);
        return;
      }
      multi_checked_input = true;
    }
  }
  if (movenext_div == true) move_divs(n, current_button);
}
function disable_input(currentslide) {
  currentslide[0].disabled = true;
  currentslide[1].disabled = true;
  currentslide[2].disabled = true;
  currentslide[3].disabled = true;
}

function submit(e) {
  e.preventDefault();
  var button_disable = document.querySelectorAll("button");
  var slide_array = document.getElementsByClassName("quiz_slides");
  document.querySelector(".table-container").style.display = "flex";
  openModal();
  reached_end = true;
  button_disable[0].remove();
  slide_array[13].querySelector("h1").textContent =
    "Your Final Score: " + score + "/12";
  var table = document.querySelector(".table-container table tbody");
  for (var i = 1; i < slide_array.length - 1; i++) {
    var newRow = table.insertRow();
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.setAttribute("label", "Questions");
    cell1.textContent = slide_array[i].querySelector("h2").textContent;
    cell2.setAttribute("label", "Correct Answer");
    cell2.textContent = answer[i - 1];
    cell3.setAttribute("label", "Score");
    if (num_correct_question[i - 1] == true) {
      cell3.textContent = "1";
      cell3.style.color = "#006400";
    } else {
      cell3.textContent = "0";
      cell3.style.color = "#990000";
    }
  }
}

function change_color_text(html_element, usr_color, text) {
  html_element.innerHTML += text;
  html_element.style.color = usr_color;
}

function animation_player(Slide) {
  movenext_div = false;
  Slide.classList.add("fadeinout_animation");

  Slide.addEventListener("animationend", function () {
    Slide.removeAttribute("class");
    movenext_div = true;
  });
}

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

function error_animation_player(current_button) {
  var right_button = document.querySelector(".right_button");
  var left_button = document.querySelector(".left_button");
  right_button.disabled = true;
  left_button.disabled = true;
  current_button.classList.add("err_shake");
  current_button.addEventListener("animationend", function () {
    current_button.classList.remove("err_shake");
    right_button.disabled = false;
    left_button.disabled = false;
  });
}

document.querySelector(".table-container").style.display = "none";
showDivs(Index);
