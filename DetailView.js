import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import moment from 'moment';

export default class DetailView extends Component {

  render() {
    const {item} = this.props.pushEvent;
    return(
      <View style={styles.container}>
        <Image
          source={{uri: item.actor.avatar_url}}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }}/>
        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20
        }}>
          {moment(item.created_at).fromNow()}
        </Text>
        <Text>{item.actor.login}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  }
});