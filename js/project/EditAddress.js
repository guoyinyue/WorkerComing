'use strict'
import React,{
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Component,
  TextInput,
  PickerIOS,
  AsyncStorage
} from 'react-native';
import PixelRatio from 'PixelRatio';
import Utils from '../common/util';
import Region from './region';
export default class EditAddress extends Component {

    constructor(props){
        super(props);
        this.state={
          areainfo:'',
          isshow:false,
          name:'',
          phone:'',
          address:'',
          province_:'',
          access_token:'',
          province:'',
          city:'',
          area:'',
          
        }
    }

    componentWillMount(){

     AsyncStorage.getItem('token').then((res)=>{
      this.setState({
        access_token:res,
      });
    });


    }
    /*
    
    选择地区
     */
    handleConfirm(parames){

      console.log(parames);
      this.setState({
        isshow:false,
        areainfo:parames.provinceName + ' ' + parames.cityName + ' ' + parames.areaName,
        city:parames.city,
        area:parames.area,
        province:parames.province,
      });


    }
    /*
    

    取消地区选择
     */
    
    handleCancle(){

      this.setState({

            isshow:false,

      });


    }
    chosearea(){

     this.setState({

      isshow:true,

     });


    }
    /*
    提交地址信息
     */
    saveAddress(){
       
      fetch('http://api.gujia007.com/v1/user-addresses?access-token=' + this.state.access_token,{
          method:'POST',
          headers: {  
                "Accept":"application/json",
                "Content-Type": "application/json"
              },
          body: JSON.stringify({
            "name":this.state.name,
            "province_id": "1",                                                     
            "city_id": "2",                                                        
            "district_id": "3",                                                     
            "address": this.state.address,                                      
            "phone": this.state.phone,                                               
            "is_d": 1               
            })

      }).then((res)=>{

        console.log(res);
        this.props.navigator.pop();

      }).catch((err)=>{

        console.log(err);

      });
    }

    render(){

        return (
          
          <ScrollView
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={true}
          alwaysBounceVertical={true}
          >
            <View>
                <View style={[styles.row,{marginTop:10,}]}>
                    <Text style={styles.item}>联系人：</Text>
                    <TextInput
                        onChangeText={(text)=>{
                          this.setState({
                              name:text,

                          });

                        }}
                        style={styles.input}
                        clearButtonMode={'while-editing'}
                        enablesReturnKeyAutomatically={false}
                        returnKeyType={'send'}
                        keyboardType={'default'}                        
                    />
                </View>
            </View>
               <View>
                  <View style={styles.row}>
                      <Text style={styles.item}>联系方式：</Text>
                      <TextInput
                          onChangeText={(text)=>{
                          this.setState({
                              phone:text,
                          });
                        }}
                          style={styles.input}
                          clearButtonMode={'while-editing'}
                          enablesReturnKeyAutomatically={false}
                          returnKeyType={'send'}
                          keyboardType={'numeric'}                        
                      />
                  </View>
                </View>
              
                  <View>
                      <TouchableHighlight
                          onPress={this.chosearea.bind(this)}
                          
                          underlayColor='#919191'> 
                            <View style={styles.row}>
                                <Text style={styles.item}>所在地区：</Text>
                                <TextInput
                                    value={this.state.areainfo}
                                    editable={false}
                                    style={styles.input}
                                    clearButtonMode={'while-editing'}
                                    enablesReturnKeyAutomatically={false}
                                    returnKeyType={'send'}
                                    keyboardType={'numeric'}                        
                                />
                            </View>
                      </TouchableHighlight>
                </View>
               
                      <View>
                                            
                          <View style={styles.row}>
                              <Text style={styles.item}>详细地址：</Text>
                              <TextInput
                                  onChangeText={(text)=>{
                                        this.setState({
                                        address:text,

                                        });

                                    }}
                                  style={styles.input}
                                  clearButtonMode={'while-editing'}
                                  enablesReturnKeyAutomatically={false}
                                  returnKeyType={'send'}
                                  keyboardType={'default'}                        
                              />
                          </View>                           
                      </View>
               <View>
                  
                </View>
                  
                    <TouchableHighlight
                        underlayColor='#919191'
                        onPress={this.saveAddress.bind(this)}
                        style={styles.savebt}>                     
                            <Text style={styles.saveword}>保存</Text>
                    </TouchableHighlight>
         
                    <Region
                      visible={this.state.isshow} 
                      selectedProvince={'110000'} 
                      selectedCity={'110100'} 
                      selectedArea={'110101'}
                      onSubmit={(parames)=>{
                          this.handleConfirm(parames);
                      }}
                      onCancel={this.handleCancle.bind(this)}
                    />
         
          </ScrollView>
          );

    }
}
const styles = StyleSheet.create({
  
  row:{
    flexDirection:'row',
    height:43,
    borderBottomWidth:1/PixelRatio.get(),
    borderColor:'#f5f4f9',
    backgroundColor:'#fff',
  },
  item:{
      fontSize:16,
      color:'#525558',
      paddingTop:14,
      paddingLeft:23,

  },
  input:{
    flex:1,
    textAlign:'left',
    fontSize:16,
    color:'#525558',
  },
  saveword:{
    fontSize:16,
    color:'#fff',
    textAlign:'center',
    paddingTop:15,
  },
  savebt:{
  width:Utils.size.width*0.9,
  height:45,
  backgroundColor:'#f9c158',
  borderRadius:5,
  overflow:'hidden',
  marginLeft:Utils.size.width*0.05,
  marginTop:130,


  },
});