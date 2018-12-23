import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image,
  TouchableHighlight} from 'react-native';

export default class SearchResult extends Component {

  constructor(props){
    super(props);

    this.state = {
      repositories: [],
      showProgress: true,
      searchQuery: props.searchQuery
    };
  }

  componentDidMount(){
    this.doSearch();
  }

  doSearch(){
    const {searchQuery} = this.state;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}`;
    fetch(url)
      .then(response=>response.json())
      .then(responseData=>{
        this.setState({
          repositories: responseData.items,
        });
      })
      .finally(()=>{
        this.setState({
          showProgress: false
        });
      });
  }

  renderRow(rowData){
    const {item} = rowData;
    return (
      <TouchableHighlight
        underlayColor='#DDD'
      >
        <View style={styles.row}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600'
          }}>
            {item.full_name}
          </Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20
          }}>
            <View style={styles.repoCell}>
              <Image
                source={require('./img/star.png')}
                style={styles.repoCellIcon}
              />
              <Text style={styles.repoCellLabel}>
                {item.stargazers_count}
              </Text>
            </View>
            <View style={styles.repoCell}>
              <Image
                source={require('./img/fork.png')}
                style={styles.repoCellIcon}
              />
              <Text style={styles.repoCellLabel}>
                {item.forks}
              </Text>
            </View>
            <View style={styles.repoCell}>
              <Image
                source={require('./img/issues.png')}
                style={styles.repoCellIcon}
              />
              <Text style={styles.repoCellLabel}>
                {item.open_issues}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const {repositories, showProgress} = this.state;
    if(showProgress){
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
          data={repositories}
          renderItem={this.renderRow.bind(this)}
          keyExtractor={(item) => item.id}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 100
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
});