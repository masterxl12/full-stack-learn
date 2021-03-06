let docEl = document.documentElement;
let dpr = window.devicePixelRatio || 1;

function setBodyFontSize() {
    if (document.body) {
        document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
}
setBodyFontSize()
function setRemUnit() {
    let rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
}
setRemUnit()

window.addEventListener("resize", setRemUnit)

