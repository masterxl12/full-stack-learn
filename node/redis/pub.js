let redis = require('redis');

let client1 = redis.createClient(6739,
    '127.0.0.1'
)

let client2 = redis.createClient(6739,
    '127.0.0.1'
);

(async () => {
    const subscriber = client1.duplicate();
    await subscriber.connect();
    await subscriber.subscribe('food', (message) => {
        console.log(message); // 'message'
    });
})()

