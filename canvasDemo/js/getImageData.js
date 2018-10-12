/*
 *  功能：canvas 获取 rgba 的值
 *  create by tiankai on 2018-09-20 09:41
 */

let canvas = document.getElementById('getImageData');
let ctx = canvas.getContext('2d');

let originImg = document.getElementById('rgbaValue');

let rgbaText = document.getElementById('rgbaText');

let image = new Image();

image.src = './images/avatar.jpg';

image.onload = function(){
    let imgW = this.width,
        imgH = this.height;

    canvas.width = imgW;
    canvas.height = imgH;

    ctx.drawImage(image,0,0);

    let result = ctx.getImageData(0, 0, imgW, imgH);
    //console.log(result);

    let imageData = handleImageData(result.data);
    //console.log(imageData);

    canvas.addEventListener('mousemove', function(e){
        // canvas 的像素坐标X Y
        let offsetX = e.offsetX,
            offsetY = e.offsetY;
        /* console.log(imageData[offsetY*imgW + offsetX]);
         * console.log(ctx.getImageData(offsetX, offsetY, 1, 1).data); */
        //关键一步获取 rgba的值
        let rgba = imageData[offsetY*imgW + offsetX];
        //设置到DOM元素
        originImg.style.background = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]/255})`;
        rgbaText.textContent = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]/255})`;;
    });
}

function handleImageData(imgData){
    let dots = [];
    for(let i = 0, len = imgData.length; i < len; i+=4){
        dots.push([
            imgData[i],
            imgData[i+1],
            imgData[i+2],
            imgData[i+3]
        ]);
    }
    return dots;
}
