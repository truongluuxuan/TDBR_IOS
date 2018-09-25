

import React, { Component } from 'react';
import {
  Platform,SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import styles from './StylesChung';

export default class ChiTietSv extends Component {
  static navigationOptions = {
    title: 'First Screen',
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      prevScreenTitle: this.props.navigation.state.params.prevScreenTitle,
      people: this.props.navigation.state.params.people,
    };
  }

  render() {
    //quay lại màn hình trước<=> thoát màn hình hiện tại
    const { goBack } = this.props.navigation;


    return (
      <SafeAreaView>
      <View>
      <View style={{ flexDirection: 'row' }}>
          <View style={styles.HeaderScreen}>
            <TouchableOpacity onPress={() => goBack()} >
              <Image style={styles.ImageBack} source={require('../images/back_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ViewOfTextHeader}>
            <Text style={styles.HeaderScreen} onPress={() => goBack()}>Chi Tiết Sinh Viên</Text>
          </View>
        </View>

        <Text>Tên tao là: {this.state.people.student_name} Tao học lớp {this.state.people.student_class} Môn tao học {this.state.people.student_subject}</Text>

      </View></SafeAreaView>
    );
  }
};
