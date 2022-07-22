import React from "react";

export default function User() {
    let [number, setNumber] = React.useState(0);
    return (
        <div>
            用户名:<input />
            <button onClick={() => setNumber(number => number + 1)}>{number}</button>
        </div>
    )
}