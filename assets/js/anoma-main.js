var slider = document.getElementById("myRange");
var output = document.getElementById("Hue");
var TestVar,
  i = 0;
inValue = [
  [128, 191],
  [191, 160],
  [85, 212],
  [213, 149],
  [43, 233],
  [234, 139],
];
colorVal = [0, 0, 0, 0, 0, 0, 0];
calcVal = [0, 0, 0, 0, 0, 0, 0];
boolVal = [false, false, false, false, false, false, false];

output.innerHTML = slider.value;

slider.oninput = function () {
  var Colordiv;
  output.innerHTML = this.value;
  Colordiv = "rgb(" + this.value + "," + this.value + ",0)";
  document.getElementById("color-right").style.backgroundColor = Colordiv;
};

function buttonMatch() {
  var text;
  if (i == 6) {
    document.getElementById("p1").innerHTML = "<b>ANOMALOSCOPE</b><br>1/7";
  } else {
    document.getElementById("p1").innerHTML =
      "<b>ANOMALOSCOPE</b><br>" + (i + 2) + "/7";
  }
  document.getElementById("p2").innerHTML = i + 1 + "/7 - match.";
  boolVal[i] = true;
  colorVal[i] = parseInt(output.innerHTML);
  calcLeftCircle();
}
function buttonNoMatch() {
  var text;
  if (i == 6) {
    document.getElementById("p1").innerHTML = "<b>ANOMALOSCOPE</b><br>1/7";
  } else {
    document.getElementById("p1").innerHTML =
      "<b>ANOMALOSCOPE</b><br>" + (i + 2) + "/7";
  }
  document.getElementById("p2").innerHTML = i + 1 + "/7 - no match possible.";
  boolVal[i] = false;
  calcLeftCircle();
}

function calcLeftCircle() {
  var Colordiv;
  if (i == 6) {
    i = -1;
    Colordiv = "rgb(170,170,0)";
  }
  if (i == -1) {
    Colordiv = "rgb(170,170,0)";
    calcCircle();
  }
  if (i != -1) {
    Colordiv = "rgb(" + inValue[i] + ",0)";
  }
  document.getElementById("color-left").style.backgroundColor = Colordiv;
  i = i + 1;
}

function calcCircle() {
  var optionValueVal = ["", "", "", "", "", "", ""];
  var resultTest;
  var j = 0;
  if (boolVal[0]) {
    j = j + 1;
    calcVal[0] = Math.pow(
      Math.pow(170 - parseInt(output.innerHTML), 2) +
        Math.pow(170 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (boolVal[1]) {
    j = j + 1;
    calcVal[1] = Math.pow(
      Math.pow(128 - parseInt(output.innerHTML), 2) +
        Math.pow(191 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (boolVal[2]) {
    j = j + 1;
    calcVal[2] = Math.pow(
      Math.pow(191 - parseInt(output.innerHTML), 2) +
        Math.pow(160 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (boolVal[3]) {
    j = j + 1;
    calcVal[3] = Math.pow(
      Math.pow(85 - parseInt(output.innerHTML), 2) +
        Math.pow(212 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (boolVal[4]) {
    j = j + 1;
    calcVal[4] = Math.pow(
      Math.pow(213 - parseInt(output.innerHTML), 2) +
        Math.pow(149 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (boolVal[5]) {
    j = j + 1;
    calcVal[5] = Math.pow(
      Math.pow(43 - parseInt(output.innerHTML), 2) +
        Math.pow(233 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (boolVal[6]) {
    j = j + 1;
    calcVal[6] = Math.pow(
      Math.pow(234 - parseInt(output.innerHTML), 2) +
        Math.pow(139 - parseInt(output.innerHTML), 2),
      0.5
    );
  }

  if (
    boolVal[0] &
    (boolVal[1] == false) &
    (boolVal[2] == false) &
    (boolVal[3] == false) &
    (boolVal[4] == false) &
    (boolVal[5] == false) &
    (boolVal[6] == false) &
    (calcVal[0] < 10)
  ) {
    resultTest = "<b>Normal color vision<br>";
  } else {
    if ((j == 1) & (calcVal[0] > 9)) {
      resultTest =
        "<b>DIAGNOSIS: Color vision deficiency. The color match is too far in case of the first reference color.<br>";
    }
    if (j == 0) {
      resultTest =
        "<b>No diagnosis. Inconsistent result. Try again! There is at least one match is possible.<br>";
    }
    if (j == 2) {
      resultTest = "<b>DIAGNOSIS: Mild color vision deficiency<br>";
    }
    if (j == 3) {
      resultTest = "<b>DIAGNOSIS: Medium red-green color vision deficiency<br>";
    }
    if (j == 4) {
      resultTest = "<b>DIAGNOSIS: Medium red-green color vision deficiency<br>";
    }
    if (j == 5) {
      resultTest = "<b>DIAGNOSIS: Severe red-green color vision deficiency<br>";
    }
    if (j == 6) {
      resultTest = "<b>DIAGNOSIS: Severe red-green color vision deficiency<br>";
    }
    if (j == 7) {
      resultTest = "<b>DIAGNOSIS: Severe red-green color vision deficiency<br>";
    }
  }
  if (boolVal[0]) {
    optionValueVal[0] =
      "1/7 match, difference from the reference color: " +
      parseInt(calcVal[0]) +
      "<br>";
  } else {
    optionValueVal[0] = "1/7 no match possible<br>";
  }
  if (boolVal[1]) {
    optionValueVal[1] =
      "2/7 match, difference from the reference color: " +
      parseInt(calcVal[1]) +
      "<br>";
  } else {
    optionValueVal[1] = "2/7 no match possible<br>";
  }
  if (boolVal[2]) {
    optionValueVal[2] =
      "3/7 match, difference from the reference color: " +
      parseInt(calcVal[2]) +
      "<br>";
  } else {
    optionValueVal[2] = "3/7 no match possible<br>";
  }
  if (boolVal[3]) {
    optionValueVal[3] =
      "4/7 match, difference from the reference color: " +
      parseInt(calcVal[3]) +
      "<br>";
  } else {
    optionValueVal[3] = "4/7 no match possible<br>";
  }
  if (boolVal[4]) {
    optionValueVal[4] =
      "5/7 match, difference from the reference color: " +
      parseInt(calcVal[4]) +
      "<br>";
  } else {
    optionValueVal[4] = "5/7 no match possible<br>";
  }
  if (boolVal[5]) {
    optionValueVal[5] =
      "6/7 match, difference from the reference color: " +
      parseInt(calcVal[5]) +
      "<br>";
  } else {
    optionValueVal[5] = "6/7 no match possible<br>";
  }
  if (boolVal[6]) {
    optionValueVal[6] =
      "7/7 match, difference from the reference color: " +
      parseInt(calcVal[6]) +
      "<br>";
  } else {
    optionValueVal[6] = "7/7 no match possible<br>";
  }

  document.getElementById("p2").innerHTML =
    resultTest +
    "</b><br>" +
    optionValueVal[0] +
    optionValueVal[1] +
    optionValueVal[2] +
    optionValueVal[3] +
    optionValueVal[4] +
    optionValueVal[5] +
    optionValueVal[6];

  drawOuterCirc();
}

window.onload = function drawInnerCirc() {
  var c = document.getElementById("myCanvas");
  var ctx1 = c.getContext("2d");
  var img = document.getElementById("scale");
  img.style.display = "none";
  ctx1.drawImage(img, 0, 0);
  ctx1.stroke();
};

function drawOuterCirc() {
  var c = document.getElementById("myCanvas");
  var ctx1 = c.getContext("2d");
  var img = document.getElementById("scale");
  img.style.display = "none";
  elipx = 0;
  elipy = 0;
  tan = 1;

  ctx1.drawImage(img, 0, 0);
  ctx1.fillStyle = "red";

  if (boolVal[0]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[0], 697 - 2.56 * colorVal[0], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (boolVal[1]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[1], 697 - 2.56 * colorVal[1], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (boolVal[2]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[2], 697 - 2.56 * colorVal[2], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (boolVal[3]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[3], 697 - 2.56 * colorVal[3], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (boolVal[4]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[4], 697 - 2.56 * colorVal[4], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (boolVal[5]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[5], 697 - 2.56 * colorVal[5], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (boolVal[6]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * colorVal[6], 697 - 2.56 * colorVal[6], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }

  ctx1.strokeStyle = "Black";
  ctx1.lineWidth = 1;
  if (boolVal[0]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[0], 697 - 2.56 * colorVal[0]);
    ctx1.lineTo(478, 262);
    ctx1.stroke();
  }
  if (boolVal[1]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[1], 697 - 2.56 * colorVal[1]);
    ctx1.lineTo(371, 208);
    ctx1.stroke();
  }
  if (boolVal[2]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[2], 697 - 2.56 * colorVal[2]);
    ctx1.lineTo(532, 287);
    ctx1.stroke();
  }
  if (boolVal[3]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[3], 697 - 2.56 * colorVal[3]);
    ctx1.lineTo(261, 154);
    ctx1.stroke();
  }
  if (boolVal[4]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[4], 697 - 2.56 * colorVal[4]);
    ctx1.lineTo(588, 316);
    ctx1.stroke();
  }
  if (boolVal[5]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[5], 697 - 2.56 * colorVal[5]);
    ctx1.lineTo(153, 101);
    ctx1.stroke();
  }
  if (boolVal[6]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * colorVal[6], 697 - 2.56 * colorVal[6]);
    ctx1.lineTo(642, 341);
    ctx1.stroke();
  }

  if (boolVal[0]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[0] + 478);
    elipy = 0.5 * (697 - 2.56 * colorVal[0] + 262);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[0],
      calcVal[0] / 2,
      -Math.atan(1),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (boolVal[1]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[1] + 371);
    elipy = 0.5 * (697 - 2.56 * colorVal[1] + 208);
    tan = (43 + 2.56 * colorVal[1] - 371) / (697 - 2.56 * colorVal[1] - 208);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[1],
      calcVal[1] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (boolVal[2]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[2] + 532);
    elipy = 0.5 * (697 - 2.56 * colorVal[2] + 287);
    tan = (43 + 2.56 * colorVal[2] - 532) / (697 - 2.56 * colorVal[2] - 287);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[2],
      calcVal[2] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (boolVal[3]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[3] + 261);
    elipy = 0.5 * (697 - 2.56 * colorVal[3] + 154);
    tan = (43 + 2.56 * colorVal[3] - 261) / (697 - 2.56 * colorVal[3] - 154);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[3],
      calcVal[3] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (boolVal[4]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[4] + 588);
    elipy = 0.5 * (697 - 2.56 * colorVal[4] + 316);
    tan = (43 + 2.56 * colorVal[4] - 588) / (697 - 2.56 * colorVal[4] - 316);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[4],
      calcVal[4] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (boolVal[5]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[5] + 153);
    elipy = 0.5 * (697 - 2.56 * colorVal[5] + 101);
    tan = (43 + 2.56 * colorVal[5] - 153) / (697 - 2.56 * colorVal[5] - 101);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[5],
      calcVal[5] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (boolVal[6]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * colorVal[6] + 642);
    elipy = 0.5 * (697 - 2.56 * colorVal[6] + 341);
    tan = (43 + 2.56 * colorVal[6] - 642) / (697 - 2.56 * colorVal[6] - 341);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * calcVal[6],
      calcVal[6] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  alert("THE TEST IS END! Diagnosis below.");
}
