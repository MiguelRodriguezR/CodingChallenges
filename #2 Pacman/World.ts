var world;
var cont=0;
import Entity = pacman.Entity;

class Food implements Entity{

    posX:number;
    posY:number;
    ctx:CanvasRenderingContext2D;
    tam:number;
    world:World;

    constructor(x,y,ctx,world){
      this.posX=x;
      this.posY=y;
      this.ctx = ctx;
      this.tam = 3;
      this.world = world;
    }

    draw(){
      this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";

        this.ctx.arc(this.posX,this.posY, this.tam, 0, 2 * Math.PI, false);
        this.ctx.fill();
      this.ctx.restore();

    }

    check(){

    }

  }

  class Boost implements Entity{

      posX:number;
      posY:number;
      ctx:CanvasRenderingContext2D;
      tam:number;
      world:World;

      constructor(x,y,ctx,world){
        this.posX=x;
        this.posY=y;
        this.ctx = ctx;
        this.tam = 6;
        this.world = world;
      }

      draw(){
        this.ctx.save();
          this.ctx.beginPath();
          this.ctx.fillStyle = "#FFFFFF";

          this.ctx.arc(this.posX,this.posY, this.tam, 0, 2 * Math.PI, false);
          this.ctx.fill();
        this.ctx.restore();

      }

      check(){

      }

    }


class Pacman implements Entity{

    posX:number;
    posY:number;
    direction:number;
    animation:number;
    ctx:CanvasRenderingContext2D;
    world:World;


    constructor(x,y,ctx,world){
      this.posX=x;
      this.posY=y;
      this.ctx = ctx;
      this.world = world;

    }
    draw(){
      this.ctx.save();
        this.ctx.fillStyle = "#FFFF00";
        this.ctx.beginPath();
          this.ctx.arc(this.posX,this.posY, 12, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
          this.ctx.moveTo(this.posX,this.posY);
          this.ctx.arc(this.posX,this.posY, 13, Math.PI - (30*Math.PI / 180), Math.PI + (30*Math.PI / 180), false);
          this.ctx.lineTo(this.posX,this.posY);
        this.ctx.fill();
      this.ctx.restore();
    }

    check(){

    }

  }



class Ghost implements Entity{

    posX:number;
    posY:number;
    direction:number;
    animation:number;
    ctx:CanvasRenderingContext2D;
    world:World;

    constructor(x,y,ctx,world){
      this.posX=x;
      this.posY=y;
      this.ctx = ctx;
      this.world = world;

    }

    draw(){

      this.ctx.save();
        this.ctx.fillStyle = "#00FFFF";
        this.ctx.beginPath();
          this.ctx.arc(this.posX,this.posY, 12, Math.PI, 0, false);
          this.ctx.lineTo(this.posX+12,this.posY+12);
          this.ctx.lineTo(this.posX+6,this.posY+6);
          this.ctx.lineTo(this.posX,this.posY+12);
          this.ctx.lineTo(this.posX-6,this.posY+6);
          this.ctx.lineTo(this.posX-12,this.posY+12);
        this.ctx.fill();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
          this.ctx.arc(this.posX-4,this.posY-2, 3, 2*Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.beginPath();
          this.ctx.arc(this.posX+4,this.posY-2, 3, 2*Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
          this.ctx.arc(this.posX-5,this.posY-2, 1, 2*Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.beginPath();
          this.ctx.arc(this.posX+3,this.posY-2, 1, 2*Math.PI, 0, false);
        this.ctx.fill();
      this.ctx.restore();

    }
    check(){

    }

  }



class World{

  map:Array<string>;
  score:number;
  entities:Array<Entity>;
  canvas:HTMLCanvasElement;
  ctx:CanvasRenderingContext2D;
  wallT:number;

  constructor(canvas,ctx){
    this.map=[
    "p=====A======A=====A=====q\n",
    "|P....|.....*|*....|....*|\n",
    "|.E===v===D..|.E===v===D.|\n",
    "|*..........*|*.........*|\n",
    "b===q.n.p==q.|.p==q.n.p==d\n",
    "    |.|.b==d.u.b==d.|.|   \n",
    "    |.|......*......|.|   \n",
    "====d.u.n.p=D E=q.n.u.b===\n",
    ".....*..|.|  G  |.|..*....\n",
    "====q.n.b=v=====v=d.n.p===\n",
    "    |.|.............|.|   \n",
    "    |.b=====D*E=====d.|   \n",
    "p===d*...............*b==q\n",
    "|......n.p======q.n.n....|\n",
    "|.E==D.|.b======d.|.b==D.|\n",
    "|*....*|..........|*....*|\n",
    "b======v==========v======d\n"

  ]

    this.wallT = 30;
    this.canvas = canvas;
    this.ctx = ctx;

    this.entities = [];

    for (let y=0;y<this.map.length;y++){
      for(let x=0;x<this.map[y].length;x++){
          if(this.map[y].charAt(x)=="."){
            this.entities.push(
              new Food(
                this.wallT*x+(this.wallT/2),
                this.wallT*y+(this.wallT/2),
                this.ctx,this)
              );
          }
          if(this.map[y].charAt(x)=="*"){
            this.entities.push(
              new Boost(
                this.wallT*x+(this.wallT/2),
                this.wallT*y+(this.wallT/2),
                this.ctx,this)
              );
          }
          if(this.map[y].charAt(x)=="G"){
            this.entities.push(
              new Ghost(
                this.wallT*x+(this.wallT/2),
                this.wallT*y+(this.wallT/2),
                this.ctx,this)
              );
          }
          if(this.map[y].charAt(x)=="P"){
            this.entities.push(
              new Pacman(
                this.wallT*x+(this.wallT/2),
                this.wallT*y+(this.wallT/2),
                this.ctx,this)
              );
          }
      }
    }

  }

  draw(){

    this.ctx.save();
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
      this.ctx.stroke();
    this.ctx.restore();

    this.entities.forEach(e=>e.draw());
    this.ctx.save();
    this.ctx.fillStyle = "#0000ff";
    this.ctx.strokeStyle = "#0000ff";

    for (let x=0;x<this.map.length;x++){
      for(let y=0;y<this.map[x].length;y++){


        if(this.map[x].charAt(y)=="="){
          this.ctx.fillRect(this.wallT*y,this.wallT*x,this.wallT,2);
          this.ctx.fillRect(this.wallT*y,(this.wallT*x)+this.wallT,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="|"){
          this.ctx.fillRect(this.wallT*y,this.wallT*x,2,this.wallT);
          this.ctx.fillRect((this.wallT*y)+this.wallT,this.wallT*x,2,this.wallT);
        }

        else if(this.map[x].charAt(y)=="p"){
          this.ctx.fillRect(this.wallT*y,this.wallT*x,2,this.wallT);
          this.ctx.fillRect(this.wallT*y,this.wallT*x,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="q"){
          this.ctx.fillRect((this.wallT*y)+this.wallT,this.wallT*x,2,this.wallT);
          this.ctx.fillRect(this.wallT*y,this.wallT*x,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="d"){
          this.ctx.fillRect((this.wallT*y)+this.wallT,this.wallT*x,2,this.wallT);
          this.ctx.fillRect(this.wallT*y,(this.wallT*x)+this.wallT,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="b"){
          this.ctx.fillRect(this.wallT*y,this.wallT*x,2,this.wallT);
          this.ctx.fillRect(this.wallT*y,(this.wallT*x)+this.wallT,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="b"){
          this.ctx.fillRect(this.wallT*y,this.wallT*x,2,this.wallT);
          this.ctx.fillRect(this.wallT*y,(this.wallT*x)+this.wallT,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="v"){
            this.ctx.fillRect(this.wallT*y,(this.wallT*x)+this.wallT,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="A"){
            this.ctx.fillRect(this.wallT*y,this.wallT*x,this.wallT,2);
        }

        else if(this.map[x].charAt(y)=="7"){
            this.ctx.fillRect((this.wallT*y)+this.wallT,this.wallT*x,2,this.wallT);
        }

        else if(this.map[x].charAt(y)=="k"){
            this.ctx.fillRect(this.wallT*y,this.wallT*x,2,this.wallT);
        }

        else if(this.map[x].charAt(y)=="n"){
            this.ctx.beginPath();
            this.ctx.moveTo((this.wallT*y)+1,(this.wallT*x)+this.wallT)
            this.ctx.bezierCurveTo(
                this.wallT*y,
                this.wallT*x,
                (this.wallT*y)+this.wallT,
                this.wallT*x,
                (this.wallT*y)+this.wallT+1,
                (this.wallT*x)+this.wallT
            );
            this.ctx.stroke();
        }

        else if(this.map[x].charAt(y)=="u"){
            this.ctx.beginPath();
            this.ctx.moveTo((this.wallT*y)+1,this.wallT*x)
            this.ctx.bezierCurveTo(
                this.wallT*y,
                (this.wallT*x)+this.wallT,
                (this.wallT*y)+this.wallT,
                (this.wallT*x)+this.wallT,
                (this.wallT*y)+this.wallT+1,
                this.wallT*x
            );
            this.ctx.stroke();
        }

        else if(this.map[x].charAt(y)=="D"){
            this.ctx.beginPath();
            this.ctx.moveTo((this.wallT*y),this.wallT*x+1)
            this.ctx.bezierCurveTo(
                (this.wallT*y)+this.wallT,
                this.wallT*x,
                (this.wallT*y)+this.wallT,
                (this.wallT*x)+this.wallT,
                this.wallT*y,
                (this.wallT*x)+this.wallT+1
            );
            this.ctx.stroke();
        }

        else if(this.map[x].charAt(y)=="E"){
            this.ctx.beginPath();
            this.ctx.moveTo((this.wallT*y)+this.wallT,this.wallT*x+1)
            this.ctx.bezierCurveTo(
                this.wallT*y,
                this.wallT*x,
                this.wallT*y,
                (this.wallT*x)+this.wallT,
                (this.wallT*y)+this.wallT,
                (this.wallT*x)+this.wallT+1
            );
            this.ctx.stroke();
        }



      }
    }
      this.ctx.stroke();
    this.ctx.restore();


  }

  check(){
    this.entities.forEach(e=>e.check());




  }

}

window.onload = function() {
  let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#canvas');
  let ctx:CanvasRenderingContext2D = canvas.getContext("2d");
  world = new World(canvas,ctx);
  requestAnimationFrame(frame);

}

function frame(timestamp){
  if(timestamp-cont>1000){
    world.check();
    world.draw();
    cont = timestamp;
  }
  requestAnimationFrame(frame);
}
