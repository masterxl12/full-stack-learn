import React, { useState, useEffect, ChangeEvent } from 'react'
// import { LeftSideBar } from './config/LeftSideBar'
import { Row, Col, Input, message, Button } from 'antd'
import 'antd/dist/antd.css'
import { request } from './utils'
import { DEFAULT_SIZE, Part } from './typings'
import Upload from './components/Upload'

function App() {
  /*
  const [currentFile, setCurrentFile] = useState<File>()
  const [objectURL, setObjURL] = useState<string>('')
  const [hashPercent, setHashPercent] = useState<number>(0)

  useEffect(() => {
    let objFile: string
    try {
      if (currentFile) {
        objFile = URL.createObjectURL(currentFile!)
        setObjURL(objFile)
      }
    } catch (error) {
      console.log(123);
    }
    return () => URL.revokeObjectURL(objFile!)

  }, [currentFile])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setCurrentFile(file)
  }

  const allowUpload = (file: File) => {
    const isValidFileType = [
      "image/png",
      "image/jpeg",
      "image/tif",
      "video/mp4",
      "application/json",
      "application/xml",
    ].includes(file.type);
    if (!isValidFileType) message.error("不支持此类文件上传")

    const isLessThan2G = file.size < 1024 * 1024 * 1024;
    if (!isLessThan2G) message.error("上传文件不能大于2G")

    return isValidFileType && isLessThan2G
  }

  const handleUpload = async () => {
    if (!currentFile) message.error("未选择文件")
    if (currentFile && !allowUpload(currentFile)) message.error("不支持当前文件类型上传")
    // const formData = new FormData()
    // formData 接口提供一种表示表单数据键值对的构造方式，可以使用xmlHttpRequest.send() 方法发出

    // formData.append("chunk", currentFile);
    // formData.append("filename", currentFile.name);

    // try {
    //   const result = await request({
    //     url: "/upload",
    //     method: "POST",
    //     data: formData,
    //   });
    //   if (result && result.success) {
    //     message.success('上传成功')
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // 分片
    const partList: Part[] = createChunks(currentFile!)
    // 先计算这个对象的hash值  秒传的功能(相同的文件有相同的hash值，如果服务端保存有，则直接返回结果)
    const fileHash = await calculateHash(partList)
    const lastDotIndex = currentFile!.name.lastIndexOf("."); // xxx.mp4
    const extName = currentFile!.name.slice(lastDotIndex); // 获取扩展名 .mp4
    const filename = `${fileHash}${extName}`; // hash.mp4
    partList.forEach((item, index) => {
      item.filename = filename;
      item.chunk_name = `${filename}-${index}`
    })
    await uploadParts(partList, filename)
  }

  async function verify(fileName: string) {
    return await request({
      method: 'GET',
      url: `/verify/${fileName}`
    })
  }

  const uploadParts = async (partList: Part[], fileName: string) => {
    // const { needUpload } = await verify(fileName)
    // if (!needUpload) {
    //   message.success('秒传成功')
    // }

    const requests = createRequests(partList, fileName)
    await Promise.all(requests)
    await request({
      url: `/merge/${fileName}`,
      method: 'GET'
    })
  }

  const createRequests = (partList: Part[], filename: string) => {
    return partList.map((part: Part) => request({
      url: `/upload/${filename}/${part.chunk_name}`,
      method: "POST",
      headers: { "Content-Type": 'application/octet-stream;charset=UTF-8' },
      data: part.chunk
    }))
  }

  const createChunks = (file: File): Part[] => {
    const partList: Part[] = []
    let current = 0;
    while (current < file.size) {
      const chunk = file.slice(current, current + DEFAULT_SIZE)
      partList.push({
        chunk,
        size: chunk.size
      })
      current += DEFAULT_SIZE
    }
    return partList
  }

  // 计算hash 使用webWorker
  const calculateHash = (partList: Part[]) => {
    return new Promise((resolve) => {
      // 2.2.1 通过webWorker 开启子进程来计算hash (注意是整个文件的hash)
      const worker = new Worker("/hash.js")
      worker.postMessage({ partList })
      worker.onmessage = (event) => {
        const { percent, hash } = event.data
        setHashPercent(percent)
        if (hash) {
          resolve(hash)
        }
      }
    })
  }

  return (
    <div className="App">
      <Row>
        <Col span={8}>
          <Input type="file" style={{ width: 300 }} onChange={handleChange} />
          <Button type="primary" style={{ margin: '0 5px' }} onClick={handleUpload}>上传</Button>
        </Col>
        <Col span={8}>
          {objectURL && <img src={objectURL} style={{ width: 300 }} />}
        </Col>
      </Row>
    </div>
  )
  */
  return <>
    <Upload />
  </>
}

export default App
