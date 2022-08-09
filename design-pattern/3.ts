const f = <T extends string | number>(a: T, b: T) => {
    if (typeof a === 'string') {
        return a + b
    } else {
        return (a as number) + (b as number)
    }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f("2", "2") // Ok