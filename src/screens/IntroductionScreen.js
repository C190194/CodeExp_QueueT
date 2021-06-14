import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import Pagination from '../components/Pagination'
import { Dimensions, View, Text, StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { theme } from '../core/theme'
import { useFonts } from 'expo-font';


export default function SwipperScreen({ navigation }) {


  let carouselItems = [
    {
      title: "Hi Kai",
      text: "Splitwise keeps track of balances between friends",
      image: require("../assets/images/bg-1.jpg"),
    },
    {
      title: "Add expenses",
      text: "You can split expenses with groups or with individual",
      image: require("../assets/images/bg-2.jpg"),
    },
    {
      title: "Settle ups",
      text: "Pay your friends back any time",
      image: require("../assets/images/bg-3.jpg"),
    },
  ]

  let [fontsLoaded] = useFonts({
    'KoHo-Bold': require('../assets/fonts/KoHo-Bold.ttf'),
    'KoHo-Regular': require('../assets/fonts/KoHo-Regular.ttf'),
  });


  const [items, setItems] = useState(carouselItems);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


  const _renderItem = ({ item, index }) => {
    return (
      <View style={{
        height: viewportHeight,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
      }}>

        <ImageBackground source={carouselItems[index].image} style={styles.image}>
          <View style={styles.carouselBody}>
            <Text style={styles.carouselTitle}>{carouselItems[index].title}</Text>
            <Text style={styles.carouselText}>{carouselItems[index].text}</Text>
          </View>
          <View style={styles.paginationContainer}>
            <Pagination items={carouselItems} activeIndex={index} style={styles.pagination} />
          </View>
        </ImageBackground>

      </View >

    );
  }


  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        data={items}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        renderItem={_renderItem}
        onSnapToItem={index => setActiveIndex(index)} />
      {/* <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Home')
        }
      >
        Proceed
        </Button> */}
    </View >
  )
}

const styles = StyleSheet.create({
  paginationContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: 120, //no idea
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselBody: {
    position: 'absolute',
    top: 0,
    paddingTop: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 55,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: "KoHo-Bold",
    fontWeight: "800"
  },
  carouselText: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: "KoHo-Regular",
    fontWeight: "500"
  },
  button: {
    backgroundColor: '#8B008B'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
})

