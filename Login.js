'use strict';

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableHighlight, ActivityIndicator} from 'react-native';
import authService from './AuthService';

type Props = {};
export default class Login extends Component<Props> {

  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
      showProgress: false,
      badCredentials: false,
      unknownError: false,
      success: false
    };
  }

  onLoginPressed = () => {
    this.setState({showProgress: true});
    const {username, password} = this.state;
    authService.login({
      username,
      password
    }, (results)=>{
      this.setState(Object.assign({
        showProgress: false,
      }, results));

      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });
  };

  render() {
    const {showProgress, badCredentials, unknownError, success} = this.state;

    let errorCtrl = <View/>;
    if(!success && badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work.
      </Text>;
    }
    if(!success && unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue.
      </Text>;
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./img/Octocat.png')}/>
        <Text style={styles.heading}>
          Github browser
        </Text>
        <TextInput
          onChangeText={(username)=>this.setState({username})}
          style={styles.input}
          placeholder="Github username"/>
        <TextInput
          onChangeText={(password)=>this.setState({password})}
          style={styles.input}
          placeholder="Github password"
          secureTextEntry={true}/>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>this.onLoginPressed()}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>

        {errorCtrl}

        <ActivityIndicator
          animating={showProgress}
          size="large"
          style={styles.loader}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#F5FCFF',

  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});
