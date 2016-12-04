/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ListView
} from 'react-native';

export default class bananaAcfun extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([])
    }
  }
  handlerGetAcfun () {
    fetch('http://www.acfun.tv/', {
      method: 'GET'
    }).then((response) => response.text())
    .then((text) => {
      let htmlStr = text
      let figureArr = htmlStr.match(/<figure class="fl block-box block-video block-banana no-animate">(.*?)<\/figure>/g)
      let bananaArr = []
      for (let figure of figureArr) {
        let rst = figure.match(/<img src=".*?" data-original="(.*?)" width="100%" height="100%"\/>.*?<a href="\/v\/.*?" target="_blank" title=".*?&#13;UP:(.*?)&#13;.*?">(.*?)<\/a>.*?<i class="icon icon-banana"><\/i>(.*?)<\/span>/)
        bananaArr.push({
          img: rst[1],
          title: rst[3],
          up: rst[2],
          bananaCount: rst[4]
        })
      }
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({
        dataSource: ds.cloneWithRows(bananaArr)
      })
      console.log(bananaArr)
    })
  }
  // handlerGetAcfun () {
  //   Alert.alert('asdasd', 'ddd')
  // }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Button
          onPress={this.handlerGetAcfun.bind(this)}
          title="点击我"
          color="#841584"
        />
        <ListView
          style={{flex: 5}}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return (
              <View>
                <Text>{rowData.title}</Text>
              </View>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bananaAcfun', () => bananaAcfun);