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
          const { component, computedmatch } = this.props;
          const match = computedmatch
            ? computedmatch
            : matchPath(location.pathname, this.props);

          if (match) {
            const props = { ...context, location, match };
            const element = React.createElement(component, props);
            return (
              <RouterContext.Provider value={{ props }}>
                {element}
              </RouterContext.Provider>
            );
          }

          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
