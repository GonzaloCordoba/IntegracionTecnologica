import React, { useState } from 'react'
import { StyleSheet,View,Text } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import CardCustom from './CardCustom'

function SwipeableImage({ dataPub, currentIndex, handleLike, handlePass, swipesRef}) {
    console.log(dataPub)
    const renderLeftActions = () => {
        return(
            <RectButton style={styles.container}>
                <CardCustom dataPub={dataPub[currentIndex] + 1}></CardCustom>
            </RectButton>
        )
    }
    const renderRightActions = () => {
        return(
            <RectButton style={styles.container}>
                <CardCustom dataPub={dataPub[currentIndex] - 1}></CardCustom>
            </RectButton> 
        )   
    }
    return(
        <Swipeable
            ref={swipesRef}
            friction={2}
            leftThreshold={40}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={handleLike}
            onSwipeableRightOpen={handlePass}

        >
            <CardCustom dataPub={dataPub[currentIndex]}></CardCustom>    
        </Swipeable>
    )
}
const styles = StyleSheet.create({
   container:{
       flex:1,
   } 
})

export default React.forwardRef((props,ref)=><SwipeableImage swipesRef={ref}{...props}></SwipeableImage>)