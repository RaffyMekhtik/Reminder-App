import { View, Button, TextInput, StatusBar, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { schedulePushNotification } from '../notificiation-service';
import { useDispatch } from 'react-redux';
import { createReminder, updateReminder } from '../Context/Actions/listActions'
import { router, useLocalSearchParams } from 'expo-router';
import styles from '../style';


export default function modal(){

  const { prevtitle,prevbody,prevdate,previd } = useLocalSearchParams()

  const [date, setDate] = useState(prevdate == undefined ? new Date() : new Date(prevdate))
  const [id, setId] = useState(previd == undefined ? Math.random()+10+Math.random() : previd)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [body, setBody] = useState(prevbody == undefined ? '' : prevbody)
  const [title, setTitle] = useState(prevtitle == undefined ? '' : prevtitle)
  const dispatch = useDispatch()

  const onChange = (e, selectedDate) => {
    setDate(selectedDate)
    setShow(false)
  }

  const showMode = (modeToShow) => {
    setShow(true)
    setMode(modeToShow)

  }

  const handleAddReminder = async () => {

    const reminder = {
      id: id,
      title: title,
      body: body,
      date: date
    }

    if(previd == undefined){
      dispatch(createReminder(reminder))
    } else {
      dispatch(updateReminder({id: id, body: body, date:date, title:title}))
    }

    router.back()
    
  }
  

  return (
    <View style={{...styles.Main, flex:1}}>

      <TextInput
        placeholderTextColor={'grey'}
        style={{...styles.input, fontWeight:'bold'}}
        placeholder='Add a Title' 
        onChangeText={setTitle}
        value={title}
      />

      <TextInput
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder='Add a Body' 
        onChangeText={setBody}
        value={body}
      />

      <View style={styles.datebuttonrow}>
        <Pressable style={styles.datebutton} onPress={() => showMode("date")}>
          <Text style={styles.datebuttontext}>{date.toLocaleDateString()}</Text>
        </Pressable>
        <Pressable style={styles.datebutton} onPress={() => showMode("time")}>
          <Text style={styles.datebuttontext}>{
        date.toLocaleTimeString(
          "en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          }
        )
      } </Text>
        </Pressable>
      </View>

      

      {
        show &&
        <DateTimePicker
        value={date} 
        mode={mode} 
        onChange={onChange}
        display='spinner'
        />
      }

      <View style={{margin:20, marginTop:30}}>
      <Pressable 
        style={styles.schedulebutton}
        onPress={handleAddReminder} 
      > 
        <Text style={styles.datebuttontext}>Schedule Notification</Text>
      </Pressable>
      </View>

    </View>
  )
}


