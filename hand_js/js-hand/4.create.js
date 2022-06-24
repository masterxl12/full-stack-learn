function fakeNew(prototype) {
    function F() { }
    F.prototype = prototype
    return new F()
}