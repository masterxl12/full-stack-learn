let express = require('express')
let { Request, Response, NextFunction } = require('express')
let logger = require('morgan');
let { INTERNAL_SERVER_ERROR } = require('http-status-codes')  // 500
let createError = require('http-errors')
let cors = require('cors')
let path = require('path')
let fs = require('fs-extra')
let multiparty = require('multiparty')  // 处理文件上传

let { mergeChunks } = require('./utils');

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const TEMP_DIR = path.resolve(__dirname, 'temp');

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.options('*', cors());
app.use(express.static(PUBLIC_DIR));

// 文件上传服务
/**
fields: { filename: [ 'tom.jpeg' ] }
files: {
  chunk: [
    {
      fieldName: 'chunk',
      originalFilename: 'tom.jpeg',
      path: '/var/folders/45/lwwcktmx4175tkdnbk139qt80000gn/T/nNIPxj-LfQeZltfh3WFZpMrg.jpeg',
      headers: [Object],
      size: 91486
    }
  ]
}
*/
// ! 1. upload单文件上传
app.post('/upload', async (req, res, next) => {
  let form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return next(error)
    }
    let filename = fields.filename[0];
    let chunk = files.chunk[0];
    // console.log('fields:', fields);
    // console.log('files:', files);
    await fs.move(chunk.path, path.resolve(PUBLIC_DIR, filename), { overwrite: true });
    let result = res.json({
      success: true
    });
    // console.log(result);
  })
})

// ! 2. 1 分片上传服务
// ! 2. 4 暂停功能  (传入start,也就分片文件已上传的size大小)
app.post('/upload/:filename/:chunk_name/:start', async (req, res, next) => {
  let { filename, chunk_name, start } = req.params;
  start = start ? Number(start) : 0;
  let chunk_dir = path.resolve(TEMP_DIR, filename);
  let exist = await fs.pathExists(chunk_dir);
  if (!exist) {
    await fs.mkdirs(chunk_dir);
  }
  let chunkFilePath = path.resolve(chunk_dir, chunk_name);
  let ws = fs.createWriteStream(chunkFilePath, { flags: 'a', start });
  req.on('end', () => {
    ws.close();
    res.json({ success: true })
  })
  req.on("error", () => {
    ws.close()
  })
  req.on("close", () => {
    ws.close()
  })
  req.pipe(ws);
})

// ! 2. 2 读取临时文件中的内容 进行合并
app.get('/merge/:filename', async (req, res, next) => {
  let { filename } = req.params;
  await mergeChunks(filename, 1024 * 1024 * 60);
  res.json({ success: true });
})

// ! 2.3 读取已上传文件内容
// ! 每次先计算hash值
app.get("/verify/:filename", async (req, res) => {
  let { filename } = req.params;
  let filePath = path.resolve(PUBLIC_DIR, filename);
  let exitFile = await fs.pathExists(filePath);
  console.log("exitFile: ", exitFile);
  if (exitFile) { // 说明分片文件已上传 合并成功
    // ! 因为已经上传过了，所以不需要再上传了，可以实现秒传
    return {
      success: true,
      needUpload: false
    }
  }
  // 7ece1dca563264cb602c04c258f67c72
  let tempDir = path.resolve(TEMP_DIR, filename);
  //  走到下面 说明临时文件下还存在上传的文件
  let exist = await fs.pathExists(tempDir);
  let uploadList = [];
  if (exist) { // 说明还有续传的文件 (文件没有合并成功!)
    uploadList = await fs.readdir(tempDir);
    uploadList = await Promise.all(uploadList.map(async (filename) => {
      let stat = await fs.stat(path.resolve(tempDir, filename));
      return {
        filename,
        size: stat.size // 已经上传的文件大小
      }
    }))
  }
  res.json({
    success: true,
    needUpload: true,
    uploadList // 已经上传的文件列表
  })
})


app.use((req, res, next) => {
  next(createError(404));
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    error
  })
})

module.exports = app;
