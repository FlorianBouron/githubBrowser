'use strict';

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput, TouchableHighlight} from 'react-native';

type Props = {};
export default class Login extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo}
               source={require('./img/Octocat.png')}/>
        <Text style={styles.heading}>
          Github browser
        </Text>
        <TextInput style={styles.input}
                   placeholder="Github username"/>
        <TextInput style={styles.input}
                   placeholder="Github password"
                   secureTextEntry={true}/>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.buttonText}>
            Log in
          </Text>
        </TouchableHighlight>
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
  }
});
