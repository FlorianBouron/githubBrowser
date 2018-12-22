import React, {Component} from 'react';
import moment from 'moment';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native';
import {getAuthInfo} from './AuthService';


export default class Feed extends Component {

  constructor(props){
    super(props);

    this.state = {
      dataSource: [],
      refreshing: true
    };
  }

  componentDidMount(){
    this.fetchFeed();
  }

  fetchFeed(){
    getAuthInfo((err, authInfo)=>{
      const url = `https://api.github.com/users/${authInfo.user.login}/received_events`;
      fetch(url, {
        headers: authInfo.header
      })
        .then((response)=>response.json())
        .then((responseData)=>{
          this.setState({
            dataSource : responseData,
            refreshing: false
          });
        });
    });
  }

  renderRow(rowData){
    const {item} = rowData;
    return (
      <View style={styles.row}>
        <Image
          source={{uri: item.actor.avatar_url}}
          style={{
            height: 36,
            width: 36,
            borderRadius: 18
          }}
        />
        <View style={{
          paddingLeft: 20
        }}>
          <Text>
            {moment(item.created_at).fromNow()}
          </Text>
          <Text>
            {item.actor.login}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const {dataSource, refreshing} = this.state;
    if(refreshing){
      return(
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={this.renderRow}
          keyExtractor={(item) => item.id}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  }
});