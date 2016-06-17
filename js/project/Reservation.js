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
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  DatePickerIOS,
  Picker,
  Animated,
  TextInput,
} from 'react-native';
import Dimensions from 'Dimensions';
import PixelRatio from 'PixelRatio';
import AreaChose from './AreaChose';
import WorkerList from './WorkerList';
import Util from '../common/util.js';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class Reservation extends Component{
	
	constructor(props)
	{
		super(props);
		this.state = {
		workername : '客服指派最优师傅',
		YMD : '',
		timezone:'',
		animated: true,
      	modalVisible: false,
      	transparent: true,
      	date:new Date(),
      	timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      	isYMD:false,
      	anim: new Animated.Value(0),
	};

	}
	_chosetimepicker(){

		this.setState({
			modalVisible: true,
			isYMD : true,
		});


	}
	chosetimezone(){

		
 	Animated.spring(this.state.anim,{
      velocity:10,
      tension:-8,
      friction:3,
      toValue:1,
    }).start();
		 this.setState({
			modalVisible: true,
			isYMD : false,
		});
	}
	
	choseworker(name){

		var _this = this;
		this.props.navigator.push({
			component:<WorkerList name={name} getworkername={(workername)=>{

          		_this.setState({

          			workername :workername,
          		});

          	}}/>,
			title:name,
			
		});
	}
	onDateChange(date)
	{

		 this.setState({date: date});


	}
	cancelButtonPressed(){

		 this.setState({modalVisible: false});

	}
	confirmButtonPressed(){


		this.setState({
			YMD:this.state.date.toLocaleDateString(),
			modalVisible: false,

		})

	}
	componentDidMount(){

   

  }
	_gettimezone(time){

		
	Animated.spring(this.state.anim,{
      velocity:10,
      tension:-8,
      friction:3,
      toValue:2,
    }).start();
    let _this = this;
    setTimeout(()=>{
    	_this.setState({

			modalVisible: false,
			timezone : time,
		});

    },200);
    
	}
	render(){
		var modalBackgroundStyle = {
			backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff'
		};
		return (
			<ScrollView style={styles.scrollView}
          		automaticallyAdjustContentInsets={true}
          		snapToAlignment={'center'}
        	>
		<Modal
			  ref="doortime"
	          animated={false}
	          transparent={this.state.transparent}
	          visible={this.state.modalVisible}>
	          {this.state.isYMD ? 
	          	 <View style={[styles.container, modalBackgroundStyle]}>
			        <View style={styles.comtents}>
			        <DatePickerIOS
			          date={this.state.date}
			          minuteInterval={10}
			          mode={'date'}
			          style={styles.datapicker}
			          onDateChange={this.onDateChange.bind(this)}

			           />
			           <View style={styles.buttonchose}>
				        <TouchableWithoutFeedback onPress={this.cancelButtonPressed.bind(this)}>

							<Text style={styles.canclebt}>取消</Text>
				
				        </TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={this.confirmButtonPressed.bind(this)}>

							<Text style={styles.confirm}>确定</Text>
				
				        </TouchableWithoutFeedback>

					</View>
				</View>
	      	</View> 
	      	:
	      	 <View style={[styles.container, modalBackgroundStyle]}>
			        <Animated.View style={[styles.comtents,styles.duan,,{

          transform:[
          {

            translateX:this.state.anim.interpolate({
              inputRange:[0,1,2],
              outputRange:[-width,0,width*2],
            }),
           
          },
          {
            skewX:this.state.anim.interpolate({

              inputRange:[0,1],
              outputRange:['30deg','0deg'],

            })
          },
         ]

        }]}>
			       
				        <Text style={styles.title}>时间</Text>
				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={styles.touch}
							onPress={this._gettimezone.bind(this,'全天')}
				        >
							<Text style={styles.choise}>全天</Text>
				        </TouchableHighlight>
				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,}]}
							onPress={this._gettimezone.bind(this,'8:00-10:00')}
				        >
							<Text style={styles.choise}>8:00-10:00</Text>
				        </TouchableHighlight>


				         <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,}]}
							onPress={this._gettimezone.bind(this,'10:00-12:00')}
				        >
							<Text style={styles.choise}>10:00-12:00</Text>
				        </TouchableHighlight>
				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,}]}
							onPress={this._gettimezone.bind(this,'12:00-14:00')}
				        >
							<Text style={styles.choise}>12:00-14:00</Text>
				        </TouchableHighlight>

				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,}]}
							onPress={this._gettimezone.bind(this,'14:00-16:00')}
				        >
							<Text style={styles.choise}>14:00-16:00</Text>
				        </TouchableHighlight>

				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,}]}
							onPress={this._gettimezone.bind(this,'16:00-18:00')}
				        >
							<Text style={styles.choise}>16:00-18:00</Text>
				        </TouchableHighlight>

				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,}]}
							onPress={this._gettimezone.bind(this,'18:00-20:00')}
				        >
							<Text style={styles.choise}>18:00-20:00</Text>
				        </TouchableHighlight>

				        <TouchableHighlight 
				        	activeOpacity={0.7}
							underlayColor='#828282'
							style={[styles.touch,{marginTop:10,backgroundColor:'#4682b4'}]}
							onPress={this._gettimezone.bind(this,'')}
				        >
							<Text style={styles.choise}>取消</Text>
				        </TouchableHighlight>

			        </Animated.View>

			</View>
	          }
			       
      	</Modal>
			 <View style={styles.orderinfo}>
				<Text style={styles.ss}>订单信息</Text>
				<View style={styles.line}></View>
				<Text style={styles.orderinfoitem}>服务项目： {this.props.name}</Text>
				<Text style={styles.orderinfoitem}>参考价格： 点击服务介绍查看</Text>
				<Text style={styles.orderinfoitem}>温馨提示： 具体服务和配件价格与师傅商定</Text>
			</View>
			<Text style={styles.tips}>请完善您的服务信息</Text>
			<TouchableWithoutFeedback onPress={this._chosetimepicker.bind(this)}>
			<View style={styles.time}>
				<Image style={styles.im} source={require('image!time')}/>
				<Text style={styles.chosetime}>上门时间：</Text>
				<Text style={styles.pretime}>{this.state.YMD}
                </Text>		
			</View>
			</TouchableWithoutFeedback>
			<View style={styles.line2}></View>
			<TouchableWithoutFeedback onPress={this.chosetimezone.bind(this)}>
			<View style={styles.time}>
				<Image style={styles.imm} source={require('image!time')}/>
				<Text style={styles.chosetime}>选择时间段：</Text>	
				<Text style={styles.pretime}>{this.state.timezone}</Text>	
			</View>
			</TouchableWithoutFeedback>
			<View style={styles.choseworker}>
			<TouchableWithoutFeedback onPress={this.choseworker.bind(this,this.props.name)}>
			<View style={styles.time}>
				<Image style={styles.imm} source={require('image!shifu')}/>
				<Text style={styles.chosetime}>服务师傅：</Text>
				<Text style={styles.chosetime}>{this.state.workername}</Text>		
			</View>
			</TouchableWithoutFeedback>
			
			</View>
		 </ScrollView>
		);



	}

}
const styles = StyleSheet.create({
	title:{
		fontSize:16,
		textAlign:'center',
		marginTop:20,

	},
	touch:{
		backgroundColor:'#ff6347',
		marginLeft:10,
		marginRight:10,
		paddingTop:5,
		height:30,
		marginTop:20,
		borderRadius:5,
	},
	choise:{
		textAlign:'center',
		color:'#fff',
		lineHeight:16,
	},
	duan:{

		width:Util.size.width*0.7,
		marginLeft:Util.size.width*0.15,
		paddingBottom:30,


	},
	canclebt:{
	width:100,
	height:30,
	textAlign:'center',
	borderRadius:5,
	borderWidth:Util.pixel,
	lineHeight:20,
	borderColor:'#e8e7e9',
	color:'#cccccc',
	},
	confirm:{
	width:100,
	height:30,
	textAlign:'center',
	borderRadius:5,
	borderWidth:Util.pixel,
	lineHeight:20,
	borderColor:'#66cdaa',
	color:'#66cdaa',
	},
	buttonchose:{
		flexDirection:'row',
		justifyContent: 'space-around',
		paddingBottom:25,
		backgroundColor:'#fff',

	},
	comtents:{

		borderRadius:10,
		backgroundColor:'#fff',

	},
	datapicker:{
		
		backgroundColor:'#fff',

	},
	pretime:{
	marginTop:18,
	marginLeft:10,
	color:'#6a6a6a',

	},
	container: {
    flex: 1,
    justifyContent: 'center',
    
  },
	im:{
	width:18,
	height:18,
	marginLeft:30,
	marginTop:20,

	},
	imm:{
		width:18,
		height:18,
		marginLeft:30,
		marginTop:15
		},
	immm:{

		width:18,
		height:18,
		marginLeft:30,
		marginTop:15
	},
	ss:{
		fontSize:18,
		color:'#6a6a6a',
		marginLeft:30,
		marginTop:15,
	},
	scrollView:{
	backgroundColor:'#eaeaea',
	flex:1,
	},
	orderinfo:{

		backgroundColor:'#ffffff',
		width:width,
		

	},
	line:{
		borderBottomWidth:1 / PixelRatio.get(),
		borderColor:'#dddcdc',
		width:width*0.8,
		marginLeft:width*0.1,
		marginTop:15,
	},
	line2:{
		borderBottomWidth:1 / PixelRatio.get(),
		borderColor:'#dddcdc',
		width:width*0.8,
		marginLeft:width*0.1,
		marginTop:0,
	},
	orderinfoitem:{
		fontSize:13,
		color:'#6a6a6a',
		paddingTop:8,
		paddingBottom:8,
		marginLeft:30,

	},
	tips:{
		fontSize:15,
		color:'#6a6a6a',
		marginLeft:30,
		paddingTop:15,
		paddingBottom:15,

	},
	time:{
		backgroundColor:'#fff',
		height:50,
		width:width,
		flexDirection:'row',

	},
	chosetime:{
		fontSize:13,
		color:'#6a6a6a',
		marginTop:20,
		marginLeft:8,

	},
	choseworker:{
		marginTop:10,
		flexDirection:'row',
		backgroundColor:'#fff',
		flex:1,


	}



});