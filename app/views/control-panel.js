import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from 'firebase';

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this._logout = this._logout.bind(this);
    this._gotoHome = this._gotoHome.bind(this);
    this._gotoCalendar = this._gotoCalendar.bind(this);
  }

  _logout() {
    firebase.auth().signOut();
    this.props.navigator.push({
        name: 'Landing',
      });
  }

  _gotoHome() {
    this.props.closeDrawer();
    this.props.getNavigator().push({
        name: 'Home',
      });
  }

  _gotoCalendar() {
    this.props.closeDrawer();
    this.props.getNavigator().push({
        name: 'Calendar',
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._gotoHome}>
          <Text style={{ color: 'white' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._gotoCalendar}>
          <Text style={{ color: 'white' }}>Calender</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this._logout}>
          <Text style={{ color: 'white' }}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'blue',
  },
  controlText: {
    color: 'white',
  },
  button: {
    padding: 10,
  },
});
