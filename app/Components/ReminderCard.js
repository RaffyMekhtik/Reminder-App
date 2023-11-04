import { View, Text, Button, TextInput, Pressable } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { deleteReminder, updateReminder, createReminder } from '../../Context/Actions/listActions'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'expo-router';

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

  return (
    <View>

        <Pressable>
            <Link href={{pathname:'/modal',
                params:{
                    prevtitle:props.title,
                    prevbody:props.body,
                    prevdate:props.date,
                    previd:props.id
                }
            }}>
                <Text>{props.title}</Text>
                <Text>{props.body}</Text>
                <Text>{formatAMPM(props.date)}</Text>
            </Link>
        </Pressable>

        

        <Button title='delete' onPress={() => dispatch(deleteReminder(props.id))} />
    </View>
  )
}