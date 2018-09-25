import React, { Component } from 'react';

import { StyleSheet,SafeAreaView, Platform, View, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import styles from './StylesChung';

var Realm = require('realm');

let realm;

import { StackNavigator } from 'react-navigation';


export default class ShowDataActivity extends Component {
  static navigationOptions =
    {
      title: 'ShowDataActivity',
      header: null
    };

  constructor() {

    super();

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);

    //Định nghĩa bảng dữ liệu real
    realm = new Realm({
      schema: [{
        name: 'Student_Info',
        properties:
        {
          student_id: { type: 'int', default: 0 },
          student_name: 'string',
          student_class: 'string',
          student_subject: 'string'
        }
      }]
    });

    var mydata = realm.objects('Student_Info');

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(mydata),
    };

  }

  GetClickedItem(student_name) {

    Alert.alert(student_name);

  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  render() {
    //gọi màn hình mới
    const { navigate } = this.props.navigation;
    //sự kiện quay lại hoặc thoát màn hình hiện tại
    const { goBack } = this.props.navigation;

    return (
      <SafeAreaView>
      <View >
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.HeaderScreen}>
            <TouchableOpacity onPress={() => goBack()} >
              <Image style={styles.ImageBack} source={require('../images/back_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ViewOfTextHeader}>
            <Text style={styles.HeaderScreen} onPress={() => goBack()}>Danh sách chi tiết</Text>
          </View>
        </View>

        <ListView

          dataSource={this.state.dataSource}

          renderSeparator={this.ListViewItemSeparator}

          renderRow={(rowData) =>
            <View style={{ flex: 1, flexDirection: 'column' }} >


              <TouchableOpacity onPress={() => navigate('chitietsv', { prevScreenTitle: 'ShowDataActivity', people: rowData })} >

                <Text style={styles.textViewContainer} >{'id = ' + rowData.student_id}</Text>

                <Text style={styles.textViewContainer} >{'Tên của mày = ' + rowData.student_name}</Text>

                <Text style={styles.textViewContainer} >{'Lớp mày học = ' + rowData.student_class}</Text>

                <Text style={styles.textViewContainer} >{'Môn mày học = ' + rowData.student_subject}</Text>

              </TouchableOpacity>

            </View>}

        />

      </View></SafeAreaView>
    );
  }
};