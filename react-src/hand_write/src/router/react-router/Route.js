import React, { Component } from "react";
import matchPath from "../react-router-dom/matchPath";
import RouterContext from "./RouterContext";

class Route extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = context.location;
          const { component, computedmatch, render, children } = this.props;
          const match = computedmatch
            ? computedmatch
            : matchPath(location.pathname, this.props);

          const props = { ...context, location, match };
          if (match) {
            props.match = match;
            if (children) {
              return children(props)
            } else if (component) {
              return React.createElement(component, props);
            } else if (render) {
              return render(props);
            } else {
              return null
            }
          } else {
            if (children) return children(props)
            return null
          }
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
