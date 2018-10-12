/*
 *  功能：算法排序
 *  create by tiankai on 2018-09-26 10:06
 */
let canvas = document.getElementById('canvas'),
    before = document.getElementById('before');
const waitSort = [59, 19, 45, 4, 26, 15, 10, 33, 2];
console.log('原始数组：');
console.log(waitSort);
console.log('排序后：');
/*
 *  功能：算法排序
 *  @ params {Element} canvas canvas元素
 *  @ params {Array} arr 待处理数组
 *  @ params {Number} rw 柱形宽、间隔
 *  @ params {Number} cw, ch canvas 宽高
 */

function render(canvas, arr, cw = 500, ch = 300, rw = 20){
    let ctx = canvas.getContext('2d');
    canvas.width = cw;
    canvas.height = ch;
    arr.map((val, item) => {
        ctx.beginPath()
        ctx.fillStyle = 'red';
        ctx.fillRect((2 * (item+1) - 1) * rw, ch - 20 - val * 5, rw, val * 5)
        ctx.fillStyle = '#000';
        ctx.fillText(val, (2 * (item+1) - 1) * rw + 5 , ch - 5);
    });
}

render(before, waitSort);

// 冒泡排序

function bubleSort(arr){
    let len = arr.length;
    for(let i = 0; i < len; i++){
        for(let j = 0; j < len - 1 - i; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}

// 选择排序法一

/* 把小的数放到前面，下次遍历的时候从排好的数开始
 * 每个数和它后面的每个数比较，把小的数放在前面
 * 下次循环从已经比较好的数开始进行
 */
function unKonwSort(arr){
    let len = arr.length;
    for(let i = 0; i < len; i++){
        for(let j = i+1; j < len; j++ ){
            if(arr[i] > arr[j]){
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
    }
    return arr;
}

//选择排序法二

/* 循环只保留下标，在一次循环完成后再交换
 *
 */
function selectSort(arr){
    let minIndex,
        len = arr.length;
    for(let i = 0; i < len; i++){
        minIndex = i;
        for(let j = i + 1; j < len; j++){
            if(arr[j] < arr[minIndex] ){
                minIndex = j
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    console.log(arr);
    return arr;
}

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
// 插入排序
function insertSort(arr){
    let len = arr.length,
        orderIndex;
    for(let i = 1; i < len; i++){
        for(let j = (i - 1); j >= 0; j--){
            if(arr[i] < arr[j]){
                console.log(i,j);
                orderIndex = j;
            }
        }
        arr.move(i,orderIndex);
        console.log(orderIndex);
        console.log(arr);
    }
    return arr;
}
//快速排序
function quickSort(arr){
    let len = arr.length,
        leftArr = [],
        rightArr = [],
        cenVal = arr[Math.floor(len/2)];
    for(let i = 0; i < len; i++){
        if(arr[i] < cenVal){
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }
    leftArr.sort((a,b) => a - b > 0 );
    rightArr.sort((a,b) => a - b > 0 );
    console.log(cenVal);
    return [...leftArr, ...rightArr];
}
let result = quickSort(waitSort);
//let result = insertSort(waitSort);
//let result = selectSort(waitSort);
//let result = bubleSort(waitSort);

render(canvas, result);
