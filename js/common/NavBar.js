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
  Component,
  Navigator,
} from 'react-native';

export default class NavBar extends Component {


  updateProgress(progress, fromIndex, toIndex) {
    this._nav.updateProgress(progress, fromIndex, toIndex);
   
     
  }
  

  render(){
    let nav = this.props.navigator;
    return(
      <Navigator.NavigationBar
        style={styles.navBar}
        {...this.props} 
        ref={(nav) => { this._nav = nav; }}
      />
      );
  }  
}


const styles = StyleSheet.create({

  navBar: {
    backgroundColor: '#f9c158',
  },
 
});

