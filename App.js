/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import Login from './Login';
import AppContainer from './AppContainer';
import AuthService from './AuthService';

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }

  render() {
    const {isLoggedIn, checkingAuth} = this.state;
    if(checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            style={styles.loader}/>
        </View>
      )
    }
    if(isLoggedIn){
      return (
        <AppContainer/>
      )
    } else {
      return (
        <Login onLogin={()=>this.onLogin()}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
});