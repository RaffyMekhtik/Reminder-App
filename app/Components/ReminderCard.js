import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { deleteReminder } from '../../Context/Actions/listActions'
import { useDispatch } from 'react-redux';
import { Link } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../style';
import { Ionicons } from '@expo/vector-icons';

export default function ReminderCard({props}) {

    const dispatch = useDispatch()

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var day = date.getDate()
        var month = date.getMonth() +1
        var year = date.getFullYear()
        const hi = new Date()
        hi.getye
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

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
        <Pressable style={styles.reminderitem}>
            <Link  href={{pathname:'/modal',
                params:{
                    prevtitle:props.title,
                    prevbody:props.body,
                    prevdate:props.date,
                    previd:props.id
                }
            }}
            >

            <View style={styles.reminderformat}>

                <View >
                    <Text style={{...styles.normaltext, fontSize:25, fontWeight:'bold'}}>{props.title}</Text>
                    <Text style={{...styles.normaltext, marginLeft:10}}>{props.body}</Text>
                </View>

                <View >
                    <Text style={styles.normaltext}>{formatAMPM(props.date)}</Text>
                </View>
            </View>

            </Link>
        </Pressable>

    </Swipeable>
    </GestureHandlerRootView>
  )
}