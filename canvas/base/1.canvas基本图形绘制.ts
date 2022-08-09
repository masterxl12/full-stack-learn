//@ts-ignore 
//@ts-nocheck

let canvas: HTMLCanvasElement = document.getElementById("canvas")
let ctx: CanvasRenderingContext2D = canvas.getContext('2d')

// 1. 绘制矩形
ctx.rect(50, 0, 200, 200)
ctx.fillStyle = 'skyblue'
ctx.fill()

// 2. 绘制路径
// ctx.stroke()

// 3. 绘制线段
ctx.beginPath() // 开始绘制
ctx.moveTo(250, 250)
ctx.lineTo(250, 400)
ctx.lineTo(400, 400)
ctx.closePath()

// ctx.lineWidth = 3
ctx.lineCap = 'round' // 起始路径线段边缘设置圆角
ctx.lineJoin = "round" // 两条线段相交时，所创建的拐角类型
ctx.strokeStyle = 'darkblue'
ctx.stroke() // 必须调用 绘制当前路径方法

// 4. 绘制圆
ctx.beginPath() // 开始绘制
ctx.arc(100, 100, 50, 0, Math.PI)
ctx.stroke()

// 5. 绘制文本
ctx.font = '50px sans-serif'
ctx.shadowBlur = 15
ctx.shadowColor = "rgba(0,0,0,.5)"
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10

ctx.fillText("hello world", 500, 50)
ctx.strokeText("hello sn", 500, 100)

// 弹幕效果
/*
let x = 800;
setInterval(() => {
    ctx.clearRect(0, 0, 800, 800)
    x -= 3;
    if (x < 0) {
        x = 800
    }
    ctx.fillText("hello world", x, 50)
    ctx.strokeText("hello sn", x, 100)
}, 16)
*/

ctx.stroke()

console.log(ctx);