import React, { Component } from "react";
import "./style.css";
import Loader from "./Loader";
import Info from "./Info";

class IPinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: null,
      isLoading: true,
    };
  }

  async getUserIp() {
    const response = await fetch("https://api.ipify.org?format=json");

    return (await response.json()).ip;
  }

  async getUserInfo() {
    const userIp = await this.getUserIp();

    const response = await fetch(`http://ipwho.is/${userIp}`);

    return await response.json();
  }

  componentDidMount() {
    this.getUserInfo().then((data) => {
      this.setState({
        info: data,
        isLoading: false,
      });
    });
  }

  render() {
    const isLoading = this.state.isLoading;
    return (
      <React.Fragment>
        {isLoading ? <Loader /> : <Info info={this.state.info} />}
      </React.Fragment>
    );
  }
}

export default IPinfo;
