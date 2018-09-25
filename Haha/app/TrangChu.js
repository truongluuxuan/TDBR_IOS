import React, { Component } from 'react';

import { StyleSheet,SafeAreaView, Platform, ToastAndroid, View, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox, ListView } from 'react-native';
import styles from './StylesChung';

var Realm = require('realm');

let realm;

import { StackNavigator } from 'react-navigation';

//Kiểm trang độ dài các trường nhập vào, không được trống

function findAndReplace(string, target, replacement) {

  var i = 0, length = string.length;

  for (i; i < length; i++) {

    string = string.replace(target, replacement);

  }

  return string;

}


export default class MainActivity extends Component {

  static navigationOptions =
    {
      title: 'MainActivity',
      header: null
    };

  GoToSecondActivity = () => {
    this.props.navigation.navigate('Second');

  }

  constructor() {

    super();


    //phần tạo bảng db realm với các key như student_name, student_class
    this.state = {

      Student_Name: '',

      Student_Class: '',

      Student_Subject: ''

    }

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

  }



  add_Student = () => {


    realm.write(() => {

      var ID = realm.objects('Student_Info').length + 1;
      if (findAndReplace(this.state.Student_Name, " ", "") == "" || findAndReplace(this.state.Student_Class, " ", "") == ""
        || findAndReplace(this.state.Student_Subject, " ", "") == "") {
        //  Alert.alert("Bố giã đủ thông tin vào hộ con cái!");
        ToastAndroid.show('Bố giã đủ thông tin vào hộ con cái!', ToastAndroid.SHORT);
      } else {
        realm.create('Student_Info', {
          student_id: ID,
          student_name: this.state.Student_Name,
          student_class: this.state.Student_Class,
          student_subject: this.state.Student_Subject
        });

        //phải làm cả hai bước mới thật sự clear dc inputtext
        this.setState({ Student_Name: '' });
        this.nameRef.clear();
        this.setState({ Student_Class: '' });
        this.classRef.clear();
        this.setState({ Student_Subject: '' });
        this.subjectRef.clear();
        // Alert.alert("Thêm mới sinh viên thành công!")
        ToastAndroid.show('Thêm mới sinh viên thành công!', ToastAndroid.SHORT);
      }


    });



  }

  render() {

    return (
<SafeAreaView>
      <View>
        <View style={styles.styleForHome}>
        <View style={styles.ViewOfTextHeader}>
          <Text style={styles.HeaderScreen}>Thêm mới học sinh/Sinh viên
              </Text>
        </View>
        </View>
        <View style={styles.ViewInput} >
          <TextInput
            ref={nameRef => this.nameRef = nameRef}
            placeholder="Tên mài là gì?"
            style={styles.TextInputStyle}
            underlineColorAndroid="transparent"
            //thêm actionNext trong textInput
            returnKeyType='next'
            onSubmitEditing={() => this.classRef.focus()}
            onChangeText={(text) => { this.setState({ Student_Name: text }) }}
          />
        </View>
        <View style={styles.ViewInput} >
          <TextInput
            //Chỉ vị trí sau khi ấn next trong text input trên
            ref={classRef => this.classRef = classRef}
            style={styles.TextInputStyle}
            placeholder="Học lớp nào thế ku?"
            underlineColorAndroid="transparent"
            returnKeyType='next'
            onSubmitEditing={() => this.subjectRef.focus()}
            onChangeText={(text) => { this.setState({ Student_Class: text }) }}
          />
        </View>
        <View style={styles.ViewInput} >
          <TextInput
            ref={subjectRef => this.subjectRef = subjectRef}
            style={styles.TextInputStyle}
            placeholder="Môn mài học là giề?"
            underlineColorAndroid="transparent"
            onChangeText={(text) => { this.setState({ Student_Subject: text }) }}
          />
        </View>

        <TouchableOpacity onPress={this.add_Student} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.TextStyle}> Bấm vào đơi để thêm bản ghi </Text>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("main")} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.TextStyle}> Cho tao xem danh sách phát nào </Text>

        </TouchableOpacity>

      </View>
      </SafeAreaView>
    );
  }
};