var slider = document.getElementById("myRange");
var output = document.getElementById("Hue");
var Testszinek,
  i = 0;
Tesztszinek = [
  [128, 191],
  [191, 160],
  [85, 212],
  [213, 149],
  [43, 233],
  [234, 139],
];
szinek = [0, 0, 0, 0, 0, 0, 0];
Elteres = [0, 0, 0, 0, 0, 0, 0];
Eredmeny = [false, false, false, false, false, false, false];

output.innerHTML = slider.value;

slider.oninput = function () {
  var Colordiv;
  output.innerHTML = this.value;
  Colordiv = "rgb(" + this.value + "," + this.value + ",0)";
  document.getElementById("color-right").style.backgroundColor = Colordiv;
};

function kiertekel1() {
  var text;
  if (i == 6) {
    document.getElementById("p1").innerHTML = "<b>ANOMALOSCOPE</b><br>1/7";
  } else {
    document.getElementById("p1").innerHTML =
      "<b>ANOMALOSCOPE</b><br>" + (i + 2) + "/7";
  }
  document.getElementById("p2").innerHTML = i + 1 + "/7 - match.";
  Eredmeny[i] = true;
  szinek[i] = parseInt(output.innerHTML);
  tCiklus();
}
function kiertekel2() {
  var text;
  if (i == 6) {
    document.getElementById("p1").innerHTML = "<b>ANOMALOSCOPE</b><br>1/7";
  } else {
    document.getElementById("p1").innerHTML =
      "<b>ANOMALOSCOPE</b><br>" + (i + 2) + "/7";
  }
  document.getElementById("p2").innerHTML = i + 1 + "/7 - no match possible.";
  Eredmeny[i] = false;
  tCiklus();
}

function tCiklus() {
  var Colordiv;
  if (i == 6) {
    i = -1;
    Colordiv = "rgb(170,170,0)";
  }
  if (i == -1) {
    Colordiv = "rgb(170,170,0)";
    Vege();
  }
  if (i != -1) {
    Colordiv = "rgb(" + Tesztszinek[i] + ",0)";
  }
  document.getElementById("color-left").style.backgroundColor = Colordiv;
  i = i + 1;
}

function Vege() {
  var vegeredmeny = ["", "", "", "", "", "", ""];
  var diagnozis;
  var j = 0;
  if (Eredmeny[0]) {
    j = j + 1;
    Elteres[0] = Math.pow(
      Math.pow(170 - parseInt(output.innerHTML), 2) +
        Math.pow(170 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (Eredmeny[1]) {
    j = j + 1;
    Elteres[1] = Math.pow(
      Math.pow(128 - parseInt(output.innerHTML), 2) +
        Math.pow(191 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (Eredmeny[2]) {
    j = j + 1;
    Elteres[2] = Math.pow(
      Math.pow(191 - parseInt(output.innerHTML), 2) +
        Math.pow(160 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (Eredmeny[3]) {
    j = j + 1;
    Elteres[3] = Math.pow(
      Math.pow(85 - parseInt(output.innerHTML), 2) +
        Math.pow(212 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (Eredmeny[4]) {
    j = j + 1;
    Elteres[4] = Math.pow(
      Math.pow(213 - parseInt(output.innerHTML), 2) +
        Math.pow(149 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (Eredmeny[5]) {
    j = j + 1;
    Elteres[5] = Math.pow(
      Math.pow(43 - parseInt(output.innerHTML), 2) +
        Math.pow(233 - parseInt(output.innerHTML), 2),
      0.5
    );
  }
  if (Eredmeny[6]) {
    j = j + 1;
    Elteres[6] = Math.pow(
      Math.pow(234 - parseInt(output.innerHTML), 2) +
        Math.pow(139 - parseInt(output.innerHTML), 2),
      0.5
    );
  }

  if (
    Eredmeny[0] &
    (Eredmeny[1] == false) &
    (Eredmeny[2] == false) &
    (Eredmeny[3] == false) &
    (Eredmeny[4] == false) &
    (Eredmeny[5] == false) &
    (Eredmeny[6] == false) &
    (Elteres[0] < 10)
  ) {
    diagnozis = "<b>Normal color vision<br>";
  } else {
    if ((j == 1) & (Elteres[0] > 9)) {
      diagnozis =
        "<b>DIAGNOSIS: Color vision deficiency. The color match is too far in case of the first reference color.<br>";
    }
    if (j == 0) {
      diagnozis =
        "<b>No diagnosis. Inconsistent result. Try again! There is at least one match is possible.<br>";
    }
    if (j == 2) {
      diagnozis = "<b>DIAGNOSIS: Mild color vision deficiency<br>";
    }
    if (j == 3) {
      diagnozis = "<b>DIAGNOSIS: Medium red-green color vision deficiency<br>";
    }
    if (j == 4) {
      diagnozis = "<b>DIAGNOSIS: Medium red-green color vision deficiency<br>";
    }
    if (j == 5) {
      diagnozis = "<b>DIAGNOSIS: Severe red-green color vision deficiency<br>";
    }
    if (j == 6) {
      diagnozis = "<b>DIAGNOSIS: Severe red-green color vision deficiency<br>";
    }
    if (j == 7) {
      diagnozis = "<b>DIAGNOSIS: Severe red-green color vision deficiency<br>";
    }
  }
  if (Eredmeny[0]) {
    vegeredmeny[0] =
      "1/7 match, difference from the reference color: " +
      parseInt(Elteres[0]) +
      "<br>";
  } else {
    vegeredmeny[0] = "1/7 no match possible<br>";
  }
  if (Eredmeny[1]) {
    vegeredmeny[1] =
      "2/7 match, difference from the reference color: " +
      parseInt(Elteres[1]) +
      "<br>";
  } else {
    vegeredmeny[1] = "2/7 no match possible<br>";
  }
  if (Eredmeny[2]) {
    vegeredmeny[2] =
      "3/7 match, difference from the reference color: " +
      parseInt(Elteres[2]) +
      "<br>";
  } else {
    vegeredmeny[2] = "3/7 no match possible<br>";
  }
  if (Eredmeny[3]) {
    vegeredmeny[3] =
      "4/7 match, difference from the reference color: " +
      parseInt(Elteres[3]) +
      "<br>";
  } else {
    vegeredmeny[3] = "4/7 no match possible<br>";
  }
  if (Eredmeny[4]) {
    vegeredmeny[4] =
      "5/7 match, difference from the reference color: " +
      parseInt(Elteres[4]) +
      "<br>";
  } else {
    vegeredmeny[4] = "5/7 no match possible<br>";
  }
  if (Eredmeny[5]) {
    vegeredmeny[5] =
      "6/7 match, difference from the reference color: " +
      parseInt(Elteres[5]) +
      "<br>";
  } else {
    vegeredmeny[5] = "6/7 no match possible<br>";
  }
  if (Eredmeny[6]) {
    vegeredmeny[6] =
      "7/7 match, difference from the reference color: " +
      parseInt(Elteres[6]) +
      "<br>";
  } else {
    vegeredmeny[6] = "7/7 no match possible<br>";
  }

  document.getElementById("p2").innerHTML =
    diagnozis +
    "</b><br>" +
    vegeredmeny[0] +
    vegeredmeny[1] +
    vegeredmeny[2] +
    vegeredmeny[3] +
    vegeredmeny[4] +
    vegeredmeny[5] +
    vegeredmeny[6];

  Rajzol1();
}

window.onload = function Rajzol() {
  var c = document.getElementById("myCanvas");
  var ctx1 = c.getContext("2d");
  var img = document.getElementById("scale");
  img.style.display = "none";
  ctx1.drawImage(img, 0, 0);
  ctx1.stroke();
};

function Rajzol1() {
  var c = document.getElementById("myCanvas");
  var ctx1 = c.getContext("2d");
  var img = document.getElementById("scale");
  img.style.display = "none";
  elipx = 0;
  elipy = 0;
  tan = 1;

  ctx1.drawImage(img, 0, 0);
  ctx1.fillStyle = "red";

  if (Eredmeny[0]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[0], 697 - 2.56 * szinek[0], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (Eredmeny[1]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[1], 697 - 2.56 * szinek[1], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (Eredmeny[2]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[2], 697 - 2.56 * szinek[2], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (Eredmeny[3]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[3], 697 - 2.56 * szinek[3], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (Eredmeny[4]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[4], 697 - 2.56 * szinek[4], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (Eredmeny[5]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[5], 697 - 2.56 * szinek[5], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }
  if (Eredmeny[6]) {
    ctx1.beginPath();
    ctx1.arc(43 + 2.56 * szinek[6], 697 - 2.56 * szinek[6], 5, 0, 2 * Math.PI);
    ctx1.fill();
    ctx1.stroke();
  }

  ctx1.strokeStyle = "Black";
  ctx1.lineWidth = 1;
  if (Eredmeny[0]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[0], 697 - 2.56 * szinek[0]);
    ctx1.lineTo(478, 262);
    ctx1.stroke();
  }
  if (Eredmeny[1]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[1], 697 - 2.56 * szinek[1]);
    ctx1.lineTo(371, 208);
    ctx1.stroke();
  }
  if (Eredmeny[2]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[2], 697 - 2.56 * szinek[2]);
    ctx1.lineTo(532, 287);
    ctx1.stroke();
  }
  if (Eredmeny[3]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[3], 697 - 2.56 * szinek[3]);
    ctx1.lineTo(261, 154);
    ctx1.stroke();
  }
  if (Eredmeny[4]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[4], 697 - 2.56 * szinek[4]);
    ctx1.lineTo(588, 316);
    ctx1.stroke();
  }
  if (Eredmeny[5]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[5], 697 - 2.56 * szinek[5]);
    ctx1.lineTo(153, 101);
    ctx1.stroke();
  }
  if (Eredmeny[6]) {
    ctx1.beginPath();
    ctx1.moveTo(43 + 2.56 * szinek[6], 697 - 2.56 * szinek[6]);
    ctx1.lineTo(642, 341);
    ctx1.stroke();
  }

  if (Eredmeny[0]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[0] + 478);
    elipy = 0.5 * (697 - 2.56 * szinek[0] + 262);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[0],
      Elteres[0] / 2,
      -Math.atan(1),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (Eredmeny[1]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[1] + 371);
    elipy = 0.5 * (697 - 2.56 * szinek[1] + 208);
    tan = (43 + 2.56 * szinek[1] - 371) / (697 - 2.56 * szinek[1] - 208);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[1],
      Elteres[1] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (Eredmeny[2]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[2] + 532);
    elipy = 0.5 * (697 - 2.56 * szinek[2] + 287);
    tan = (43 + 2.56 * szinek[2] - 532) / (697 - 2.56 * szinek[2] - 287);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[2],
      Elteres[2] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (Eredmeny[3]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[3] + 261);
    elipy = 0.5 * (697 - 2.56 * szinek[3] + 154);
    tan = (43 + 2.56 * szinek[3] - 261) / (697 - 2.56 * szinek[3] - 154);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[3],
      Elteres[3] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (Eredmeny[4]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[4] + 588);
    elipy = 0.5 * (697 - 2.56 * szinek[4] + 316);
    tan = (43 + 2.56 * szinek[4] - 588) / (697 - 2.56 * szinek[4] - 316);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[4],
      Elteres[4] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (Eredmeny[5]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[5] + 153);
    elipy = 0.5 * (697 - 2.56 * szinek[5] + 101);
    tan = (43 + 2.56 * szinek[5] - 153) / (697 - 2.56 * szinek[5] - 101);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[5],
      Elteres[5] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  if (Eredmeny[6]) {
    ctx1.beginPath();
    elipx = 0.5 * (43 + 2.56 * szinek[6] + 642);
    elipy = 0.5 * (697 - 2.56 * szinek[6] + 341);
    tan = (43 + 2.56 * szinek[6] - 642) / (697 - 2.56 * szinek[6] - 341);
    ctx1.ellipse(
      elipx,
      elipy,
      1.5 * Elteres[6],
      Elteres[6] / 2,
      -(Math.atan(tan) - Math.PI / 2),
      0,
      2 * Math.PI
    );
    ctx1.stroke();
  }

  alert("THE TEST IS END! Diagnosis below.");
}
