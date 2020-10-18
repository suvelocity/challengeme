import React, { Component } from "react";

export default class UserInfoErrorBoundry extends Component {
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
      return <div>Cannot get user info page</div>;
    }
    return this.props.children;
  }
}
