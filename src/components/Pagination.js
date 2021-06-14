import { Pagination as ReactNativePagination } from 'react-native-snap-carousel';
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';



export default function Pagination(props) {
    return (
        <ReactNativePagination
            dotsLength={props.items.length}
            activeDotIndex={props.activeIndex}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 6,
                marginHorizontal: 5,
                backgroundColor: 'rgba(255, 255, 255, 1)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}

        />
    )
}



