'use strict'
import React,{
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  NavigatorIOS,
  Component,
  TextInput,
  TouchableHighlight,
  AlertIOS,
  AsyncStorage,
} from 'react-native';
import PixelRatio from 'PixelRatio';
export default class Login extends Component {
	constructor(args) {
		// code
		super(args);
		this.state = {
			activecolor:'#b7babf',
			tel:require('image!telbefore'),
			password:require('image!passwordbefore'),
			passwordactivecolor:'#b7babf',
			tips:'发送验证码',
			disabled:false,
			fontSize:17,
			yanzhengma:'',
			telnum:'',
		}
	}
	componentWillMount(){
		this.wait = 30;
		this.getYZM='';
	}

	async updateToken(value) {
     	  await AsyncStorage.setItem('token',value);
     	}
 	async updateUser(value) {
 	  await AsyncStorage.setItem('user',value);
 	}

	handleFocus(type){
		if(type === 'tel'){
			this.setState({
				password:require('image!passwordbefore'),
				passwordactivecolor:'#b7babf',
				tel:require('image!telafter'),
				activecolor:'#f9c158',
			})
		}  

		if(type === 'password') {

			this.setState({
				activecolor:'#b7babf',
				tel:require('image!telbefore'),
				password:require('image!passwordafter'),
				passwordactivecolor:'#f9c158',
				
				
			})

		}
	}
	 
	handleBlur(){		
			this.setState({
				activecolor:'#b7babf',
				passwordactivecolor:'#b7babf',
				tel:require('image!telbefore'),
				password:require('image!passwordbefore'),
			})
	}
	shouldComponentUpdate(){
		
		return true;

	}
	componentWillReceiveProps(){
		

	}
	componentWillUpdate(){
		


	}
	componentDidUpdate(){	
		
	}

	/*
	
	计时器函数

	 */
	sendMessage(){
		
		this.setState({
			disabled:true,
			tips:'请在' + this.wait + '秒内输入验证码',
			fontSize:12,
		});
        this.timer = setInterval(this.SetRemainTime.bind(this), 1000);
        fetch('http://api.gujia007.com/v1/site/sendcode',{
        	method:'POST',
        	headers: {	
        				"Accept":"application/json",
						"Content-Type": "application/json"
  						},
 			 body: JSON.stringify({"phone":this.state.telnum})
        	}).then((res)=>{

        	console.log(res);
        	

        })
	}

	SetRemainTime() {
	 	if (this.wait == 0) {         
         clearInterval(this.timer);
           this.wait = 30;	                      
	        this.setState({
	        	tips:'重新发送验证码',
	        	disabled:false,
	        	fontSize:12,
	        }); 
        }else{
	        	this.wait--;
	        	this.setState({
	        		tips:'请在'+this.wait+'内输入验证码',
	        		fontSize:12,

	        	});

        }

	}
	//短信验证码验证
	validateandlogin(){


		fetch('http://api.gujia007.com/v1/site/login?expand=access_token',{
        	method:'POST',
        	headers: {	
        				"Accept":"application/json",
						"Content-Type": "application/json"
  						},
 			body: JSON.stringify({
 			 	"phone":this.state.telnum,
 			 	"smscode":this.state.yanzhengma

 				})
        	}).then((res)=>{
        		
        		let resultcode = JSON.parse(res.status);
        		if(resultcode == '200'){
        			let ress = JSON.parse(res._bodyText);
        			console.log(ress.access_token);
        			this.updateToken(ress.access_token);
        			this.updateUser(ress.phone);
        			this.props.getLoginStatus(true,this.state.telnum,true);
        			this.props.navigator.pop();

        		}else{

        			AlertIOS.alert('提示','验证信息有误');
        		}

        	},()=>{

        		alert("出错了!");

        	})
	}
	/*
	
		防止在记时的时候回退未及时清理定时器
	 */
	componentWillUnmount(){

		if(this.timer){
			clearInterval(this.timer);			
		}


	}
	changeText(text){
		 this.setState({

		 	yanzhengma:text,
		 });
		}
	shouldComponentUpdate(){


		return true;

	}
	gettelnum(text){
		this.setState({

		 	telnum:text,
		});

	}
	render(){

		return (
			<View style={{backgroundColor:'#fff',flex:1,flexDirection:'column'}}>
				<View style={{flexDirection:'row',}}>
					<View style={[styles.telnum,{borderColor:this.state.activecolor,}]}>
						<View style={{backgroundColor:'#f0f2f5',flex:1,}}>
							<Image
							  style={styles.tel}
							  source={this.state.tel} />
							
						</View>
						<View style={{backgroundColor:'#fff',flex:4,}}>
							<TextInput
								onChangeText={(text)=>{this.gettelnum(text)}}
								style={styles.telinput}
								clearButtonMode={'while-editing'}
								enablesReturnKeyAutomatically={false}
								returnKeyType={'send'}
								keyboardType={'numeric'}
								placeholder={'请输入手机号码'}
								placeholderTextColor={'#b8c4ce'}
								onFocus={this.handleFocus.bind(this,'tel')}
								onBlur={this.handleBlur.bind(this)}
							/>
						</View>

					</View>
					<View style={{flex:1,marginRight:20,marginTop:45,marginLeft:5,}}>

						<TouchableHighlight 
							
		      				disabled={this.state.disabled}
							onPress={this.sendMessage.bind(this)}
							style={{borderRadius:5,overflow:'hidden'}}
							underlayColor='#696969'
							>
						  <Text style={[styles.send,{fontSize:this.state.fontSize}]}>
							{this.state.tips}
						  </Text>
						</TouchableHighlight>
					</View>

				</View>
				<View style={[styles.password,{borderColor:this.state.passwordactivecolor,}]}>
					<View style={{backgroundColor:'#f0f2f5',flex:1,}}>
						<Image
						  style={styles.tel}
						  source={this.state.password} />
							
					</View>
					<View style={{backgroundColor:'#fff',flex:7,}}>
							<TextInput
								ref={(textinput)=>{this._textinput = textinput;}}
							  	blurOnSubmit={true}
							  	onChangeText={(text)=>{this.changeText(text)}}
								style={styles.telinput}
								clearButtonMode={'while-editing'}
								enablesReturnKeyAutomatically={false}
								returnKeyType={'done'}
								keyboardType={'numeric'}
								placeholder={'请输入短信中的验证码'}
								placeholderTextColor={'#b8c4ce'}
								onFocus={this.handleFocus.bind(this,'password')}
								onBlur={this.handleBlur.bind(this)}
							/>
					</View>	
				</View>

				<View style={styles.submitdiv}>
					<TouchableHighlight
					  onPress={this.validateandlogin.bind(this)}
					  disabled={false}
					  style={{height:45}}
					  underlayColor='#FFB90F'>
					  <Text style={styles.submit}>验证并登陆</Text>
					</TouchableHighlight>
				</View>
		</View>
			);
	}
}	
const styles = StyleSheet.create({

	telnum:{
		flex:1.8,
		height:45,
		borderRadius:5,
		// borderColor:'#f9c158',
													
		borderWidth: 1 / PixelRatio.get(),
		marginTop:45,
		marginLeft:20,
		flexDirection:'row',
		overflow:'hidden',

	},
	tel:{
		width:21,
		height:21,
		marginTop:10,
		marginLeft:10,
	},
	telinput:{
		flex:1,
		borderWidth:0,
		backgroundColor:'#fff',
		fontSize:16,
		paddingLeft:10,
		color:'#6a6a6a',
	},
	send:{		
		backgroundColor:'#a0a0a0',
		height:45,
		textAlign:'center',
		color:'#fff',
		paddingTop:14,
	},
	password:{
		marginLeft:20,
		marginTop:30,
		marginRight:20,
		flexDirection:'row',
		height:45,
		borderWidth: 1 / PixelRatio.get(),
		borderRadius:5,
		overflow:'hidden',
	},
	submit:{

		textAlign:'center',
		color:'#fff',
		fontSize:16,
		paddingTop:15,
	},
	submitdiv:{
		height:45,
		backgroundColor:'#f9c158',
		borderRadius:5,
		marginTop:45,
		marginLeft:20,
		marginRight:20,
		overflow:'hidden',
	}
});