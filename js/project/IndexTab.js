'use strict';
import React, {
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
  Image,
  Component,
  StatusBarIOS,
  Navigator,
  TouchableOpacity
} from 'react-native';
import MyIndex from './MyIndex.js';
import NavBar from '../common/NavBar.js';
import PixelRatio from 'PixelRatio';
export default class IndexTab extends Component {
	getRouteMapper(){
  let routeMapper = {

      LeftButton: (route, navigator, index, navState)=>{
            if (index === 0) {
             return (
            <TouchableOpacity
              onPress={() => alert('目前只限南通地区')}
              style={styles.navBarLeftButton}>
              <Text style={[styles.navBarText, styles.navBarButtonText]}>
                南通市
              </Text>
            </TouchableOpacity>
          );
            }
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.navBarLeftButton}>
              <View style={styles.go}></View>
              
            </TouchableOpacity>
          );
     },
   
    RightButton: function(route, navigator, index, navState) { 
        if (index === 0) {
           return (
            <TouchableOpacity
              onPress={() => alert(index)}
              style={styles.navBarRightButton}>
              <Image source={require('image!tel')} style={styles.tel} />
            </TouchableOpacity>
          );
        }

          return null;
        },

        Title: (route, navigator, index, navState)=> {
            return (
              <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
              </Text>
            );
        },


    };

    return routeMapper;
}
	render()
	{
		return(
			 <Navigator          
              initialRoute={{
                title:'师傅快来',
                component:MyIndex,
              }}
              configureScene={(route) => {
                 return Navigator.SceneConfigs.FloatFromRight;
               }}
               navigationBar ={ <NavBar routeMapper={this.getRouteMapper()} /> }
               ref={(navigator) => {
                  this._navigator = navigator;
                  }}
               renderScene={
                (route,navigator)=>{
                  let Component = route.component;
                  
                  return (
                    
                        <Component {...route.params} navigator={this.props.navigator} route={route}/> 
                   
                    );
               }}

          />
			);



	}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
    color:'#fff',
    
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color:'#fff',
  },
  tel:{
  marginTop:7,
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
