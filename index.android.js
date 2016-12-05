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
  ListView,
  Image
} from 'react-native';

export default class bananaAcfun extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      getData: false,
      dataSource: ds.cloneWithRows([])
    }
    this.handlerGetAcfun()
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
        dataSource: ds.cloneWithRows(bananaArr),
        getData: true
      })
    })
  }
  // handlerGetAcfun () {
  //   Alert.alert('asdasd', 'ddd')
  // }
  render() {
    return (
      <View style={styles.container}>
        <View>
          {
            !this.state.getData && (
              <Text>获取数据中...</Text>
            )
          }
          {
            this.state.getData && (
              <ListView
                style={{flex: 5}}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => {
                  return (
                    <View>
                      <AcfunVideo videoInfo={{title: rowData.title, imageUrl: rowData.img}}></AcfunVideo>
                    </View>
                  )
                }}
              />
            )
          }
        </View>
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

class AcfunVideo extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <View>
        <Image
          style={{width: 320, height: 180}}
          source={{uri: this.props.videoInfo.imageUrl}}
        ></Image>
        <View>
          <Text>{this.props.videoInfo.title}</Text>
        </View>
      </View>
    )
  }
}