
'use strict'
 import React,{
  StyleSheet,
  Text,
  View,
  Image,
  Component,
  TouchableHighlight,
  AlertIOS,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';
import PixelRatio from 'PixelRatio';
import Dimensions from 'Dimensions';
import AreaChose from './AreaChose';
import ServiceTypeItem from './ServiceTypeItem';
import NavBar from '../common/NavBar';
var width = Dimensions.get('window').width;
export default class ServiceType extends Component{

		constructor(props){
			super(props);
			this.state ={
				categoryrow : [],				
				cells:[],
			}
		}

		onPressButton(name,id){
			this.props.navigator.push({
				component:<ServiceTypeItem uri={'http://apitest.shifukuailai.com/cate/view/'+id} type={name} />,	        
	        	title:name,	 
			});

		}
		renderserviceItems(root){
			let serviceItems = new Array();
			this.state.cells.map((item,i)=>{

					if(item.root == root){

						serviceItems.push(item);
					}

			});
			return serviceItems.map((item,i)=>{

					return( 
							<TouchableHighlight  key={i} activeOpacity={0.9} underlayColor={'#ccc6c6'} onPress={this.onPressButton.bind(this,item.name,item.id)}>
								<View  style={styles.item}>
									
									<Image source={{uri:item.upload_img}} style={styles.itemicon} />
									<Text style={[styles.itemname,{color:item.color}]}>{ item.name }</Text>
									
								</View>
							</TouchableHighlight>
						);
			});
		}
		rendercategory(data){


			return data.map((item,i)=>{

					return (
						<View key={i}>
						<View style={styles.cat} >
							<Image source={{uri:item.iconurls}} style={styles.icon} />
							<Text style={styles.cattitle}>{ item.cate_title }</Text>	
						</View>
						<View style={styles.itemwraper} >
							{this.renderserviceItems(item.root)}
						</View>
						</View>

						);


				});



		}
		render(){
				let data = this.state.categoryrow;
					return (
							<View>
								{this.rendercategory(data)}
							</View>
						);
							
											
				}
		componentDidMount(){
				fetch('http://api.gujia007.com/v1/cates?expand=root,lft,rgt,lvl,upload_img,color,mark')
					.then((res)=>{
						let datasource = JSON.parse(res._bodyText);
						let categoryrow =new Array();
						let cells =new Array();
						  datasource.forEach(
							(value,i,a)=>{
								if(value.lvl == 0){

									categoryrow.push({'cate_title':a[i].name,'iconurls':a[i].upload_img,'color':a[i].color,'root':a[i].root}); 	
								}else{

									cells.push(a[i]);
									

								}
							});

						  this.setState({
						  			categoryrow :categoryrow,
						  			cells : cells,
						  });
				
					});
					
		}
}
const styles = StyleSheet.create({
	cat : {
		borderColor:'#dddcdc',
		flex:1,
		flexDirection:'row',
		height:28,
		borderBottomWidth:1 / PixelRatio.get(),
		
	},
	icon :{
		width:18,
		height:18,
		marginLeft:18,
		marginTop:5,

	},
	itemicon:{

		width:25,
		height:25,
		marginLeft:20,
		marginTop:18,
	},
	cattitle:{
	fontSize:14,
	lineHeight:20,
	marginLeft:7,
	color:'#696969',
	},
	item:{
		height:60,
		width:width/2,
		backgroundColor:'#fff',
		flexDirection:'row',
		borderColor:'#dddcdc',
		borderBottomWidth: 1 / PixelRatio.get(),
		borderRightWidth: 1 / PixelRatio.get(),
	},
	itemname:{
		fontSize:14,
		marginLeft:10,
		lineHeight:35,
	},
	itemwraper:{

		flexWrap:'wrap',
		justifyContent:'flex-start',
		flexDirection:'row',


	},
	swrap:{
		flexDirection:'row',
		flexWrap:'wrap',
	}

});