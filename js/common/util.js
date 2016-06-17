'use strict'
import React,{
PixelRatio,
ActivityIndicatorIOS,
} from 'react-native';


import Dimensions from "Dimensions";
module.exports = {
	/* get  最小线宽*/

	pixel : 1 / PixelRatio.get(),

	/* 获取屏幕尺寸*/

	size:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height


	},
	/* 获取loading 效果 */
	loading : <ActivityIndicatorIOS
	  animating={true}
	  color={'#3EooFF'}
	  style={{marginTop:40,marginLeft:Dimensions.get('window').width/2-10}} />
	

};