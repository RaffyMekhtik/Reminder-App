import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { deleteReminder, cancelScheduledReminder, scheduleReminder } from '../Context/Actions/listActions'
import { useDispatch, useSelector } from 'react-redux';
import { Link, router } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {backgroundColor, borderColorLight, cardColorLight, secondaryColor, secondaryColorLight, styles, textColorLight} from '../style';
import { Ionicons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ReminderCard({props}) {

    const [isPast, setIsPast] = useState(false)

    const dispatch = useDispatch()
    const isDarkMode = useSelector((state) => state.listReducer.isDarkMode)

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

      var swipeable

  return (
    
    <Swipeable
        ref={ref => swipeable = ref}
        renderLeftActions={leftSwipe} 
        renderRightActions={rightSwipe}
        onSwipeableOpen={(direction) => {  
            if(direction == 'left'){
                dispatch(deleteReminder(props.id))
            }
            else{
                swipeable.close()
                if(isPast){
                    const reminder = {
                        id: props.id,
                        title: props.title,
                        body:props.body,
                        date: props.date,
                    }
                    dispatch(scheduleReminder(reminder))
                }else{
                    dispatch(cancelScheduledReminder(props.id))
                }
                
                setIsPast(prev => !prev)
            }
        }}
    >
        <Pressable 
            onPress={() => router.push({
                pathname:'/addReminder',
                params:{
                prevtitle:props.title,
                prevbody:props.body,
                prevdate:props.date,
                previd:props.id
                }
            })} 
            style={styles.reminderitem}
        >

            <View style={ 
                isPast ? 
                    isDarkMode?
                 styles.reminderformat
                : 
                {...styles.reminderformat, backgroundColor:cardColorLight, borderColor:borderColorLight}

                    :
                    isDarkMode?
                {...styles.reminderformat, backgroundColor:secondaryColor} 
                : 
                {...styles.reminderformat, backgroundColor:secondaryColorLight, borderColor:borderColorLight}
            }
            >

                <View 
                style={styles.remindersection}
                >
                    <Text
                        style={
                            isPast ?
                            isDarkMode?
                            [{
                                ...styles.remindertext, 
                                fontWeight:'bold'
                            }, styles.lineThrough]
                            :
                            [{
                                ...styles.remindertext, 
                                color:textColorLight,
                                fontWeight:'bold'
                            }, styles.lineThrough]
                            :
                            isDarkMode?
                            { 
                                ...styles.remindertext, 
                                fontWeight:'bold'
                            }
                            :
                            { 
                                ...styles.remindertext, 
                                color:textColorLight,
                                fontWeight:'bold'
                            }
                        }
                    >
                        {props.title}
                    </Text>
                    <Text
                        style={
                            isPast ?
                            isDarkMode?
                            [{
                                ...styles.remindertext, 
                                textAlign:'center',
                                height:'70%'
                            }, styles.lineThrough]
                            :
                            [{
                                ...styles.remindertext, 
                                color:textColorLight,
                                textAlign:'center',
                                height:'70%'
                            }, styles.lineThrough]
                            :
                            isDarkMode?
                            { 
                                ...styles.remindertext, 
                                textAlign:'center',
                                height:'70%'
                            }
                            :
                            { 
                                ...styles.remindertext,
                                color:textColorLight,
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
                    <Text style={
                        isPast ? 
                        isDarkMode?
                        [styles.normaltext,styles.lineThrough] 
                        :
                        [{...styles.normaltext, color:textColorLight},styles.lineThrough] 
                        :
                        isDarkMode?
                        {...styles.normaltext}
                        :
                        {...styles.normaltext,color:textColorLight}
                    }>
                    {props.date == null ? <></> : reminderDate.toLocaleString(DateTime.DATE_MED)}
                    </Text>
                    <Text style={
                        isPast ? 
                        isDarkMode?
                        [styles.normaltext,styles.lineThrough] 
                        :
                        [{...styles.normaltext, color:textColorLight},styles.lineThrough] 
                        :
                        isDarkMode?
                        {...styles.normaltext}
                        :
                        {...styles.normaltext,color:textColorLight}
                    }>
                    {props.date == null ? <></> : reminderDate.toLocaleString(DateTime.TIME_SIMPLE)}
                    </Text>
                </View>
            </View>

        </Pressable>

    </Swipeable>
  )
}