function createBrowserHistory() {
  const globalHistory = window.history;
  let listeners = []; //存放所有的监听函数
  let state;
  let prompt;

  function listen(listener) {
    listeners.push(listener);
    // 监听函数 会返回一个取消监听的函数
    return () => {
      listeners = listeners.filter((item) => item != listener);
    };
  }

  function go(n) {
    globalHistory.go(n);
  }

  window.addEventListener("popstate", () => {
    //TODO
    let location = {
      state: globalHistory.state,
      pathname: window.location.pathname,
    };
    //当路径改变之后应该让history的监听函数执行，重新刷新组件
    setState({ action: "POP", location });
  });

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function setState(newState) {
    //把newState上的属性赋值到history对象上
    Object.assign(history, newState);
    history.length = globalHistory.length; //路由历史栈中历史条目的长度
    listeners.forEach((listener) => listener(history.location)); //通知监听函数执行,参数是新的location
  }

  function push(pathname, nextState) {
    //TODO
    const action = "PUSH"; //action表示是由于什么样的动作引起了路径的变更
    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState; //TODO
    }
    if (prompt) {
      let message = prompt({
        pathname, state
      });
      let result = window.confirm(message)
      if (!result) return null
    }

    globalHistory.pushState(state, null, pathname); //我们已经 跳转路径
    let location = { state, pathname };
    setState({ action, location });
  }

  const history = {
    action: "POP",
    go,
    goBack,
    goForward,
    push,
    listen,
    location: {
      pathname: window.location.pathname,
      state: globalHistory.state,
    },
    block(message) {
      prompt = message;
      return () => prompt = null
    }
  };
  return history;
}
export default createBrowserHistory;
