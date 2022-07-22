import { GetServerSideProps } from 'next'
import React, { useEffect, useRef, useState } from 'react'

interface ArticlesProps { }

// const formateData = (data) => {
//     const processData = {
//         ...data,
//         id: data._id.toString(),
//         createdAt: moment(data.createAt).format("YYYY-MM-DD hh:mm:ss"),
//         updatedAt: moment(data.createAt).format("YYYY-MM-DD hh:mm:ss"),

//     }
//     delete processData._id
//     delete processData._v
//     return processData
// }

const Articles: React.FC<ArticlesProps> = (props) => {
    // const { articles } = props
    const inputRef = useRef<HTMLInputElement>(null)

    const [articles, setData] = useState<any[]>()
    const [isEdit, setEdit] = useState<boolean>(false)
    const [editId, setId] = useState<string>('')

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        const res = await fetch("/api/article").then(res => res.json())
        console.log(res);
        if (res.code === 0) {
            setData(res.data)
        }
    }

    const confirmHandler = async () => {
        let value = inputRef?.current?.value;
        if (!value) {
            alert("请输入内容...")
            return;
        }
        let params;
        if (isEdit) {
            let { data } = await fetch(`/api/article?id=${editId}`).then(res => res.json())
            params = {
                ...data,
                title: value,
            }
        } else {
            params = {
                title: value,
                date: new Date(),
                name: `今日热点${articles?.length}`,
                id: isEdit ? editId : null
            }
        }
        let data = await fetch("/api/article", { method: isEdit ? 'PUT' : 'POST', body: JSON.stringify(params) }).then(res => res.json())
        if (data.code === 0) {
            alert(isEdit ? '修改成功' : '添加成功')
            setEdit(false)
            setId("")
            inputRef.current.value = ''
            fetchData()
        }
    }

    const deleteOne = async (id) => {
        if (id) {
            const result = await fetch("/api/article", { method: 'DELETE', body: { _id: id } }).then(res => res.json())
            if (result.code === 0) {
                alert("删除成功...")
                fetchData()
            }
        }
    }

    return (
        <div style={{ margin: 20 }}>
            <p><input ref={inputRef} /> <button onClick={confirmHandler}>{isEdit ? 'Update' : 'Add'}</button></p>
            <ul>
                {
                    articles?.map((item) => (
                        <li key={item._id} style={{ margin: 5 }}>
                            <span>{item.title}</span>
                            <button style={{
                                margin: '0 5px',
                                cursor: 'pointer',
                                backgroundColor: '#1890ff',
                                color: 'white',
                                borderWidth: 0
                            }} onClick={() => {
                                setEdit(true)
                                setId(item._id)
                            }}>编辑</button>
                            <button style={{
                                backgroundColor: '#d9363e',
                                cursor: 'pointer',
                                borderWidth: 0,
                                color: 'white'
                            }} onClick={() => deleteOne(item._id)}>删除</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     let { data } = await fetch('http://localhost:3000/api/article').then(res => res.json())

//     return {
//         props: {
//             articles: data
//         }
//     }
// }

export default Articles
