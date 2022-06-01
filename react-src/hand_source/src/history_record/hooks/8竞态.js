import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

// 竞态
const API = {
    async fetchArticlByid(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    id,
                    title: `title-${id}`
                })
            }, 1000 * (5 - id))
        })
    }
}

function Article(props) {
    let [article, setArticle] = useState({})

    useEffect(() => {
        let didCancel = false; // 此请求是否已经取消
        (async () => {
            let article = await API.fetchArticlByid(props.id)
            if (!didCancel) {
                setArticle(article)
            }
        })();
        return () => didCancel = true
    }, [props.id])

    return (<>
        <p>{article.title}</p>
    </>)
}

function App() {
    const [id, setId] = useState(0);

    return (
        <div>
            <p>id:{id}</p>
            <Article id={id} />
            <button onClick={() => setId(id + 1)}>
                Click me
            </button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
