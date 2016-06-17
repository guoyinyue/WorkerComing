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
} from 'react-native';
import PixelRatio from 'PixelRatio';
import Utils from '../common/util';
import AreaChose from './AreaChose';
import Login from './Login.js';
import AddressList from './AddressList';
export default class PersonnalCenter extends Component{

	constructor(props){
		super(props);
		this.state={

			isLogin:false,
			user:'',
			disabled:false,
			access_token:'',
		}

	}
	componentWillMount(){
		this.getToken();
		this.getUser();
	
	}
	shouldComponentUpdate(){
		
		return true;

	}
	componentWillReceiveProps(){
		console.log('second-componentWillReceiveProps happened');
		AsyncStorage.getItem('token').then((res)=>{
			this.setState({
				access_token:res,

			});
		});

	}
	componentWillUpdate(){
		
		


	}
	componentDidUpdate(){

		
	}
	async getToken() {
      		var new_token = await AsyncStorage.getItem('token');
      		if(new_token){
	      		this.setState({
	      			access_token : new_token,
	      			disabled:true,
	      			isLogin:true,
	      		});
     		}
    	}

	async getUser() {
  			var user = await AsyncStorage.getItem('user');
 			this.setState({
      			user ,
      		});

		}
	getserviceaddress(){
		
		if(this.state.access_token){
				this.props.navigator.push({

					title:'管理地址',
					component:<AddressList navigator={this.props.navigator} />

				});

		}else{

			alert("先登陆");
		}
	}


	getorderinfo(){

		if(this.state.access_token){


			}else{

				alert("先登陆");
			}

	}
	Login(){


		this.props.navigator.push({

			title:'登陆',
			component:<Login navigator={this.props.navigator} getLoginStatus={(isLogin,user,disabled)=>{
				var _this = this;
				_this.setState({

					isLogin,
					user,
					disabled,
				});




			}} />


		});

	}
	
	render(){
	
		return(
			<View>
				<TouchableWithoutFeedback onPress={this.Login.bind(this)} disabled={this.state.disabled}>
					<View style={styles.topbk}>
						<View style={{flex:1,}}>
							<Image
							  style={styles.personbk}
							  source={require('image!personbk')} />
						</View>
						<View style={{position:'absolute',top:32,left:40,borderRadius:32.5,overflow:'hidden',width:65,height:65,}}>
						<Image
						  style={styles.logo}
						  source={require('image!logo')} 
						  defaultSource={require('image!logo_no')}
						  />
						 
						</View>
						{this.state.isLogin ? (
							<View style={{position:'absolute',top:47,left:123,backgroundColor:'transparent',}}>
								<Text style={styles.prelogin}>{this.state.user}</Text>
								<Text style={styles.welcome}>欢迎使用师傅快来</Text>
							</View>
							):
						(
							<View style={{position:'absolute',top:47,left:123,backgroundColor:'transparent',}}>
								<Text style={styles.prelogin}>请点击登陆</Text>
								<Text style={styles.welcome}>欢迎使用师傅快来</Text>
							</View>
						) 
						}
						

					</View>
				</TouchableWithoutFeedback>
				
				<ScrollView style={styles.scrollview}
					centerContent={true}
					automaticallyAdjustContentInsets={false}
				>

					
					<TouchableHighlight
					  onPress={this.getorderinfo.bind(this)}
					  underlayColor='#919191'>
					    <View style={styles.personlist}>
							<Image
							  style={styles.order}
							  source={require('image!serviceorder')} />
							<Text style={styles.listText}>服务订单</Text>
						</View>
					</TouchableHighlight>
					<View style={styles.seperate}>
					</View>
					<TouchableHighlight
					  	onPress={this.getserviceaddress.bind(this)}
					  	underlayColor='#919191'>
							<View style={styles.personlist}>
								<Image
								  style={styles.order}
								  source={require('image!address')} />
								<Text style={styles.listText}>服务地址</Text>

							</View>
					</TouchableHighlight>
				</ScrollView>			
			</View>
			);

	}

}
const styles = StyleSheet.create({

	topbk:{
		height:130,
		flexDirection:'column',
	},
	personbk:{
		height:130,
		resizeMode:'cover',
	},

	logo:{
		width:65,
		height:65,
		resizeMode:'contain',
	},

	prelogin:{
		fontSize:18,
		color:'#322e2e',

	},
	welcome:{
		marginTop:5,
		marginLeft:5,
		fontSize:10,
		color:'#716969',
	},
	scrollview:{
		backgroundColor:'#ffffff',
		marginTop:14,

	},
	personlist:{

	height:54,
	flexDirection:'row',
	backgroundColor:'#ffffff',
	
	},
	order:{
		width:21,
		height:21,
		marginTop:16,
		marginLeft:21,
	},
	listText:{

		fontSize:16,
		color:'#444444',
		marginLeft:17,
		marginTop:19,

	},
	seperate:{

		width:Utils.size.width*0.9,
		marginLeft:Utils.size.width*0.05,
		borderBottomWidth:1 / PixelRatio.get(),
		borderColor:'#e8e7e9',
	},
});