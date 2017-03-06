import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this._gotoSignup = this._gotoSignup.bind(this);
    this._gotoSignin = this._gotoSignin.bind(this);
  }

  _gotoSignup() {
    this.props.navigator.push({
      name: 'SignUp',
    });
  }

  _gotoSignin() {
    this.props.navigator.push({
      name: 'SignIn',
    });
  }

  render() {
    var roundedButton = {
        backgroundColor: 'transparent',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
      };

    return (
      <Image style={styles.backgroundImage}
       source={require('../assets/landing_page.png')}>
          <Text style={{ fontSize: 28, color: 'yellow' }}> Bittu  </Text>
          <Text style={{ fontSize: 18, color: 'white', marginBottom: 100 }}>
            your personal assistant  </Text>
          <Button rounded block
           style={roundedButton}>
           <View style={styles.socialLoginTxt}>
             <Text style={styles.socialHighlightTxt}> f </Text>
             <Text style={styles.buttonLabel}>Connect with Facebook  </Text>
            </View>
          </Button>
          <Button rounded block
           style={roundedButton}>
           <View style={styles.socialLoginTxt}>
             <Text style={styles.socialHighlightTxt}> G </Text>
             <Text style={styles.buttonLabel}>
             Connect with Google  </Text>
           </View>
          </Button>
          <Text style={styles.buttonLabel}> or  </Text>
          <View style={styles.buttonGroupHorizontal}>
            <Button rounded block onPress={this._gotoSignup}
             style={roundedButton}>
              <Text style={styles.buttonLabel}> SignUp  </Text>
            </Button>
            <Button rounded block onPress={this._gotoSignin}
              style={roundedButton}>
              <Text style={styles.buttonLabel}> SignIn  </Text>
            </Button>
          </View>
      </Image>
       );
  }
}
var styles = StyleSheet.create({
  backgroundImage: {
    paddingTop: 100,
    flexDirection: 'column',
    flex: 1,
    width: null,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'stretch', // or 'stretch'
  },
  buttonGroupHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    color: 'white',
  },
  socialLoginTxt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialHighlightTxt: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
});
