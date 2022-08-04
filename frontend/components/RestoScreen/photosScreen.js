import { StyleSheet, Image, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'

// let deviceWidth = Dimensions.get('window').width;
// console.log(deviceWidth)
// let deviceHeight = Dimensions.get('window').height;
// console.log(deviceHeight)

export default function photosScreen() {
  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={styles.gallery}>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri : 'https://media-cdn.tripadvisor.com/media/photo-s/14/b5/e5/80/chai-les-copains.jpg'}}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  )
}

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
})