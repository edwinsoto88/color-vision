if (!window.Colblindor) Colblindor = {};

var slider;
var matchColor;
var redGreenColor;
var yellowColor;
var testId;

Colblindor.Anomaloscope = Class.create();
Colblindor.Anomaloscope.prototype = {

  initialize: function() {
  
    
	slider = new Slider(document.getElementById("color-slider"), document.getElementById("color-slider-input"));
    slider.setMinimum(99);
    slider.setMaximum(255);
    slider.setUnitIncrement(1);
    slider.recalculate();

    this.jg = new jsGraphics(document.getElementById("canvas"));  
    this.jg.setColor("#555555");
    this.jg.drawImage("images/Result-Background.jpg", 21, 10, 320, 140);
    this.jg.drawLine(20, 150, 340, 150);
    this.jg.drawLine(20, 150, 20, 10);
    this.jg.setFont("arial", "12px", Font.BOLD);
    this.jg.drawString("Red-Green Color Mixture", 110, 152);
    this.jg.drawString("Y", 5, 50);
    this.jg.drawString("e", 5, 62);
    this.jg.drawString("l", 7, 74);
    this.jg.drawString("l", 7, 86);
    this.jg.drawString("o", 6, 98);
    this.jg.drawString("w", 5, 110);
    
    this.jg.paint();
    
    this.progressBar = new JS_BRAMUS.jsProgressBar(
      $('progressBar'),
      0,
      {
        showText	: true,
        width		: 320,
        height		: 12,
        boxImage	: 'images/progressbar_box.png',
        barImage	: 'images/progressbar.png'
      }
    );

    this.matchColors = [
      "#00FE00", "#0BF800", "#15F300", "#20EE00",
      "#2BE900", "#35E300", "#40DE00", "#4AD900", 
      "#55D400", "#60CF00", "#6AC900", "#75C400",
      "#80BF00", "#8ABA00", "#95B400", "#9FAF00",
      "#AAAA00",
      "#AFA700", "#B5A500", "#BAA200", "#BFA000",
      "#C59D00", "#CA9A00", "#CF9800", "#D59500",
      "#DA9200", "#DF9000", "#E48D00", "#EA8B00", 
      "#EF8800", "#F48500", "#FA8300", "#FF8000"
    ];
    this.allMatchingIndexes = [ 0, 4, 8, 12, 16, 20, 24, 28, 32];
    this.fineTuneIndexChanges = [ -2, +2, -1, +1];
    this.secondFineTuneMatch = false;
    this.lowestIndex = 33;
    this.highestIndex = -1;
        
		slider.onchange = function() {
			Colblindor.Anomaloscope.Methods.sliderChange();
		};
    
    Event.observe( $('ok_button'), 'click', this.colorsMatched.bindAsEventListener(this));
    Event.observe( $('nok_button'), 'click', this.colorsNotMatched.bindAsEventListener(this));
    // Event.observe( $('save_button'), 'click', this.saveInfo.bindAsEventListener(this));
        
    this.matchValues = new Array();
    this.nomatchValues = new Array();
    this.setupNextMatch();
  },
    
  setupNextMatch: function()
  {
    if (this.allMatchingIndexes.length > 0) {
      if (this.allMatchingIndexes.length < 9) this.progressBar.setPercentage('+8');
      
      index = Colblindor.Anomaloscope.Methods.rand(this.allMatchingIndexes.length - 1);
      this.matchIndex = this.allMatchingIndexes[index];
      this.allMatchingIndexes.splice(index, 1);
      redGreenColor = this.matchColors[this.matchIndex];
      $('redGreenBox').style.backgroundColor = redGreenColor;
      Colblindor.Anomaloscope.Methods.sliderChange();
      return true;
    }
    
    //fine tuning
    do {
      if (this.fineTuneIndexChanges.length <= 0) return false;
      this.progressBar.setPercentage('+8');
      fineTuneChange = this.fineTuneIndexChanges.shift();
      if (fineTuneChange < 0) {
        this.matchIndex = this.lowestIndex + fineTuneChange;
      } else {
        this.matchIndex = this.highestIndex + fineTuneChange;
      }
    } while ((this.matchIndex < 0) || (this.matchIndex > 32));
    redGreenColor = this.matchColors[this.matchIndex];
    $('redGreenBox').style.backgroundColor = redGreenColor;
    return true;
  },
      
  paintDiagram: function()
  {
    // paint diagram
    sortedMatches = this.matchValues.sort(Colblindor.Anomaloscope.Methods.sortIndex);
    diagramXY = new Array();
    for (i = 0; i < sortedMatches.length; i++) {
      rg_val = sortedMatches[i][0]; 
      y_val = parseInt(sortedMatches[i][2].substring(0,2), 16) - 100;
      diagramXY.push([20 + Math.round(rg_val * 320 / 32), 150 - Math.round(y_val * 140 / 155)]);
    }
    this.jg.setStroke(2);
    if (diagramXY.length == 1) {
      this.jg.drawEllipse(diagramXY[0][0], diagramXY[0][1], 2, 2);
    } else {
      for (j = 0; j < diagramXY.length-1; j++) {
        this.jg.drawLine(diagramXY[j][0], diagramXY[j][1], diagramXY[j+1][0], diagramXY[j+1][1]);
      }
    }
    this.jg.paint();
    
    this.progressBar.setPercentage('99');
    // show test results
    $('result_text').innerHTML =
        "Thank you for taking the test. &mdash; The matching line starts growing from the center to the left and right. The longer the matching line, the stronger your color blindness is.";
    Effect.Fade('rgb_anomaloscope');
    Effect.Appear('anomaloscope_result', {queue: 'end'});
    
    noMatchingDone = true;
    for (k = 0; k < this.matchValues.length; k++) {
      if (this.matchValues[k][2] != "636300") noMatchingDone = false;
    }
    
    if (((this.lowestIndex <= 16) && (this.highestIndex >= 16)) && !noMatchingDone) {
    //  Effect.Appear('tag_email', {queue: 'end'});
      this.saveValues();
    }
	},

  colorsMatched: function(e)
  {
    this.matchValues.push(new Array(this.matchIndex, redGreenColor.substring(1), yellowColor.substring(1)));
    if (this.matchIndex < this.lowestIndex) this.lowestIndex = this.matchIndex;
    if (this.matchIndex > this.highestIndex) this.highestIndex = this.matchIndex;
    if (!this.setupNextMatch()) this.paintDiagram();
  },
  
  colorsNotMatched: function(e)
  {
    this.nomatchValues.push(new Array(this.matchIndex, redGreenColor.substring(1), yellowColor.substring(1)));
    if (!this.setupNextMatch()) this.paintDiagram();
  },
  
  saveValues: function()
  {
     var url = 'http://www.color-blindness.com/anomaloscope/php/anomaloscope_saveValues.php';
     var pars = 'type=' + this.type + '&';
     pars += 'low=' + this.lowestIndex + '&';
     pars += 'high=' + this.highestIndex + '&';
     for (var i = 0; i < this.matchValues.length; i++) {
      pars += 'rg'+i+'='+this.matchValues[i][1]+'&';
      pars += 'y'+i+'='+this.matchValues[i][2]+'&';      
     }
     var myAjax = new Ajax.Request(url,
     	{	method: 'get',
     		parameters: pars,
     		onSuccess: function(transport) {
     			testId = transport.responseText;
     		}
     	});    
  },
  
  saveInfo: function(e) {
    Effect.Fade('tag_email', {queue: 'end'});
    Effect.Appear('thank_you', {queue: 'end'});
    
    var url = 'http://www.color-blindness.com/anomaloscope/php/anomaloscope_saveInfo.php';
    var pars = 'testid='+testId+"&";
    pars += 'email='+escape($('email').value);
     var myAjax = new Ajax.Request(url,
     	{	method: 'get', parameters: pars });
  }
};

Colblindor.Anomaloscope.Methods = {
	sliderChange: function() {
			sliderValue = Colblindor.Anomaloscope.Methods.hex(slider.getValue());
      yellowColor = "#" + sliderValue + sliderValue + "00";
			$('yellowBox').style.backgroundColor = yellowColor;	
	},
	
  rand: function(max)
  {
    rand = Math.random();
    rand *= max;
    return Math.ceil(rand);
  },

  hex: function(dec)
  {
    var HexChars="0123456789ABCDEF";
    return HexChars.charAt((dec>>4)&0xf)+HexChars.charAt(dec&0xf);
  },
  
  sortIndex: function(matchA, matchB)
  {
    return matchA[0] - matchB[0];
  }
  
};