//@ts-ignore 
//@ts-nocheck

let canvas: HTMLCanvasElement = document.getElementById("canvas")
let ctx: CanvasRenderingContext2D = canvas.getContext('2d')

const dpr = window.devicePixelRatio
const logicalWidth = canvas.width
const logicalHeight = canvas.height

canvas.width = logicalWidth * dpr
canvas.height = logicalHeight * dpr
canvas.style.width = logicalWidth + 'px'
canvas.style.height = logicalHeight + 'px'

ctx.scale(dpr, dpr)

let video: HTMLVideoElement = document.getElementById("video")

// 绘制图像
let img: HTMLImageElement = new Image()
img.src = './images/avatar.jpg'

// ctx.drawImage(img, 100, 20, 200, 200, 10, 10, 200, 200)
// 确保资源被加载之后再绘制图像
// img.onload = () => {
//     ctx.drawImage(img, 100, 20, 200, 200, 10, 10, 200, 200)
// }


// 绘制视频
let timerId;
video.onplay = () => {
    timerId = setInterval(() => {
        ctx.clearRect(0, 0, 600, 600)
        ctx.fillRect(0, 0, 600, 600)
        ctx.drawImage(video, 50, 50, 500, 500)

        ctx.font = '20px 微软雅黑'
        ctx.strokeStyle = 'aqua'
        ctx.strokeText("hello canvas", 25, 25)
    }, 16)
}

video.onpause = () => {
    clearInterval(timerId)
}

console.log(ctx);