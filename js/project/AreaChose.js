'use strict';
import React,{
  NavigatorIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight
} from 'react-native';
 export default class AreaChose extends Component{


 	componentDidMount(){
 		


 	}
	render(){

		return (
			<View>
				
        <TouchableHighlight
          activeOpacity={1}
          disabled={true}
          animationVelocity={0}
          underlayColor="rgb(210, 230, 255)"
          style={[styles.row, styles.block]}
          onPress={() => console.log('custom buthasdisabke - luhaibo')}>
          <Text style={styles.disabledButton}>
            Disabled TouchableHighlight
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          animationVelocity={0}
          underlayColor="rgb(210, 230, 255)"
          style={[styles.row, styles.block]}
          onPress={() => console.log('custom THW text - highlight')}>
          <Text style={styles.button}>
            Disabled TouchableHighlight
          </Text>
        </TouchableHighlight>



			</View>
			);



	};
}

var styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 16,
  },
  block: {
    padding: 10,
  },
  button: {
    color: '#007AFF',
  },
  disabledButton: {
    color: '#007AFF',
    opacity: 0.5,
  },
  nativeFeedbackButton: {
    textAlign: 'center',
    margin: 10,
  },
  hitSlopButton: {
    color: 'white',
  },
  wrapper: {
    borderRadius: 8,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  hitSlopWrapper: {
    backgroundColor: 'red',
    marginVertical: 30,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  eventLogBox: {
    padding: 10,
    margin: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  forceTouchBox: {
    padding: 10,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  textBlock: {
    fontWeight: '500',
    color: 'blue',
  },
});