import React, {Component} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableHighlight} from 'react-native';
import SearchResult from './SearchResult';

export default class Search extends Component {

  onSearchPressed(){
    const {navigator} = this.props;
    const {searchQuery} = this.state;
    navigator.push({
      component: SearchResult,
      title: "Results",
      passProps: {
        searchQuery
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(text)=>this.setState({
            searchQuery: text
          })}
          style={styles.input}
          placeholder="Search Query"/>
        <TouchableHighlight
          style={styles.button}
          onPress={()=>this.onSearchPressed()}>
          <Text style={styles.buttonText}>
            Search
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
    paddingTop: 100,
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
});
