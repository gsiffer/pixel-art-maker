// Find elemnts by their ID and assign them to a variable.
const table = document.querySelector("#pixelCanvas");
const inputHeight = document.querySelector("#inputHeight");
const inputWidth = document.querySelector("#inputWidth");
const inputButton = document.querySelector("#inputButton");
const inputColor = document.querySelector("#colorPicker");
const fillGridButton = document.querySelector("#fillGridButton");

intro();
// This block create the first grid with pixels when user load/reload the page.
function intro() {
  makeGrid(6, 27);
  table.style.backgroundColor = "rgb(2, 179, 228)";
  var numbers = [28, 30, 32, 33, 36, 37, 38, 40, 41, 42, 44, 46, 47, 48, 50,
     52, 55, 57, 59, 61, 63, 65, 67, 71, 74, 77, 79, 82, 84, 86, 88, 90, 91,
     92, 94, 98, 101, 105, 109, 110, 111, 113, 114, 117, 119, 121, 122, 123,
     125, 128, 132];
  var element = document.querySelectorAll("td");
  var i = 0;
  var pixel = setInterval(function() {
    if (i === 50) {
      clearInterval(pixel);
    }
    element[numbers[i]].style.backgroundColor = "rgb(255, 255, 255)";
    i += 1;
  }, 50);
}
/* When user hit the 'Submit' button it'll create a new grid and delete
the previous one */
inputButton.addEventListener("click", function() {
  if (table.getAttribute("style")) {
    table.removeAttribute("style");
  }
  table.innerHTML = "";
  if (inputHeight.value <= 100 && inputWidth.value <= 100) {
    makeGrid(inputHeight.value, inputWidth.value);
  } else {
    alert("** Height and Width must be between 1 and 100 **");
  }
});
// It fills the background with the chosen color.
fillGridButton.addEventListener("click", function() {
  table.style.backgroundColor = inputColor.value;
});
// It creates squares in the grid with Event Listener.
function makeGrid(row, column) {
  for (let r = 1; r <= row; r++) {
    const rowElement = document.createElement("tr");
    table.appendChild(rowElement);
    for (let c = 1; c <= column; c++) {
      const colElement = document.createElement("td");
      colElement.addEventListener("click", clickOnGridSquare);
      rowElement.appendChild(colElement);
    }
  }
}
// It fills squares with color and delete it if user click on it again.
function clickOnGridSquare() {
  if (formatRgb(event.target.style.backgroundColor) === inputColor.value) {
      event.target.removeAttribute("style");
    } else {
      event.target.style.backgroundColor = inputColor.value;
    }
}
// It converts 'RGB' to 'HEX'one by one.
function rgbToHex(rgb) {
    var hex = rgb.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
// Convert 'RGB' to 'HEX'
function rgbConvert(r, g, b) {
    return "#" + rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
}
// It takes out 'RGB' color values and puts them to an array.
function formatRgb(color) {
  var rgb = color;
  var len = rgb.length;
  rgb = (rgb.slice(4, len -1)).split(",");
  return rgbConvert(parseInt(rgb[0], 10),
                    parseInt(rgb[1], 10), parseInt(rgb[2], 10));
}
