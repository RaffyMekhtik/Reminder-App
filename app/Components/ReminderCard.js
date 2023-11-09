import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { deleteReminder } from '../../Context/Actions/listActions'
import { useDispatch } from 'react-redux';
import { Link, router } from 'expo-router';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Gesture, GestureDetector, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import styles from '../../style';
import { Ionicons } from '@expo/vector-icons';
import { DateTime } from 'luxon';

export default function ReminderCard({props}) {

    const dispatch = useDispatch()

    const date = DateTime.fromISO(props.date)

    // function formatAMPM(date) {
    //     var hours = date.getHours();
    //     var minutes = date.getMinutes();
    //     var day = date.getDate()
    //     var month = date.getMonth() +1
    //     var year = date.getFullYear()
    //     var ampm = hours >= 12 ? 'PM' : 'AM';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12; // the hour '0' should be '12'
    //     minutes = minutes < 10 ? '0' + minutes : minutes;
    //     var strTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ' ' + ampm;
    //     return strTime;
    //   }

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

            <View style={styles.reminderformat}>

                <View 
                    style={{
                        marginTop:10,
                        marginBottom:10,
                    }}
                >
                    <TextInput
                        editable={false}
                        value={props.title}
                        multiline={true}
                        numberOfLines={2}
                        style={{...styles.remindertext, fontWeight:'bold'}}
                    />
                    <TextInput
                        editable={false}
                        value={props.body}
                        multiline={true}
                        numberOfLines={2}
                        style={styles.remindertext}
                    />
                </View>

                <View >
                    <Text style={styles.normaltext}>
                    {props.date == null ? <></> : date.toLocaleString(DateTime.DATETIME_MED)}
                    </Text>
                </View>
            </View>

        </GestureDetector>

    </Swipeable>
    </GestureHandlerRootView>
  )
}