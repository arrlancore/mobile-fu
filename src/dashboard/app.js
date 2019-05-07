import React from "react";
import { Layout, Menu, Icon } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from "./login";
import Home from "./home";
import User from "./managementUser";
import Logo from "../assets/mainlogo.png";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import { Row, Col } from "antd";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/user" component={User} />
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data_members,
    isLogin: state.data_members.formSuccess,
  };
};

const mapDispatchToProps = dispatch => ({
  loginMember: form => dispatch(actions.loginMember(form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
