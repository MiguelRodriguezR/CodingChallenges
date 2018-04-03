var world;
var cont = 0;
var Food = (function () {
    function Food(x, y, ctx, world) {
        this.posX = x;
        this.posY = y;
        this.ctx = ctx;
        this.tam = 3;
        this.world = world;
    }
    Food.prototype.draw = function () {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.arc(this.posX, this.posY, this.tam, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.restore();
    };
    Food.prototype.check = function () {
    };
    return Food;
}());
var Boost = (function () {
    function Boost(x, y, ctx, world) {
        this.posX = x;
        this.posY = y;
        this.ctx = ctx;
        this.tam = 6;
        this.world = world;
    }
    Boost.prototype.draw = function () {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.arc(this.posX, this.posY, this.tam, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.restore();
    };
    Boost.prototype.check = function () {
    };
    return Boost;
}());
var Pacman = (function () {
    function Pacman(x, y, ctx, world) {
        this.posX = x;
        this.posY = y;
        this.ctx = ctx;
        this.world = world;
    }
    Pacman.prototype.draw = function () {
        this.ctx.save();
        this.ctx.fillStyle = "#FFFF00";
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, 12, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.moveTo(this.posX, this.posY);
        this.ctx.arc(this.posX, this.posY, 13, Math.PI - (30 * Math.PI / 180), Math.PI + (30 * Math.PI / 180), false);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.fill();
        this.ctx.restore();
    };
    Pacman.prototype.check = function () {
    };
    return Pacman;
}());
var Ghost = (function () {
    function Ghost(x, y, ctx, world) {
        this.posX = x;
        this.posY = y;
        this.ctx = ctx;
        this.world = world;
    }
    Ghost.prototype.draw = function () {
        this.ctx.save();
        this.ctx.fillStyle = "#00FFFF";
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, 12, Math.PI, 0, false);
        this.ctx.lineTo(this.posX + 12, this.posY + 12);
        this.ctx.lineTo(this.posX + 6, this.posY + 6);
        this.ctx.lineTo(this.posX, this.posY + 12);
        this.ctx.lineTo(this.posX - 6, this.posY + 6);
        this.ctx.lineTo(this.posX - 12, this.posY + 12);
        this.ctx.fill();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.beginPath();
        this.ctx.arc(this.posX - 4, this.posY - 2, 3, 2 * Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.posX + 4, this.posY - 2, 3, 2 * Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(this.posX - 5, this.posY - 2, 1, 2 * Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.posX + 3, this.posY - 2, 1, 2 * Math.PI, 0, false);
        this.ctx.fill();
        this.ctx.restore();
    };
    Ghost.prototype.check = function () {
    };
    return Ghost;
}());
var World = (function () {
    function World(canvas, ctx) {
        this.map = [
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
        ];
        this.wallT = 30;
        this.canvas = canvas;
        this.ctx = ctx;
        this.entities = [];
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (this.map[y].charAt(x) == ".") {
                    this.entities.push(new Food(this.wallT * x + (this.wallT / 2), this.wallT * y + (this.wallT / 2), this.ctx, this));
                }
                if (this.map[y].charAt(x) == "*") {
                    this.entities.push(new Boost(this.wallT * x + (this.wallT / 2), this.wallT * y + (this.wallT / 2), this.ctx, this));
                }
                if (this.map[y].charAt(x) == "G") {
                    this.entities.push(new Ghost(this.wallT * x + (this.wallT / 2), this.wallT * y + (this.wallT / 2), this.ctx, this));
                }
                if (this.map[y].charAt(x) == "P") {
                    this.entities.push(new Pacman(this.wallT * x + (this.wallT / 2), this.wallT * y + (this.wallT / 2), this.ctx, this));
                }
            }
        }
    }
    World.prototype.draw = function () {
        this.ctx.save();
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.stroke();
        this.ctx.restore();
        this.entities.forEach(function (e) { return e.draw(); });
        this.ctx.save();
        this.ctx.fillStyle = "#0000ff";
        this.ctx.strokeStyle = "#0000ff";
        for (var x = 0; x < this.map.length; x++) {
            for (var y = 0; y < this.map[x].length; y++) {
                if (this.map[x].charAt(y) == "=") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, this.wallT, 2);
                    this.ctx.fillRect(this.wallT * y, (this.wallT * x) + this.wallT, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "|") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, 2, this.wallT);
                    this.ctx.fillRect((this.wallT * y) + this.wallT, this.wallT * x, 2, this.wallT);
                }
                else if (this.map[x].charAt(y) == "p") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, 2, this.wallT);
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "q") {
                    this.ctx.fillRect((this.wallT * y) + this.wallT, this.wallT * x, 2, this.wallT);
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "d") {
                    this.ctx.fillRect((this.wallT * y) + this.wallT, this.wallT * x, 2, this.wallT);
                    this.ctx.fillRect(this.wallT * y, (this.wallT * x) + this.wallT, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "b") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, 2, this.wallT);
                    this.ctx.fillRect(this.wallT * y, (this.wallT * x) + this.wallT, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "b") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, 2, this.wallT);
                    this.ctx.fillRect(this.wallT * y, (this.wallT * x) + this.wallT, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "v") {
                    this.ctx.fillRect(this.wallT * y, (this.wallT * x) + this.wallT, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "A") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, this.wallT, 2);
                }
                else if (this.map[x].charAt(y) == "7") {
                    this.ctx.fillRect((this.wallT * y) + this.wallT, this.wallT * x, 2, this.wallT);
                }
                else if (this.map[x].charAt(y) == "k") {
                    this.ctx.fillRect(this.wallT * y, this.wallT * x, 2, this.wallT);
                }
                else if (this.map[x].charAt(y) == "n") {
                    this.ctx.beginPath();
                    this.ctx.moveTo((this.wallT * y) + 1, (this.wallT * x) + this.wallT);
                    this.ctx.bezierCurveTo(this.wallT * y, this.wallT * x, (this.wallT * y) + this.wallT, this.wallT * x, (this.wallT * y) + this.wallT + 1, (this.wallT * x) + this.wallT);
                    this.ctx.stroke();
                }
                else if (this.map[x].charAt(y) == "u") {
                    this.ctx.beginPath();
                    this.ctx.moveTo((this.wallT * y) + 1, this.wallT * x);
                    this.ctx.bezierCurveTo(this.wallT * y, (this.wallT * x) + this.wallT, (this.wallT * y) + this.wallT, (this.wallT * x) + this.wallT, (this.wallT * y) + this.wallT + 1, this.wallT * x);
                    this.ctx.stroke();
                }
                else if (this.map[x].charAt(y) == "D") {
                    this.ctx.beginPath();
                    this.ctx.moveTo((this.wallT * y), this.wallT * x + 1);
                    this.ctx.bezierCurveTo((this.wallT * y) + this.wallT, this.wallT * x, (this.wallT * y) + this.wallT, (this.wallT * x) + this.wallT, this.wallT * y, (this.wallT * x) + this.wallT + 1);
                    this.ctx.stroke();
                }
                else if (this.map[x].charAt(y) == "E") {
                    this.ctx.beginPath();
                    this.ctx.moveTo((this.wallT * y) + this.wallT, this.wallT * x + 1);
                    this.ctx.bezierCurveTo(this.wallT * y, this.wallT * x, this.wallT * y, (this.wallT * x) + this.wallT, (this.wallT * y) + this.wallT, (this.wallT * x) + this.wallT + 1);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.stroke();
        this.ctx.restore();
    };
    World.prototype.check = function () {
        this.entities.forEach(function (e) { return e.check(); });
    };
    return World;
}());
window.onload = function () {
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext("2d");
    world = new World(canvas, ctx);
    requestAnimationFrame(frame);
};
function frame(timestamp) {
    if (timestamp - cont > 1000) {
        world.check();
        world.draw();
        cont = timestamp;
    }
    requestAnimationFrame(frame);
}
