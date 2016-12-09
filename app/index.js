/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import AcfunVideo from './components/AcfunVideo'
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions'

export default class bananaAcfun extends Component {
  constructor(props) {
    super(props)
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      getData: false,
      dayDataSource: ds.cloneWithRows([]),
      weekDataSource: ds.cloneWithRows([]),
      tabActive: 0
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
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      let dayData = bananaArr.splice(0, 10)
      let weekData = bananaArr.splice(0, 10)
      this.setState({
        dayDataSource: ds.cloneWithRows(dayData),
        weekDataSource: ds.cloneWithRows(weekData),
        getData: true
      })
    })
  }
  handlerToggle (idx) {
    this.setState({
      tabActive: idx
    })
  }
  handlerRefresh () {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.setState({
      getData: false,
      dayDataSource: ds.cloneWithRows([]),
      weekDataSource: ds.cloneWithRows([]),
    })
    this.handlerGetAcfun()
  }
  // handlerGetAcfun () {
  //   Alert.alert('asdasd', 'ddd')
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.btns}>
            <TouchableOpacity
              style={[styles.btnTab, this.state.tabActive === 0 && styles.tabActive]}
              onPress={this.handlerToggle.bind(this, 0)}
            >
              <Text style={[styles.btnTabText, this.state.tabActive === 0 && styles.tabActiveText]}>日榜</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnTab, this.state.tabActive === 1 && styles.tabActive]}
              onPress={this.handlerToggle.bind(this, 1)}
            >
              <Text style={[styles.btnTabText, this.state.tabActive === 1 && styles.tabActiveText]}>周榜</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnRefresh}
            onPress={this.handlerRefresh.bind(this)}
          >
            <Text style={styles.btnRefreshText}>刷新</Text>
          </TouchableOpacity>
        </View>
        <View>
          {
            !this.state.getData && (
              <Text>获取数据中...</Text>
            )
          }
          {
            this.state.getData && (
              <View>
                {
                  this.state.tabActive === 0 ? (
                    <View style={styles.listContainer}>
                      <View style={styles.listHeader}>
                        <Text style={styles.headerTitle}>日</Text>
                        <Image
                          style={styles.iconBannana}
                          source={{uri: 'http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201512/18171848qkt0jzji.gif?imageView2/1/w/40/h/40'}}
                        ></Image>
                        <Text style={styles.headerTitle}>榜</Text>
                      </View>
                      <ListView
                        dataSource={this.state.dayDataSource}
                        renderRow={(rowData) => {
                          return (
                            <View>
                              <AcfunVideo videoInfo={{...rowData}}></AcfunVideo>
                            </View>
                          )
                        }}
                      />
                    </View>
                  ) : this.state.tabActive === 1 ? (
                    <View style={styles.listContainer}>
                      <View style={styles.listHeader}>
                        <Text style={styles.headerTitle}>周</Text>
                        <Image
                          style={styles.iconBannana}
                          source={{uri: 'http://cdn.aixifan.com/dotnet/artemis/u/cms/www/201512/18171848qkt0jzji.gif?imageView2/1/w/40/h/40'}}
                        ></Image>
                        <Text style={styles.headerTitle}>榜</Text>
                      </View>
                      <ListView
                        dataSource={this.state.weekDataSource}
                        renderRow={(rowData) => {
                          return (
                            <View>
                              <AcfunVideo videoInfo={{...rowData}}></AcfunVideo>
                            </View>
                          )
                        }}
                      />
                    </View>
                  ) : null
                }
              </View>
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
    backgroundColor: '#e0e0e0',
    paddingTop: 50,
  },
  topBar: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 50,
    top: 0,
    left: 0,
    backgroundColor: '#fd4c5d',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btns: {
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden'
  },
  btnTab: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fd4c5d',
    borderRadius: 5
  },
  btnTabText: {
    color: '#fff'
  },
  tabActive: {
    backgroundColor: '#fff'
  },
  tabActiveText: {
    color: '#fd4c5d'
  },
  btnRefresh: {
    position: 'absolute',
    right: 20,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnRefreshText: {
    color: '#fff',
    fontSize: 16
  },
  listContainer: {
    // flex: 1
  },
  listHeader: {
    height: 40,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  headerTitle: {
    fontSize: 18,
    color: '#888'
  },
  iconBannana: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10
  }
})