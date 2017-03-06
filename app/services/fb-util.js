import * as firebase from 'firebase';
var DeviceInfo = require('react-native-device-info');

class Database {
  static async setDeviceInfo(callback) {
    let user = await firebase.auth().currentUser;
    let userPath = '/users/' + user.uid;
    firebase.database().ref(userPath).child('deviceId').set(
            DeviceInfo.getUniqueID(),
            callback);
  }

  static async createUser(name, email, phone, callback) {
    let user = await firebase.auth().currentUser;
    let userPath = '/users/' + user.uid;
    return firebase.database().ref(userPath).set({
        name: name,
        email: email,
        phone: phone,
      }, callback);
  }

  static async getCurrentUser(callback) {
    let user = await firebase.auth().currentUser;
    let userPath = '/users/' + user.uid;
    firebase.database().ref(userPath).once('value')
    .then((snapShot) => { callback(snapShot.val()); });
  }
}

module.exports = Database;
