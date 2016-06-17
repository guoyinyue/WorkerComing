/**
 * 省市区级联
 */
'use strict'
import React,{
  View,
  Text,
  Animated,
  PickerIOS,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Dimensions from "Dimensions";
import webapi from './webapi';
var win = Dimensions.get('window');
var HEIGHT = win.height;
var WIDTH = win.width;
//just do nothing
var noop = () => {};


var Region = React.createClass({
  getDefaultProps() {
    return {
      //默认不显示
      visible: false,
      //默认显示北京(省)
      selectedProvince: '1',
      //默认显示北京(市)
      selectedCity: '2',
      //默认显示(区)
      selectedArea: '3',
      //确定
      onSubmit: noop,
      //取消
      onCancel: noop
    }
  },


  /**
   * 改变新属性
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible != this.props.visible) {
      //开始动画
      Animated.spring(this.state.topValue, {
        toValue: nextProps.visible ? HEIGHT : 0,
        friction: 8,
        tension: 30
      }).start();
    }
  },


  componentWillMount() {
    //开始动画
    Animated.spring(this.state.topValue, {
      toValue: this.props.visible ? HEIGHT : 0,
      friction: 8,
      tension: 30
    }).start();
  },


  /**
   * 初始化状态
   */
  getInitialState() {
    return {
      //距离顶部的距离
      topValue: new Animated.Value(0),
      //省
      province: [],
      //市
      city: [],
      //地区
      area: [],
      //选中的省
      selectedProvince: this.props.selectedProvince,
      //选中的市
      selectedCity: this.props.selectedCity,
      //选中的地区
      selectedArea: this.props.selectedArea
    }
  },


  componentDidMount() {
    webapi
      .fetchRegionData()
      .then((data) => {
        //cache it.
    
        // var data2={
        //   '0':['中国','-1'],
        //   '1':['江苏','0'],
        //   '2':['南通市','1'],
        //   '3':['崇川区','2'],
        //   '4':['港闸区','2'],
        //   '13':['北京','0'],
        // '14':['北京市','13'],
        // '15':['东城区','14'],
        // '16':['西城区','14'],
        // '17':['朝阳区','14'],
        // '18':['丰台区','14'],
        // '19':['石景山区','14'],
        // '20':['海淀区','14'],
        // '21':['门头沟区','14'],
        // '22':['房山区','14'],
        // '23':['天津','0'],
        // '24':['天津市','23'],
        // '25':['和平区','24'],
        // '26':['河东区','24'],
        // '27':['河西区','24'],
        // '28':['南开区','24'],
        // '29':['河北区','24'],
        // '30':['红桥区','24'],
        // '31':['东丽区','24'],
        // '32':['西青区','24'],
        // '33':['津南区','24'],
        // '34':['北辰区','24'],
        // '35':['武清区','24'],
        // '36':['宝坻区','24'],
        // '37':['滨海新区','24'],
        // '38':['宁河县','24'],
        // '39':['静海县','24'],
        // '40':['蓟县','24'],
        // '41':['河北省','0'],
        // '42':['石家庄市','41'],
        // '43':['长安区','42'],
        // '44':['桥西区','42']
       
        // }
        this._data = data;

        //过滤省
        var province = this._filter('086');
        console.log(province);
        console.log(this._data[this.state.selectedProvince]);
        this._selectedProvinceName = this._data[this.state.selectedProvince][0];

        //过滤省对于的市
        var city = this._filter(this.state.selectedProvince);
         console.log(city);
        //市的名字
        this._selectedCityName = '';
        if (this.state.selectedCity) {
          this._selectedCityName = this._data[this.state.selectedCity][0];
        }

        //过滤第一个市对应的区
        var area = [];
        if (this.state.selectedCity) {
          area = this._filter(this.state.selectedCity);

          this._selectAreaName = '';
          if (this.state.selectedArea) {
            this._selectAreaName = this._data[this.state.selectedArea][0];
          }
        }

        this.setState({
          province: province,
          city: city,
          area: area
        });
      }).catch((err)=>{

          console.log(err);
      });
  },


  render() {
    return (
      <Animated.View ref='region' style={[styles.container, {
          top: this.state.topValue.interpolate({
            inputRange: [0, HEIGHT],
            outputRange: [HEIGHT, 0]
          })
        }]}>
        <View style={styles.region}>
          {/*头部按钮*/}
          <View style={styles.nav}>
            <TouchableOpacity onPress={this._handleCancel}>
              <Text style={styles.text}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleSubmit}>
              <Text style={styles.text}>确认</Text>
            </TouchableOpacity>
          </View>

          {/*省市区级联*/}
          <View style={styles.regionArea}>
            {/*省*/}
            <PickerIOS
              style={styles.regionItem}
              onValueChange={this._handleProvinceChange}
              selectedValue={this.state.selectedProvince}>
              {this.state.province.map((v, k) => {
                return (
                  <PickerIOS.Item value={v[0]} label={v[1]} key={k}/>
                );
              })}
            </PickerIOS>

            {/*市*/}
            <PickerIOS
              style={styles.regionItem}
              onValueChange={this._handleCityChange}
              selectedValue={this.state.selectedCity}>
              {this.state.city.map((v, k) => {
                return (<PickerIOS.Item value={v[0]} label={v[1]} key={k}/>);
              })}
            </PickerIOS>

            {/*区*/}
            <PickerIOS
              style={styles.regionItem}
              onValueChange={this._handleAreaChange}
              selectedValue={this.state.selectedArea}>
              {this.state.area.map((v, k) => {
                return (<PickerIOS.Item value={v[0]} label={v[1]} key={k}/>);
              })}
            </PickerIOS>
          </View>
        </View>
      </Animated.View>
    );
  },


  /**
   * 处理省的改变
   */
  _handleProvinceChange(province) {
    //设置选中的省的名称
    this._selectedProvinceName = this._data[province][0];

    if (__DEV__) {
      console.log('省发生改变:', province, this._selectedProvinceName);
    }

    //过滤出改变后，省对应的市
    var city = this._filter(province);
    //省下面没有市，包括台湾，香港，澳门
    if (city.length === 0) {
      this._selectAreaName = '';
      this._selectedCityName = '';

      this.setState({
        selectedProvince: province,
        selectedCity: '',
        selectedArea: '',
        city: [],
        area: []
      });
    } else {
      this._selectedCityName = city[0][1];
      //过滤区域
      var area = this._filter(city[0][0]);
      //区域名称
      this._selectAreaName = area[0][1];

      this.setState({
        selectedProvince: province,
        selectedCity: city[0][0],
        selectedArea: area[0][0],
        city: city,
        area: area,
      });
    }
  },


  /**
   * 处理市改变
   */
  _handleCityChange(city) {
    this._selectedCityName = this._data[city][0];

    if (__DEV__) {
      console.log('市发生改变:', city, this._selectedCityName);
    }

    //过滤出市变化后，区
    var area = this._filter(city);
    if (area.length === 0) {
      this._selectAreaName = '';
      this.setState({
        selectedCity: city,
        selectedArea: '',
        area: []
      });
    } else {
      this._selectAreaName = area[0][1];

      this.setState({
        selectedCity: city,
        selectedArea: area[0][0],
        area: area
      });
    }
  },


  /**
   * 处理区域改变
   */
  _handleAreaChange(area) {
    this._selectAreaName = this._data[area][0];

    if (__DEV__) {
      console.log('区域发生改变:', area, this._selectAreaName);
    }

    this.setState({
      selectedArea: area
    })
  },


  /**
   * 处理取消
   */
  _handleCancel() {
    this.props.onCancel()
  },


  /**
   * 处理确定
   */
  _handleSubmit() {
    this.props.onSubmit({
      province: this.state.selectedProvince,
      city: this.state.selectedCity,
      area: this.state.selectedArea,
      provinceName: this._selectedProvinceName,
      cityName: this._selectedCityName,
      areaName: this._selectAreaName
    })
  },


  /**
   * 根据pid查询子节点
   */
  _filter(pid) {
    var result = [];

    for (var code in this._data) {
      if (this._data.hasOwnProperty(code)
          && this._data[code][1] === pid) {
        result.push([code, this._data[code][0]]);
      }
    }

    return result;
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT/2,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  nav: {
    height: 50,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9c158',
    flexDirection: 'row'
  },
  text: {
    color: '#6a6a6a',
    fontSize: 16,
   
  },
  region: {
    flex: 1,
    marginTop: HEIGHT/4,
    backgroundColor: '#f5f4f9',
  },
  regionArea: {
    flexDirection: 'row',
    backgroundColor:'#f5f4f9',
  },
  regionItem: {
    flex: 1
  }
});


module.exports = Region;
