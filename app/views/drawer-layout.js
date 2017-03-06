import React, { Component } from 'react';
import { Text, Navigator, View } from 'react-native';
import { Button } from 'native-base';
import Drawer from 'react-native-drawer';
import ControlPanel from './control-panel';

export default class DrawerLayout extends Component {
  constructor(props) {
    super(props);
    this.getNavigator = this.getNavigator.bind(this);
  }

  getNavigator() {
    return this.drawerNavigator;
  }

  configureScene(route) {
    if (route.sceneConfig) {
      return (route.sceneConfig);
    } else {
      return ({
        ...Navigator.SceneConfigs.HorizontalSwipeJump,
        gestures: {},
      });
    }
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'Home':
        return (<View drawerNavigator={navigator}>
              <Text> Hi Iam home </Text>
              </View>);
        break;
      case 'Calendar':
        return (<View drawerNavigator={navigator}>
              <Text> Hi Iam Calendar </Text>
              </View>);
        break;
    }
  }

  closeControlPanel = () => {
     this._drawer.close()
   };
   openControlPanel = () => {
     this._drawer.open()
   };

  render() {
    const drawerStyles = {
      drawer: { backgroundColor: 'gray',
                shadowColor: '#ffffff',
                shadowOpacity: 0.8,
                shadowRadius: 3,
              },
      main: { paddingLeft: 3 },
    };

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        disabled = {false}
        styles={drawerStyles}
        acceptPan = {true}
        negotiatePan = {true}
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 },
        })}
        panOpenMask={.2}
        content = {
          <ControlPanel getNavigator={this.getNavigator}
          closeDrawer = {this.closeControlPanel}
          openDrawer = {this.openControlPanel}
            {...this.props} />
        }
          >
          <Navigator
            ref={(ref) => this.drawerNavigator = ref}
            initialRoute={ { name: 'Home' } }
            renderScene={this.renderScene}
            configureScene={this.configureScene}
          />
      </Drawer>
        );
  }
}
