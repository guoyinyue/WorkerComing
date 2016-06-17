/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  NavigatorIOS,
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Image,
  Component,
  StatusBarIOS,
  Navigator,
  TouchableOpacity
} from 'react-native';
import Home from './js/project/Home';
import MyIndex from './js/project/MyIndex';
import NavBar from './js/common/NavBar.js';
import PixelRatio from 'PixelRatio';
import TabBarNavigator from './js/project/MainNavigator';
import AreaChose from './js/project/AreaChose';
import PersonnalCenter from './js/project/PersonnalCenter.js';
StatusBarIOS.setStyle('light-content');

class WorkerComing extends Component {

    render() {
      return (
        <TabBarNavigator
          navTintColor='#ffffff'
          navBarTintColor='#f9c158'
          tabTintColor='#f9c158'
          tabBarTintColor='#eeeeee'
          onChange={(index)=>{}}>
          <TabBarNavigator.Item title='师傅快来' icon={require('image!indexbefore')} selectedIcon={require('image!indexafter')} defaultTab>
            <MyIndex />
          </TabBarNavigator.Item>
          <TabBarNavigator.Item title='订单' icon={require('image!orderlistbefore')} selectedIcon={require('image!orderlistafter')}>
            <AreaChose text="南通" />
          </TabBarNavigator.Item>
          <TabBarNavigator.Item title='我的主页' icon={require('image!mybefore')} selectedIcon={require('image!myafter')}>
            <PersonnalCenter />
          </TabBarNavigator.Item>
          <TabBarNavigator.Item title='设置' icon={require('image!settingbefore')} selectedIcon={require('image!settingafter')}>
            <AreaChose text="南通" />
          </TabBarNavigator.Item>
        </TabBarNavigator>
        
      );
    }      
}
const styles = StyleSheet.create({
     tel:{
  marginTop:25,
  width:25,
  height:25,
  },
  go:{
    borderLeftWidth:4 / PixelRatio.get(),
    borderBottomWidth:4 / PixelRatio.get(),
    width:12,
    height:12,
    transform:[{rotate:'45deg'}],
    borderColor:'#fff',
    marginLeft:10,
    marginTop:10,

  }
});
AppRegistry.registerComponent('WorkerComing', () => WorkerComing);
