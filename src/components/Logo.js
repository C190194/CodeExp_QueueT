import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/brand/new-logo.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 0.8, 
    resizeMode: 'contain',
    position:'absolute',
    top:150
  },
})
