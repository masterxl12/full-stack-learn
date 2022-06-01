import React from "react";
import RouterContext from "./RouterContext";

function Redirect({ to, from }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        const { history } = context;

        return <Lifecycle onMount={() => history.push(to)} />;
      }}
    </RouterContext.Consumer>
  );
}

class Lifecycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
    //   let onMount = this.props.onMount;
    //   this.onMount = onMount;
    //   this.onMount(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  }

  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  }
  render() {
    return null;
  }
}

export default Redirect;
