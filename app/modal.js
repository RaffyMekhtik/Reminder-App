import { View, Button, TextInput, StatusBar } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { schedulePushNotification } from '../notificiation-service';
import { useDispatch } from 'react-redux';
import { createReminder, updateReminder } from '../Context/Actions/listActions'
import { router, useLocalSearchParams } from 'expo-router';


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
    <View>

      <TextInput
        placeholder='Add a Title' 
        onChangeText={setTitle}
        value={title}
      />

      <TextInput
        placeholder='Add a Body' 
        onChangeText={setBody}
        value={body}
      />

      <Button title={date.toLocaleDateString()} onPress={() => showMode("date")}/>
      <Button title={
        date.toLocaleTimeString(
          "en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          }
        )
      } 
        onPress={() => showMode("time")}
      />

      {
        show &&
        <DateTimePicker
        value={date} 
        mode={mode} 
        onChange={onChange}
        display='spinner'
        />
      }

      <Button
        title='Schedule Notification' 
        onPress={handleAddReminder} 
      />

    </View>
  )
}


