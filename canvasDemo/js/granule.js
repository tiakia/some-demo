let image = new Image();
let imgPath = './../images/avatar.jpg';

let canvas = document.getElementById('particle'),
    originImg = document.getElementById('originImg');

let ctx = canvas.getContext('2d');

let dots = [], imgW, imgH;

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

        for(let x = 0; x < imageData.width; x+=6){
            for(let y = 0; y < imageData.height; y+=6){
                // 获取 rgba 的值
                let i = y * imageData.width * 4 + x * 4;
                // 排除图片中透明部分
                if(imageData.data[i+3] > 128){
                    dots.push({
                        x: x,
                        y: y,
                        r: 3,
                        c: `rgba(${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]},${imageData.data[i+3]/255})`,
                        speed: 10,
                        initX: 0,
                        initY: 0
                    });
                }
            }
        }
    }
    window.requestAnimationFrame(draw);
}

function draw(){

    ctx.clearRect(0, 0, imgW, imgH);
    ctx.save();
    let flag1 = true, flag2 = true;
    dots.map(val => {
        ctx.fillStyle = val.c;
        if(val.initX < val.x){
            val.initX += val.speed;
        }else{
            val.initX = val.x;
            flag1 = false;
        }

        if(val.initY < val.y){
            val.initY += val.speed;
        }else{
            val.initY = val.y;
            flag2 = false;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(val.initX, val.initY, val.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.restore();

    });
    window.requestAnimationFrame(draw);
    if(!flag1 && !flag2){
        return;
    }

}

init();
