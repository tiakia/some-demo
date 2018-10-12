let image = new Image();
let imgPath = './../images/avatar.jpg';

let canvas = document.getElementById('particle'),
    originImg = document.getElementById('originImg');

let ctx = canvas.getContext('2d');

let dots = [], imgW, imgH, count = 1;

let timer = null;

async function init(){
    image.src = imgPath;
    originImg.src = imgPath;

    image.onload = await function(){

        imgW = this.width,
        imgH = this.height;

        canvas.width = imgW;
        canvas.height = imgH;
        ctx.drawImage(image, 0, 0);

        let imageData = ctx.getImageData(0, 0, imgW, imgH);
        // 每隔 6px 操作一个 像素点
        for(let x = 0; x < imageData.width; x+=6){
            for(let y = 0; y < imageData.height; y+=6){

                let i = y * imageData.width * 4 + x * 4;
                // 排除图片中透明部分
                if(imageData.data[i+3] > 128){
                    dots.push({
                        x: x,
                        y: y,
                        r: 3,
                        c: `rgba(${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]},${imageData.data[i+3]/255})`,
                        frameCount: Math.ceil(1000 / 16.66),
                        frameNum: 0,
                        sx: imgW/2,
                        sy: imgH/2
                    });
                }
            }
        }
    }
    //timer = setInterval(draw, 200);
    timer = requestAnimationFrame(draw);
}

// t 当前时间
// b 初始值
// c 总位移
// d 总时间
function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
}

function draw(){

    ctx.clearRect(0, 0, imgW, imgH);
    ctx.save();

    let len = dots.length,
        frameCount = 0,
        frameNum = 0,
        curX, curY;
    count = 0;
    dots.map((val, item) => {
        frameNum = val.frameNum;
        frameCount = val.frameCount;
        ctx.fillStyle = val.c;

        ctx.save();
        ctx.beginPath();

        if(frameNum < frameCount){
            curX = easeInOutCubic(frameNum, val.sx, val.x - val.sx, val.frameCount);
            curY = easeInOutCubic(frameNum, val.sy, val.y - val.sy, val.frameCount);

            ctx.arc(curX, curY, val.r, 0, 2*Math.PI);
            val.frameNum +=1;
        } else {
            ctx.arc(val.x, val.y, val.r, 0, 2*Math.PI);
            count+=1;
        }

        ctx.fill();
        ctx.restore();

        if(count >= len){
            cancelAnimationFrame(timer);
            return;
        }

    });

    timer = requestAnimationFrame(draw);

}

init();
