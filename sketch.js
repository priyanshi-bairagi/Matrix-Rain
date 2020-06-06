/*author: priyanshi-bairagi
  date: 05-06-2020
  
    Matrix Rain using p5js		 */
    
var symbolSize=25;
var streams = [];

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    background(0);
    var x = 0;
    var y = 0;
    for (var i =0; i <= width / symbolSize; i++){
        var stream = new Stream();
        stream.generateSymbols(x, random(-1000,0));
        streams.push(stream);
        x += symbolSize;                                            //every new stream will start from x+symbolsize, every stream is symbolsize wide
    }
    textSize(symbolSize);                                           //p5 function

}

function draw() {
    background(0,150);                                             // transparency to create blurry look
    streams.forEach(function(stream){
    stream.render();
    });
}


class Symbols {
    constructor(x,y,speed,first){
        this.x=x;
        this.y=y;
        this.value=0;
        this.speed=speed;
        this.first=first;
        this.switchInterval = round(random(2,20));
    }
    setToRandomSymbol(){                                        // to make symbol switch at random time instead of default 60 framecount per second 
        if(frameCount % this.switchInterval == 0)    
        {
            this.value = String.fromCharCode(0x30A0 + round(random(0,96)));
        }
    }
    render(){
        fill(0,255,70);
        text(this.value,this.x,this.y);
        this.rain();
        this.setToRandomSymbol();
    }

    rain(){
        this.y = (this.y>=height) ? 0 : this.y += this.speed ;
    }

}
                        
class Stream {                                                  // to create a stream of symbols(vertical trail of symbols)
    constructor(){
        this.symbols  = [];
        this.totalSymbols = round(random(5,30));
        this.speed = random(5,25);
    }

    generateSymbols(x,y){
        //this.x=x; this.y=y;
        var first = round(random(0,4)) == 1;
        for(var i =0; i <= this.totalSymbols; i++){
            var symbol = new Symbols(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;                                  // to avoid symbol overlapping and stack them in a line one above the other
            first = false;
        }
    }
    render(){
        this.symbols.forEach (function(symbol ) {
            if(symbol.first){
                fill(236,132,245);                          //add shine effect by using different color for first symbol of random streams
            }
            else{
                fill(149, 14, 160);
            }
            text(symbol.value,symbol.x,symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();  
        }
        )
    }
}