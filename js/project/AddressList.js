'use strict'
import React,{
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  NavigatorIOS,
  Component,
  AsyncStorage,
  AlertIOS,
  ListView
} from 'react-native';
import PixelRatio from 'PixelRatio';
import Utils from '../common/util.js';
import Swipeout from 'react-native-swipeout';
import EditAddress from './EditAddress';
import AreaChose from './AreaChose';

export default class AddressList extends Component {

    constructor(props){
        super(props);
        this.state={
            access_token:'',
            addresslists:[],
            dataSource: new ListView.DataSource({

            rowHasChanged: (r1, r2) => r1 !== r2

            }),
        }
    }

    componentWillMount(){

    


    }
    componentDidMount(){

      AsyncStorage.getItem('token').then((res)=>{
      this.setState({
        access_token:res,
      });
      fetch('http://api.gujia007.com/v1/user-addresses?access-token=' + this.state.access_token).then((res)=>{
        var addresslists = JSON.parse(res._bodyText).items;
        this.setState({

            addresslists:addresslists,
            dataSource: this.state.dataSource.cloneWithRows(addresslists),
        });
        // console.log(addresslists);
      }).catch((error)=>{
          console.log(error);
          alert('fetch data failed');
      }); 
    }).catch((err)=>{

          alert('get access_token failed');
    });
    }

    handleUpdate(parames){

      console.log(parames);
    }
    renderRow(addresslist){
        let self = this;
        let swipeoutBtns = [
        {
          text: '修改',
          backgroundColor: '#f9c158',
          color: '#fff',
          underlayColor: "#FF3030",
          onPress:self.handleUpdate.bind(this,addresslist),
        },
        {
          text: '删除',
          backgroundColor: '#FF0000',
          color: '#fff',
          underlayColor: "#FF3030",
        }
        ];
        return (
          <View style={{marginTop:19,overflow:'hidden'}}>
            <Swipeout right={swipeoutBtns}>
            <View style={styles.row}>
                <View style={styles.firstline}>
                    <Text style={styles.name}>{addresslist.name}</Text>
                    <Text style={styles.phone}>{addresslist.phone}</Text>
                </View>
                <View>
                  <Text style={styles.dizhi}>{addresslist.province+addresslist.city+addresslist.district+addresslist.address}</Text>
                </View>

            </View>
            </Swipeout>
          </View>
          );


    }
    getAddlist(addresslists){
      
        return (<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />);
       
    }


    addaddress(){

      this.props.navigator.push({
        title:'编辑服务地址',
        component:<EditAddress />

      });


    }
    render(){
      return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}>
        <View style={styles.bk}>
          {this.state.addresslists.length > 0 ? this.getAddlist(this.state.addresslists) : <View/>}
          <View style={styles.address}>
              <TouchableHighlight
                onPress={this.addaddress.bind(this)}
                style={styles.touch}
                underlayColor='#919191'>
                <Text style={styles.addwords}>添加新地址</Text>
              </TouchableHighlight>
          </View>
        </View>
        </ScrollView>
      );

    }
}

const styles = StyleSheet.create({

  bk:{
  
  },

  scrollview:{


  },
  addressitem:{
    backgroundColor:'red',

  },
  address:{
    width:Utils.size.width*0.9,
    marginLeft:Utils.size.width*0.05,
    marginRight:Utils.size.width*0.05,
    marginTop:90,
    backgroundColor:'#f9c158',
    borderRadius:5,
    height:45,
    overflow:'hidden',
    
  },
  touch:{
    height:45,
  },
  addwords:{
    fontSize:16,
    color:'#fff',
    textAlign:'center',
    paddingTop:15,
  },
  row:{
   
    backgroundColor:'#fff',
    flexDirection:'column',
  },
  name:{

    fontSize:16,
    color:'#525558',
    paddingTop:11,
    paddingLeft:14,
    flex:1,
  },
  firstline:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  phone:{
    fontSize:16,
    color:'#525558',
    paddingTop:11,
    flex:1,
    textAlign:'right',
    paddingRight:49,

  },
  dizhi:{
  width:Utils.size.width*0.9,
  marginLeft:14,
  marginTop:10,
  paddingBottom:10,
  fontSize:13,
  color:'#6a6a6a',
  },
});