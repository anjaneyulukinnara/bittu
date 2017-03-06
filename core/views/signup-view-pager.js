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
} = ReactNative;
import * as firebase from 'firebase';
import type { ViewPagerScrollState } from 'ViewPagerAndroid';
import { Container,  Header, Footer, FooterTab, Title, Button, Left, Right, Body, Icon } from 'native-base';

class ViewPagerSignup extends Component {
  static title = '<ViewPagerAndroid>';
  static description = 'Container that allows to flip left and right between child views.';

  async signup() {
    try {
        ToastAndroid.show('Sign up called' + this.state.email + this.state.password, ToastAndroid.SHORT);
        await firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password);

        console.log("Account created");
        let user = await firebase.auth().currentUser;
        this.creteUser(user.uid, this.state.name, this.state.email, this.state.phone);
        DismissKeyboard();
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
    actionText: 'Next',
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

 creteUser(userId, name, email, phone) {
    let userPath = '/users/' + userId;
    return firebase.database().ref(userPath).set({
        name: name,
        email: email,
        phone: phone,
      });
  }

  go = (page) => {
    console.log(page);
    if(page >= 0 && page < 4){
      this.viewPager.setPage(page);
      this.setState({page, actionText: 'Next'});
      if(page === 3) {
        this.setState({actionText: 'SignUp'});
      }
    }
    if(page === 4) {
      this.signup();
    }
    if(page === 0) {
      this.goToLandingPage();
    }
  };

  goToLandingPage(){

  }

  render() {
    return (
      <Container>
        <Header>
            <Left>
                <Button transparent onPress={() => this.move(-1)}>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>SignUp</Title>
            </Body>
        </Header>
          <ViewPagerAndroid
            style={styles.viewPager}
            initialPage={0}
            scrollEnabled={false}
            onPageSelected={this.onPageSelected}
            onPageScrollStateChanged={this.onPageScrollStateChanged}
            pageMargin={10}
            ref={viewPager => { this.viewPager = viewPager; }}>
              <View style = {{ flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
               <Text>
                Please Enter your name
               </Text>
               <TextInput
                 style={styles.input}
                 onChangeText={(text) => this.setState({ name: text })}
                 value={this.state.name}
               />
              </View>

              <View style = {styles.content}>
               <Text>
                Please Enter your email
               </Text>
               <TextInput
                  style={styles.input}
                 onChangeText={(text) => this.setState({ email: text })}
                 value={this.state.email}
               />
              </View>

              <View style = {styles.content}>
               <Text>
                Please Enter your password
               </Text>
               <TextInput
                 style={styles.input}
                 onChangeText={(text) => this.setState({ password: text })}
                 value={this.state.password}
               />
              </View>

              <View style = {styles.content}>
               <Text>
                Please Enter your phone
               </Text>
               <TextInput
                  style={styles.input}
                 onChangeText={(text) => this.setState({ phone: text })}
                 value={this.state.phone}
               />
              </View>
          </ViewPagerAndroid>
        <Footer>
          <FooterTab>
              <Button onPress={() => this.move(1)}>
                  <Text style={styles.footerText}>{this.state.actionText}</Text>
              </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewPager: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    height: 35,
    width: 200,
  },
  footerText: {
    fontSize: 20,
    color: 'white'
  }
});

module.exports = ViewPagerSignup;
