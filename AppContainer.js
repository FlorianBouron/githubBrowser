import React, {Component} from 'react';
import {View, StyleSheet, Text, TabBarIOS} from 'react-native';

export default class AppContainer extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectedTab: 'feed'
    };
  }

  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === 'feed'}
          icon={require('./img/inbox.png')}
          onPress={()=>this.setState({selectedTab: 'feed'})}>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Tab 1
            </Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab === 'search'}
          icon={require('./img/search.png')}
          onPress={()=>this.setState({selectedTab: 'search'})}>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Tab 2
            </Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});