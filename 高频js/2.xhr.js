
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
    let { status, readyState } = xhr
    if (readyState === 4) {
        if ((status >= 200 & status < 300) || status === 304) {
            console.log(xhr.responseText);
        } else {
            console.log("unSuccess...", status);
        }
    }
}

xhr.open('get', 'https://api.github.com/emojis', false)
xhr.send(null);