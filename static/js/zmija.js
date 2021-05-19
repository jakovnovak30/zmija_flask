var listax = [];
var listay = [];
var x1 = 270;
var y1 = 270;
var x1_change = 0;
var y1_change = 0;
var foodx = Math.round((Math.random()*52) + 1)*10;
var foody = Math.round((Math.random()*52) + 1)*10;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startGame(){
    document.getElementById("demo").innerHTML = "Ovo je zmija.";
    displej.start();
    listax = [];
    listay = [];
    x1 = 270;
    y1 = 270;
    x1_change = 0;
    y1_change = 0;
    new component(10, 10, "red", x1, y1);
    Loop();
}

var displej = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 540;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
		div = document.getElementById("igra");
        div.appendChild(this.canvas);
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    ispis : function(str){
      this.context.font = "30px Arial";
      this.context.fillText(str, 10, 50);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = displej.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

async function Loop(){
  var duljina = 1;

  addEventListener("keydown", function (event){
    switch(event.key) {
      case "ArrowDown":
        x1_change = 0;
        y1_change = 10;
        break;
      case "ArrowUp":
        x1_change = 0;
        y1_change = -10;
        break;
      case "ArrowLeft":
        x1_change = -10;
        y1_change = 0;
        break;
      case "ArrowRight":
        x1_change = 10;
        y1_change = 0;
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  });


  var krepase = false;

  while(!krepase){
    displej.clear();

    new component(10, 10, "blue", foodx, foody);

    x1 = x1 + x1_change;
    y1 = y1 + y1_change;

    if(listax.length > duljina){
      listax.shift();
      listay.shift();
    }

    listax.push(x1);
    listay.push(y1);

    if(x1 == foodx && y1 == foody){
      var ispis = "Vas skor je: " + String(duljina);
      document.getElementById("demo").innerHTML = ispis;
      duljina++;
      foodx = Math.round((Math.random()*52) + 1)*10;
      foody = Math.round((Math.random()*52) + 1)*10;
    }

    var i;
    for(i=0;i<duljina;i++){
        new component(10, 10, "red", listax[i], listay[i]);
    }

    if(duljina > 1){
      for(i=0;i<duljina-1;i++){
        if(x1 == listax[i] && y1 == listay[i]){
          krepase = true;
        }
      }
    }

    if(y1 < 5){
      y1 = 540;
    }
    else if(y1 > 535){
      y1 = 0;
    }

    if(x1 < 5){
      x1 = 540;
    }
    else if(x1 > 535){
      x1 = 0;
    }

    await sleep(60);
  }
  displej.clear();
  displej.ispis("Gejm over!");
  var gumb1 = '<button onclick="startGame()"> Restart </button>';
  var gumb2 = '<form action="/rezultati" method="POST"> <input type = "submit">';
  gumb2 += '<input type="hidden" name="reza" id="reza" value="' + String(duljina) + '"></form>';
  document.getElementById("demo").innerHTML = gumb1 + gumb2;
}
