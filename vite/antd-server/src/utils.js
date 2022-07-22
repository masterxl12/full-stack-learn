
let path = require('path')
let fs = require('fs-extra')

const DEFAULT_SIZE = 1024 * 5; // 5k 拆分
const TEMP_DIR = path.resolve(__dirname, 'temp');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

/**
 * @description 分割文件功能
 * @param {@} filename 
 * @param {*} size 
 */
const splitChunks = async function (filename, size = DEFAULT_SIZE) {
  let filePath = path.resolve(__dirname, filename);
  const chunksDir = path.resolve(TEMP_DIR, filename);
  await fs.mkdirp(chunksDir); // 递归创建目录
  let content = await fs.readFile(filePath);
  let i = 0, current = 0, len = content.length;
  while (current < len) {
    await fs.writeFile(path.resolve(chunksDir, filename + '-' + i), content.slice(current, current + size))
    i++;
    current += size;
  }
}
// splitChunks('jierui.jpeg');

/**
 * 读取temp目录下tom.jpeg目录中的所有文件，还需要按尾部的索引号
 * 把他们累加在一起 另外一旦加过要把temp目录的文件删除
 * 为了提高性能 尽量使用流来实现 不要readFile writeFile
 * @param {*} filename 
 * @param {*} size 
 */

const pipeStream = (filePath, ws) =>
  new Promise((resolve, reject) => {
    let rs = fs.createReadStream(filePath);
    rs.on('end', async () => {
      await fs.unlink(filePath);
      resolve();
    })
    rs.on('error', (err) => { reject(err) })
    rs.pipe(ws);
  })

/**
 * @description 合并文件功能
 * @param {*} filename 
 * @param {*} size 
 */
const mergeChunks = async function (filename, size = DEFAULT_SIZE) {
  let filePath = path.resolve(PUBLIC_DIR, filename); // 指定合并要写入的路径
  let chunksDir = path.resolve(TEMP_DIR, filename);
  let chunkFiles = await fs.readdir(chunksDir);      // 读取指定文件下的所有文件
  chunkFiles
    .sort((a, b) => Number(a.split('-')[1] - Number(b.split('-')[1]))) // 按文件名升序排列


  await Promise.all(chunkFiles.map((chunkFile, index) => pipeStream(
    path.resolve(chunksDir, chunkFile),
    fs.createWriteStream(filePath, {
      start: index * size // 记录每次读取文件的起始位
    })
  )))
  // await Promise.all(chunkFiles.map((chunkFile, index) => {
  //   let readPath = path.resolve(chunksDir, chunkFile);
  //   let ws = fs.createWriteStream(filePath, {
  //     start: index * size // 记录每次读取文件的起始位
  //   });
  //   return pipeStream(readPath, ws);
  // }))
  await fs.rmdir(chunksDir);
}

// mergeChunks('jierui.jpeg');

module.exports = {
  mergeChunks
}



