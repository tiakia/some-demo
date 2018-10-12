/*
 *  功能：canvas蒙版
 *  create by tiankai on 2018-09-20 09:41
 */

let originImg = document.getElementById('originImg'),
    canvas = document.getElementById('mask');

let ctx = canvas.getContext('2d');

let image = new Image();
let imgPath = './images/avatar.jpg';
image.src = imgPath;
originImg.src = imgPath;

image.onload = function(){
    let imgW = this.width,
        imgH = this.height;

    canvas.width = imgW;
    canvas.height = imgH;

    ctx.drawImage(image, 0, 0);

    let imageData = ctx.getImageData(0, 0, imgW, imgH);
    //每隔 3px 改变一个 rgba 点
    for(let x = 0; x < imageData.width; x+=3){
        for(let y = 0; y < imageData.height; y+=3){
            // 获取 rgba 的值
            let i = y * (imageData.width * 4) + x * 4;
            //排除了图片中透明的部分
            if(imageData.data[i+3] > 128){
                imageData.data[i] = 220;
                imageData.data[i+1] = 20;
                imageData.data[i+2] = 60;
                imageData.data[i+3] = 55;
            }
        }
    }

    ctx.clearRect(0, 0, imgW, imgH);
    ctx.putImageData(imageData, 0, 0);
}
