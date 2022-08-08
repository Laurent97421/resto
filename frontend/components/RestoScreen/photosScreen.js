import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { Overlay } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";



let deviceWidth = Dimensions.get('window').width;
// console.log(deviceWidth)
// let deviceHeight = Dimensions.get('window').height;
// console.log(deviceHeight)

function photosScreen(props) {

  // Overlay to show image in fullscreen
  const [overlayIsVisible, setOverlayIsVisible] = useState(false);

  // console.log("Photos")
  // console.log(props.restoSelected[0].images)
    
  // var imgFullScreen = (props) => {
  //   setOverlayIsVisible(true);
  //   props.resto.uri
  // }

  var imgFromJSONFile = props.restoSelected[0].images.map((resto, i) => {
    return (
      <TouchableOpacity key={i} style={styles.imgContainer} onPress={() => setOverlayIsVisible(true)}>
        <Image style={styles.image} source={{ uri: resto.uri }}/>
      </TouchableOpacity>
    )
  })

  return (
    <ScrollView style={{backgroundColor:'white'}}>

      <View>
        <Overlay style={styles.imgOverlay} isVisible={overlayIsVisible} onPress={() => setOverlayIsVisible(false)}>
          <Image style={{width: '100%', aspectRatio: 5/3}} source={{ uri: resto.uri }}/>
          <Ionicons name="arrow-back-circle" size={45} color='white' style={styles.iconContainer} onPress={() => setOverlayIsVisible(false)} />
        </Overlay>
      </View>

      <View style={styles.gallery}>
        { imgFromJSONFile }
      </View>
    </ScrollView>
    
  )
}

function mapStateToProps(state) {
  return { restoSelected: state.restoSelected }
}

export default connect(
  mapStateToProps,
  null
)(photosScreen);

const styles = StyleSheet.create({
  gallery:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginVertical: 10,
    // marginHorizontal: 1,
    // justifyContent: 'center',
    // width: deviceWidth,
  },
  imgContainer: {
    backgroundColor: 'lightgrey',
    height: 108,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 8,
    // marginVertical: 5,
  },
  image: {
    flex:1,
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    top: -250,
    left: 10,
  },
  imgOverlay: {
    flex:1,
    width: 'auto',
  }
})