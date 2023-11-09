import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { deleteReminder } from '../../Context/Actions/listActions'
import { useDispatch } from 'react-redux';
import { Link, router } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Gesture, GestureDetector, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import {styles} from '../../style';
import { Ionicons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ReminderCard({props}) {

    const [isPast, setIsPast] = useState(false)

    const dispatch = useDispatch()

    const reminderDate = DateTime.fromISO(props.date)
    const currentDate = DateTime.now()

   
    
    useEffect(() => {
      
        if(reminderDate.diff(currentDate).as('days') < 0){
            setIsPast(true)
        }
      
    }, [])
    

      const leftSwipe = () => {
        return (
            <View style={styles.delete}>
                <Ionicons name="trash" size={30} color="white" />
            </View>
        )
      }
      const rightSwipe = () => {
        return (
            <View style={styles.completetask}>
                <Ionicons name="checkmark" size={30} color="white" />
            </View>
        )
      }

      const tap = Gesture.Tap()
      .onStart(() => {
        router.push({
            pathname:'/addReminder',
            params:{
            prevtitle:props.title,
            prevbody:props.body,
            prevdate:props.date,
            previd:props.id
            }
        })
      })

  return (
    <GestureHandlerRootView >
    
    <Swipeable
        renderLeftActions={leftSwipe} 
        renderRightActions={rightSwipe}
        onSwipeableOpen={(direction) => {  
            if(direction == 'left'){
                dispatch(deleteReminder(props.id))
            }
        }}
    >
        <GestureDetector gesture={tap} style={styles.reminderitem}>

            <View style={ isPast ? {...styles.reminderformat, backgroundColor:'#00000080'} : styles.reminderformat}>

                <View 
                style={styles.remindersection}
                >
                    <Text
                        style={
                            isPast ?
                            [{
                                ...styles.remindertext, 
                                fontWeight:'bold'
                            }, styles.lineThrough]
                            :
                            { 
                                ...styles.remindertext, 
                                fontWeight:'bold'
                            }
                        }
                    >
                        {props.title}
                    </Text>
                    <Text
                        style={
                            isPast ?
                            [{
                                ...styles.remindertext, 
                                textAlign:'center',
                                height:'70%'
                            }, styles.lineThrough]
                            :
                            { 
                                ...styles.remindertext, 
                                textAlign:'center',
                                height:'70%'
                            }
                        }
                    >
                        {props.body}
                    </Text>
                </View>

                <View 
                    style={styles.remindersection}
                >
                    <Text style={isPast ? [styles.normaltext,styles.lineThrough] : {...styles.normaltext}}>
                    {props.date == null ? <></> : reminderDate.toLocaleString(DateTime.DATE_MED)}
                    </Text>
                    <Text style={isPast ? [styles.normaltext,styles.lineThrough] : {...styles.normaltext}}>
                    {props.date == null ? <></> : reminderDate.toLocaleString(DateTime.TIME_SIMPLE)}
                    </Text>
                </View>
            </View>

        </GestureDetector>

    </Swipeable>
    </GestureHandlerRootView>
  )
}