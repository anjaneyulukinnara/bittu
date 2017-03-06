import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Container, Content, Form, Body,
   Item, Input, Button, Icon, Header, Title, Left, Right } from 'native-base';

import * as firebase from 'firebase';
import Database from '../services/fb-util';
export default class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        response: '',
      };

    this.login = this.login.bind(this);
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      Database.setDeviceInfo(
        (res) => { this.props.navigator.replace({
            name: 'Home',
          });
        }
      );
    } catch (error) {
      this.setState({
          response: error.toString(),
        });
    }
  }

  goToLandingPage() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Image style={styles.backgroundImage}
       source={require('../assets/landing_page.png')}>
        <View style={styles.header}>
            <Left>
            </Left>
            <Body>
                <Title> Sign In </Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.goToLandingPage()}>
                  <Icon name='close' color='white' />
              </Button>
            </Right>
        </View>
        <Content>
            <Form>
                <Item>
                    <Input placeholder="email" floatingLabel
                      onChangeText={(email) => this.setState({ email })}
                     value={this.state.eamil} />
                </Item>
                <Item last>
                    <Input placeholder="Password" floatingLabel last
                     onChangeText={(password) => this.setState({ password })}
                     value={this.state.password}/>
                </Item>
            </Form>
            <Button rounded block
              onPress={this.login} style={{ marginLeft: 20, marginTop: 20, marginRight: 20 }}>
             <Text style={{ fontSize: 20 }}>Signin</Text>
            </Button>
        </Content>
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
});
