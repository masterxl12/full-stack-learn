import React, { Component } from "react";
import matchPath from "../react-router-dom/matchPath";
import RouterContext from "./RouterContext";

class Switch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = context.location;
          let element, match;
          React.Children.forEach(this.props.children, (child) => {
            if (!match && React.isValidElement(child)) {
              element = child;
              const path = child.props.path || child.props.from;
              match = matchPath(location.pathname, { ...child.props, path });
            }
          });
          return match
            ? React.cloneElement(element, { location, computedmatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Switch;
