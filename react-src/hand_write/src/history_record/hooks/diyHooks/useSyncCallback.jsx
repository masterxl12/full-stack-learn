import { useCallback, useEffect, useState } from "react";

const useSyncCallback = (callback) => {
    const [proxyState, setProxyState] = useState({
        current: false
    })

    const Func = useCallback(() => {
        console.log(proxyState, 1);
        setProxyState({ current: true })
    }, [proxyState])

    useEffect(() => {
        console.log(proxyState, 1234);
        if (proxyState.current) setProxyState({ current: false })
    }, [proxyState])

    useEffect(() => {
        console.log("wwww...");
        proxyState.current && callback()
    })

    return Func
}

export default useSyncCallback