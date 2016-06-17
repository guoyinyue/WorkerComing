'use strict'
import React,{
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  NavigatorIOS,
  Component
} from 'react-native';

import Util from '../common/util.js';

export default class Header extends Component{


  render()
  {

    return (

      <View style={styles.header}>
          <TouchableOpacity
              onPress={() => console.log(this.props.children)}
              style={styles.navBarLeftButton}>
              {this.props.children[0]}
            </TouchableOpacity>
           <Text style={[styles.navBarText, styles.navBarTitleText]}>{this.props.title}</Text>
             <TouchableOpacity
              onPress={() => alert(index)}
              style={styles.navBarRightButton}>
               {this.props.children[1]}
             
            </TouchableOpacity>
        </View>

      );

  }
}

const styles = StyleSheet.create({
header:{
  height:64,
  width:Util.size.width,
   flexDirection:'row',
    backgroundColor:'#f9c158',
    justifyContent:'space-between',
 }, 
 navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginTop: 28,
    color:'#fff',
    textAlign:'center',
  },
  navBarLeftButton: {
    paddingLeft: 10,
    paddingTop:18,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color:'#fff',
  },
  tel:{
  marginTop:25,
  width:25,
  height:25,
  },
});