var levels = [];
var map = {};

function Level(col, row, mines) {
  this.col = col;
  this.row = row;
  this.mines = mines;
}

function Field(x, y) {
  this.x = x;
  this.y = y;
  this.neighbors = 0;
  this.isOpen = false;
  this.isMine = false;
  this.isPointed = false;
  
  this.getHTMLElement = function(w, h, margin) {
    var el = document.createElement("div");
    el.classList.add("field");
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.margin = margin + 'px';
    
    return el;
  }
}

function Map(level) {
  var container = document.getElementById("container");
  this.w = 700;
  this.level = level;
  this.fields = [];
  this.htmlEl = null;
  
  this.createHTMLElement = function() {
    var htmlMap = document.createElement("div");
    htmlMap.classList.add("map");
    
    var margin = this.level.col < 32 ? 2 : 1;
    var fieldW = (this.w/this.level.col) - (margin*2);
    var fieldH = (this.w/this.level.row) - (margin*2);
    
    for(var yy=0; yy<this.level.col; yy++) {
      for(var xx=0; xx<this.level.row; xx++) {
        var f = new Field(xx, yy, fieldW);    
        htmlMap.appendChild(f.getHTMLElement(fieldW, fieldH, margin));
      }
    }
    
    document.getElementById("container").appendChild(htmlMap);
    this.htmlEl = htmlMap;
  }
  
  this.createHTMLElement();
}

var createGame = function(level) {
  var container = document.getElementById("container");
  
  // Clearing screen
  document.querySelector("main").classList.add("in-game");
  window.setTimeout(function() {
    container.innerHTML = "";
    map = new Map(level);
    window.setTimeout(function() {
      map.htmlEl.classList.add("redy");
    }, 10);
  }, 700);
}