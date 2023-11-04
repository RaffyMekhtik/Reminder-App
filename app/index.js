import { View, Text, Pressable, FlatList, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import styles from '../style'
import { connect, useDispatch, useSelector } from 'react-redux';
import ReminderCard from './Components/ReminderCard'
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function index() {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Delete
        </Animated.Text>
      </RectButton>
    );
  };
  const data = useSelector((state) => state.listReducer.reminders)
  return (
    <View style={styles.Main}>

      <View style={styles.child1}></View>
      
      <View style={styles.child2}>

        <Pressable style={styles.pressable}>
          <Link href={'/modal'}>
            <Text style={styles.button}>+</Text>
          </Link>
        </Pressable>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return(
              <Swipeable onSwipeableWillOpen={{direction:'left'}}>
                <ReminderCard props={item} />
              </Swipeable>
            )
          } }
        />

      </View>
    
    </View>
  )
}

