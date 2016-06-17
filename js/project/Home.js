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
import AreaChose from './AreaChose';
import  MyIndex from './MyIndex';
import HomePage from './HomePage';
import IndexTab from './IndexTab.js';
StatusBarIOS.setStyle('light-content');
export default class Home extends Component{


constructor(props){
      super(props);
        this.state = {

           selectedTab:'indexTab',

        };

    }

    render(){

      return(
    
         <TabBarIOS 
              tintColor="#f9c158" 
              barTintColor="#eeeeee"
           >
              <TabBarIOS.Item
                title="师傅快来"
              
                key="indexTab"
                icon={require('image!indexbefore')}
            
                selected={this.state.selectedTab ==='indexTab'}
                selectedIcon={require('image!indexafter')}
                onPress={
                    () => {
                      this.setState({
                           selectedTab:'indexTab',
                         });
                        }
                    }
                >
               
               <IndexTab navigator={this.props.navigator} /> 
               
              </TabBarIOS.Item>
                    


              <TabBarIOS.Item
              title="订单"
              key="orderTab"
              icon={require('image!orderlistbefore')}
              selected={this.state.selectedTab ==='orderTab'}
              selectedIcon={require('image!orderlistafter')}
              onPress={() => {
              this.setState({

                selectedTab:'orderTab',


              });
              }}>
              <View>
             <AreaChose text="南通" />
             </View>
              </TabBarIOS.Item>




              <TabBarIOS.Item
              title="我的主页"
              key="personalTab"
              icon={require('image!mybefore')}
              selected={this.state.selectedTab ==='personalTab'}
              selectedIcon={require('image!myafter')}
              onPress={() => {
              this.setState({

                selectedTab:'personalTab',


              });
              }}>
              <HomePage />
              </TabBarIOS.Item>


              <TabBarIOS.Item
              title="设置"
                    key="settingTab"
              icon={require('image!settingbefore')}
              selected={this.state.selectedTab ==='settingTab'}
              selectedIcon={require('image!settingafter')}
              onPress={() => {
              this.setState({

                selectedTab:'settingTab',


              });
              }}>
              <AreaChose text="南通" />
              </TabBarIOS.Item>
           </TabBarIOS>
      
        );


    }

}

const styles = StyleSheet.create({


  });