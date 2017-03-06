import * as firebase from 'firebase';
firebase.initializeApp({
    apiKey: 'AIzaSyBZGP8NEURIRHkuRfaqRlolhfaKDzQkLdY',
    authDomain: 'bittu-f933c.firebaseapp.com',
    databaseURL: 'https://bittu-f933c.firebaseio.com',
    storageBucket: 'bittu-f933c.appspot.com',
    messagingSenderId: '901971482057',
  });
import React, { Component } from 'react';
import { View, Navigator } from 'react-native';

import DrawerLayout from './views/drawer-layout';
import LandingPage from './views/landing-page';
import SignInPage from './views/signin-page';
import SignUpPage from './views/signup-page';

export default class MainNavigator extends Component {

  constructor(props) {
    super(props);
    this.getInitialView();

    this.state = {
      userLoaded: false,
      initialView: null,
    };

    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {
      let initialView = user ? 'Home' : 'Landing';
      this.setState({
        userLoaded: true,
        initialView: initialView,
      });
    });
  }

  static renderScene(route, navigator) {
    switch (route.name) {
      case 'Home':
        return (<DrawerLayout navigator={navigator} />);
        break;
      case 'Landing':
        return (<LandingPage navigator={navigator} />);
      case 'SignIn':
        return (<SignInPage navigator={navigator} />);
        break;
      case 'SignUp':
        return (<SignUpPage navigator={navigator} />);
        break;
    }
  }

  static configureScene(route) {
    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {},
      });
    }
  }

  render() {
    if (this.state.userLoaded) {
      return (
          <Navigator
              initialRoute={ { name: this.state.initialView } }
              renderScene={MainNavigator.renderScene}
              configureScene={MainNavigator.configureScene}
          />);
    } else {
      return null;
    }
  }
}
