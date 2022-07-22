// 子进程计算hash值
self.importScripts('/spark-md5/spark-md5.js')
self.onmessage = async (event) => {
  let { partList } = event.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percent = 0; // 总体计算hash的百分比
  let perSize = 100 / partList.length; // 每计算一个part，相当于完成百分之几

  let buffers = await Promise.all(partList.map(({ chunk }) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(chunk);
      reader.onload = function (event) {
        percent += perSize;
        self.postMessage({ percent: Number(percent.toFixed(2)) })
        resolve(event.target.result)
      }
    }))
  );

  buffers.forEach(buffer => spark.append(buffer));
  // 通知主进程，
  self.postMessage({ percent: 100, hash: spark.end() })
  self.close();
}