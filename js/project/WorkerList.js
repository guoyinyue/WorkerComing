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
  ListView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import AreaChose from './AreaChose.js';
import Util from '../common/util.js';
const styles = StyleSheet.create({

	container:{

    flex:1,
    backgroundColor:'#fff',
  },
  itemrow:{

    flexDirection:'row',
    flex:1,
    height:84,
    borderBottomWidth:0.5,
    borderColor:'#dcdcdc',

  },
  workerlogo:{
    width:64,
    height:64,    
      resizeMode: 'contain',
      borderRadius:8,
      marginTop:10,
      marginLeft:15,
      marginRight:10,
  },
  baseinfo:{

    flex:1,
    flexDirection:'column',
  },
  name:{
    color:'#5c5b5b',
    fontSize:16,
    marginTop:20,
    fontWeight:'normal',

  },
  span1:{

    color:'#4f4d4d',
    fontSize:12,
    marginBottom:3,
    marginTop:3,
  },
  span2:{

    color:'#4f4d4d',
    fontSize:12,
    
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

  },
  loadingText: {
    fontSize: 14,
    marginBottom: 20,
    justifyContent: 'center',
    textAlign:'center',
    marginTop:20,

  },
  refreshview:{
     marginTop : 100,

  },
   
  refresh:{
    marginTop:30,
   flex:1,
  },

});
export default class WorkerList extends Component {
	constructor(props) 
	{
		// code
		super(props);

		this.state = {
			 dataSource: new ListView.DataSource({

              rowHasChanged: (r1, r2) => r1 !== r2

              }),
			 show:false,
		};
	}

	// methods
	componentDidMount()
	{

	fetch('http://api.gujia007.com/v1/worker/search')
      .then((res) => {
      var workerlist = new Array();
      let datasource = JSON.parse(res._bodyText).items;

                for(let item of datasource){
               
                    workerlist.push(item);                   
                }
                return workerlist;

    }).then((workerlist)=>{
      			
      			console.log(workerlist);
                this.setState({
                   dataSource: this.state.dataSource.cloneWithRows(workerlist),
                   show:true,
                  
                });
                
        });
	}
	comeback(workername)
	{
			this.props.getworkername(workername);
		
			this.props.navigator.pop();
			

	}
	renderRow(workerinfo)
	{     
    return (
      <TouchableWithoutFeedback onPress={this.comeback.bind(this,workerinfo.name)}>
        <View style={styles.itemrow}>
          <Image style={styles.workerlogo} source={{uri:workerinfo.workerimgurl}}/>
          <View style={styles.baseinfo}>
            <Text style={styles.name}>{workerinfo.name}</Text>
            <Text style={styles.span1}>工号：{workerinfo.worker_number}工龄：10年</Text>
            <Text style={styles.span2}>标签：水电 门类 五金 厨卫</Text>
          </View>
        
        </View>
      </TouchableWithoutFeedback>
      );
  }
	
  	render()
  	{
	    
    return (
    	<ScrollView>
    	  
    	
    	{	
    		this.state.show ? 
    		<ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
    		:
    		Util.loading
    	}
        </ScrollView>
        );	
 	}
		


		
}
