import {
	createStackNavigator
} from 'react-navigation';
import React, { Component } from 'react';
import {
	Platform, StyleSheet, Text, View, TextInPut, Button, Animated,
	Easing,
} from 'react-native';
import Home from './app/TrangChu';
import ShowDataActivity from './app/DanhSachHs';
import ChiTietSv from './app/ChiTietSv';


let main = (index, position) => {
	const inputRange = [index - 1, index, index + 1];
	const opacity = position.interpolate({
		inputRange,
		outputRange: [0, 1, 1],
	});

	const scaleY = position.interpolate({
		inputRange,
		outputRange: ([0, 1, 1]),
	});

	return {
		opacity,
		transform: [
			{ scaleY }
		]
	};
};

let chitietsv = (index, position, width) => {
	const inputRange = [index - 1, index, index + 1];
	const translateX = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [width, 0, 0]
	})
	const chitietsv = { transform: [{ translateX }] }
	return chitietsv
};

const TransitionConfiguration = () => {
	return {
		transitionSpec: {
			duration: 750,
			easing: Easing.out(Easing.poly(4)),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: (sceneProps) => {
			const { layout, position, scene } = sceneProps;
			const width = layout.initWidth;
			const { index, route } = scene
			const params = route.params || {}; // <- That's new
			const transition = params.transition || 'default'; // <- That's new
			return {
				collapseExpand: main(index, position),
				default: chitietsv(index, position, width),
			}[transition];
		},
	}
}





const Navigation = createStackNavigator({
	Home: {
		screen: Home,
	},
	main: {
		screen: ShowDataActivity,
	},
	chitietsv: {
		screen: ChiTietSv,
	}
},
	{
		initialRouteName: 'Home',
		headerMode: "screen",
		mode: Platform.OS === "ios" ? "modal" : "card",
		navigationOptions: {
			cardStack: {
				gesturesEnabled: false
			},
			gesturesEnabled: false
		},
		gesturesEnabled: false,
		transitionConfig: TransitionConfiguration,
	})

export default Navigation;