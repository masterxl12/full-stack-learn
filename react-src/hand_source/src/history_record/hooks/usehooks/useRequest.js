import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

function useRequest(url) {
    const limit = 5;
    const [data, setData] = useState([])
    const [offset, setOffset] = useState(0)

    const loadMore = async () => {
        setData(null);
        let result = await fetch(`${url}?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
        setData([...data, ...result]);
        setOffset(offset + result.length);
    }
    useEffect(() => {
        loadMore()
    }, []);
    return [data, loadMore];
}

function App() {
    const [users, loadMore] = useRequest('http://localhost:8000/users')

    if (users === null) {
        return <div>loading...</div>
    }

    return (
        <div>
            <ul>
                {
                    users.map((item, index) => <li key={index}>{item.id}:{item.name}</li>)
                }
            </ul>
            <button onClick={loadMore}>下一页</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
