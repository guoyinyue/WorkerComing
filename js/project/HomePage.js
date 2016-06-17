'use strict'
 import React,{
  StyleSheet,
  Text,
  View,
  Image,
  Component,
  TouchableHighlight,
  AlertIOS,
  NavigatorIOS,
  StatusBarIOS,
  TabBarIOS,
} from 'react-native';
import AreaChose from "./AreaChose";
export default class HomePage extends Component {
  constructor(props) {
    // code
    super(props)
  }

  // methods
  render()
  {
   return (
    <AreaChose text="南通" />
      );
    


  }
}
const styles = StyleSheet.create({







});