const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const PHI = 1.61803398875;
const PI = Math.PI;

let pink = [255, 166, 158];
let cream = [250, 243, 221];
let mint = [184, 242, 230];
let blue = [174, 217, 224];
let slate = [94, 100, 114];

let animationIncRate = 0.00005

class Flower {
    constructor( rotationFactor = PHI - 1, nOfSeeds = 400, baseRadius = 20, radialGrowthFactor = 1, startColor = pink, endColor = blue){
        this.nOfSeeds = nOfSeeds;
        this.baseRadius = baseRadius;
        this.rotationFactor = rotationFactor;
        this.radialGrowthFactor = radialGrowthFactor;
        this.seeds=[];
        this.startColor = startColor;
        this.endColor = endColor;
        this.center = {
            x: centerX,
            y: centerY
        }
        this.generateSeeds();
    };
    drawCenter() {
        this.drawSeed(centerX, centerY)
    }
    drawSeed(seed) {
        ctx.strokeStyle = arr2RGB(seed.color);
        ctx.fillStyle = arr2RGB(slate);
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(seed.x, seed.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    drawAllSeeds() {
        this.seeds.forEach((seed) => {
            this.drawSeed(seed);
        })

    }
    drawBackgroundCircle() {
        ctx.save();
        ctx.strokeStyle = arr2RGB(mint);
        ctx.fillStyle = arr2RGB(cream);
        ctx.lineWidth = 30;
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, 450, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
    generateSeeds() {

        this.seeds = [];
        let radius = this.baseRadius;
        let radialGrowthFactor = this.radialGrowthFactor;
        let revolutionCount = 0;

        let newColor = [...this.startColor];

        for (let i = 0; i < this.nOfSeeds; i++) {

            let x, y;

 
            if (i === 0) {
                x = this.center.x + radius;
                y = this.center.y;
            } else {
                //Point
                x = this.center.x + radius * Math.cos(i * 2 * PI * this.rotationFactor);
                y = this.center.x + radius * Math.sin(i * 2 * PI * this.rotationFactor);
                //Color
                for (let j = 0; j < 3; j++) {
                    newColor[j] = newColor[j] + (1 / (this.nOfSeeds))*(this.endColor[j]-this.startColor[j]);
                }
            }

            this.seeds.push({x: x, y: y, color: [...newColor]});

            if (i * this.rotationFactor >= revolutionCount) {revolutionCount = Math.floor(this.rotationFactor * i);
            radius = this.baseRadius + radialGrowthFactor * revolutionCount;}
        }
    }

    incrementRotationFactor(n) {
        this.rotationFactor += n;
    }

    render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawBackgroundCircle();
        this.drawAllSeeds();
    }
}

function arr2RGB(colorArr, a = 1) {
    return `rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]}, ${a} )`
}

function renderNextFrame(flower) {
    flower.incrementRotationFactor(animationIncRate);
    flower.generateSeeds();
    flower.render();
}

function loop() {
    renderNextFrame(flower1);
    requestAnimationFrame(loop);
}

let flower1 = new Flower(0.75);

flower1.render(); 
loop();



document.addEventListener("keydown", function(e) {
    if (e.keyCode === 32) {
        flower1.incrementRotationFactor(animationIncRate);
        flower1.generateSeeds();
        flower1.render();
    }
}); 
