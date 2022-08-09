export class Singleton {
    private static singleton: Singleton = new Singleton()
    private constructor() { }
    static getSingleton() {
        return Singleton.singleton
    }
}

const s1 = Singleton.getSingleton()
const s2 = Singleton.getSingleton()
console.log(s1 === s2);