import React, { Component } from "react";

export default class AddChallengeErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return <div>Cannot get add challenge page</div>;
    }
    return this.props.children;
  }
}
