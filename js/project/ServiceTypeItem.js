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
  WebView

} from 'react-native';
import Dimensions from 'Dimensions';
import AreaChose from "./AreaChose";
import Reservation from './Reservation';
import PixelRatio from 'PixelRatio';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class ServiceTypeItem extends Component{

  reservation(type){

    this.props.navigator.push({


        component:<Reservation name={type}/>,
        title:'填写订单信息',
    });

  }
      
  render(){
      let uri = this.props.uri;
     
      console.log(uri);
    return (
      <View>
      <WebView 
          automaticallyAdjustContentInsets={true}
          style={[styles.webView,{width:width,height:height-64}]}
          source={{uri:uri}}
          startInLoadingState={false}
          scalesPageToFit={true}
          scrollEnable={true}
          contentInset={{bottom:30,top:0}}

        >
        </WebView>
        <View style={styles.rev}>
        <TouchableHighlight 
           activeOpacity={0.9} 
           underlayColor={'#f9c158'}
           onPress={this.reservation.bind(this,this.props.type)}
           >
            <Text style={[{color:'#fff',textAlign:'center',lineHeight:25}]}>预约</Text>
        </TouchableHighlight>
        </View>
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  webView:{
    backgroundColor:'gray', 
    paddingBottom:190,
  },
  
  rev:{
    width:width,
    height:40,
    position:'absolute',
    left:0,
    bottom:0,
    backgroundColor:'#f9c158',

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

  },
 
});
