import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native'
import Dimensions from 'Dimensions'
class AcfunVideo extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <View style={styles.videoContainer}>
        <Image
          style={styles.imgStyle}
          source={{uri: this.props.videoInfo.img}}
        ></Image>
        <View style={styles.videoInfo}>
          <Text style={styles.title}>{this.props.videoInfo.title}</Text>
          <Text style={styles.author}>up: {this.props.videoInfo.up}</Text>
          <Text style={styles.bananaCount}>香蕉数: {this.props.videoInfo.bananaCount}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width / 2) * (9 / 16),
    flexDirection: 'row',
    marginTop: 3,
    backgroundColor: '#fff'
  },
  imgStyle: {
    width: Dimensions.get('window').width / 2,
    height: (Dimensions.get('window').width / 2) * (9 / 16)
  },
  videoInfo: {
    flex: 1
  },
  title: {
    padding: 10,
    paddingBottom: 0
  },
  author: {
    position: 'absolute',
    left: 10,
    bottom: 20
  },
  bananaCount: {
    position: 'absolute',
    left: 10,
    bottom: 0
  }
})

export default AcfunVideo