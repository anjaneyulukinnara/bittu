import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ViewPagerAndroid,
  ToastAndroid,
  Keyboard,
  View
} = ReactNative;
import * as firebase from 'firebase';
import Database from '../services/fb-util';

import type { ViewPagerScrollState } from 'ViewPagerAndroid';
import { Container, Toast,  Header, Footer, FooterTab, Title, Button, Left, Right, Body, Icon } from 'native-base';

class SignUpPage extends Component {
  static title = '<ViewPagerAndroid>';
  static description = 'Container that allows to flip left and right between child views.';

  async signup() {
    try {
      if(this.state.phone.trim()==='') {
        ToastAndroid.show('please enter mobile number', ToastAndroid.SHORT);
        return;
      }
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.email.trim(), this.state.password.trim());

        Database.createUser(this.state.name.trim(), this.state.email.trim(), this.state.phone.trim(), (res) => {
          Keyboard.dismiss();
          this.props.navigator.replace({
              name: 'SignIn',
            });
        });
    } catch (error) {
        console.log(error.toString())
    }
  }

  state = {
    page: 0,
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  onPageSelected = (e) => {
    this.setState({page: e.nativeEvent.position});
  };

  onPageScroll = (e) => {
    this.setState({progress: e.nativeEvent});
  };

  onPageScrollStateChanged = (state : ViewPagerScrollState) => {
    this.setState({scrollState: state});
  };

  move = (delta) => {
    var page = this.state.page + delta;
    this.go(page);
  };

  go = (page) => {
      Keyboard.dismiss();
      if(page === 1 && this.state.name.trim()==='') {
          ToastAndroid.show('please Enter name',ToastAndroid.SHORT);
        return;
      }
      if(page === 2 && this.state.email.trim()==='') {
        ToastAndroid.show('please Enter Email',ToastAndroid.SHORT);
        return;
      }
      if(page === 3 && this.state.password.trim()==='') {
        ToastAndroid.show('please Enter Password',ToastAndroid.SHORT);
          return;
          }
      this.viewPager.setPage(page);
      this.setState({page, actionText: 'Next'});
  };

  goToLandingPage(){
    this.props.navigator.pop();
  }

  render() {
    var title = "";
    var backButton = null;
    var closeButton = null;
    var actionButton = null;
    if(this.state.page === 0) {
      closeButton = (
        <Button transparent onPress={() => this.goToLandingPage()}>
            <Icon name='close' color='white' />
        </Button>
      );
      title = (<Title>SignUp</Title>);
    } else {
      backButton = (
        <Button transparent onPress={() => this.move(-1)}>
            <Icon name='arrow-back' color='white' />
        </Button>
      );
      title = (<Title></Title>);
    }
    if(this.state.page === 3){
      actionButton = (
        <Button  rounded center  onPress={() => this.signup()}>
          <Text style={{ color: 'white' }}>
           SignUp
          </Text>
        </Button>
      );
    } else {
      actionButton = (
        <Button  rounded center  onPress={() => this.move(1)}>
          <Icon name='arrow-forward' color='white' />
        </Button>
      );
    }
    return (
      <Image style={styles.backgroundImage}
       source={require('../assets/landing_page.png')}>
        <View style={styles.header}>
            <Left>
                {backButton}
            </Left>
            <Body>
                {title}
            </Body>
            <Right>
              {closeButton}
            </Right>
        </View>
        <View style={styles.mainContainer}>
            <ViewPagerAndroid
              initialPage={0}
              style={styles.viewPager}
              scrollEnabled={false}
              onPageSelected={this.onPageSelected}
              onPageScrollStateChanged={this.onPageScrollStateChanged}
              pageMargin={10}
              ref={viewPager => { this.viewPager = viewPager; }}>
              <View style = {styles.content}>
                 <Text style = {styles.label}>
                  What is your Name?
                 </Text>
                 <TextInput
                   style={styles.input}
                   onChangeText={(text) => this.setState({ name: text })}
                   value={this.state.name}
                 />
                </View>
                <View style = {styles.content}>
                 <Text style = {styles.label}>
                  Also, your Email?
                 </Text>
                 <TextInput
                    style={styles.input}
                   onChangeText={(text) => this.setState({ email: text })}
                   value={this.state.email}
                 />
                </View>

                <View style = {styles.content}>
                 <Text style = {styles.label}>
                  And, Password?
                 </Text>
                 <TextInput
                    secureTextEntry={true}
                   style={styles.input}
                   onChangeText={(text) => this.setState({ password: text })}
                   value={this.state.password}
                 />
                </View>

                <View style = {styles.content}>
                 <Text style = {styles.label}>
                  Lastly, Mobile Number?
                 </Text>
                 <TextInput
                    keyboardType = 'numeric'
                    maxLength={10}
                    style={styles.input}
                   onChangeText={(text) => this.setState({ phone: text })}
                   value={this.state.phone}
                 />
                </View>
            </ViewPagerAndroid>
            <View style={styles.actionButton}>
                  {actionButton}
            </View>
          </View>
        </Image>
    );
  }
}

var styles = StyleSheet.create({
  backgroundImage: {
    flexDirection: 'column',
    flex: 1,
    width: null,
    justifyContent: 'flex-start',
    resizeMode: 'stretch', // or 'stretch'
  },
  header: {
    height:50,
    flexDirection:'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  mainContainer: {
    flex:3,
  },
  viewPager: {
    marginTop:120,
    flex:2,
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  actionButton: {
    flex:5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  label: {
    fontSize: 22,
    color:'white',
  },
  input: {
    fontSize: 18,
    width: 300,
    color:'white',
  },
  footerText: {
    fontSize: 20,
    color: 'white'
  }
});

module.exports = SignUpPage;
