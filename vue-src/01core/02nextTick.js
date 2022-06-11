
let cbs = []; // 制作队列
let pendings = false;
function flushCallbacks() {
  cbs.forEach(h => h());
  pendings = false;
}

function nextTick(callback) {
  cbs.push(callback);
  if (!pendings) {
    pendings = true;
    // 使用异步 批量延迟更新
    Promise.resolve().then(() => flushCallbacks())
  }
}

function render() {
  console.log('渲染更新');
}

nextTick(render)
nextTick(render)
nextTick(render)

console.log('状态改变...')