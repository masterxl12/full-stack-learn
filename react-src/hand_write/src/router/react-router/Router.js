import React from "react";
import RouterContext from "./RouterContext";

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location, // 当前路由
    };

    // 路径发生变化的时候 重新刷新router组件 让里面的组件重新匹配
    this.unListen = this.props.history.listen((location) => {
      this.setState({
        location,
      });
    });
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    let value = {
      history: this.props.history,
      location: this.state.location,
    };

    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
