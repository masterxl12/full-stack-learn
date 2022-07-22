let redis = require('redis')

let client = redis.createClient(6739,
    '127.0.0.1'
)

client.on('error', err => {
    console.log(err);
})

const getValue = (key) => {
    return client.get(key)
};


; (async () => {
    try {
        client.connect();
        // 读取有序列表
        let data1 = await client.lRange("barrages", 0, -1,)
        // 读取字符串
        let data2 = await client.get("name")
        console.log('val', data1, data2)
    } catch (err) {
        console.log(err);
    }
})();
