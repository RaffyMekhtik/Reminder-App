import { View, Button, TextInput, StatusBar, Pressable, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { schedulePushNotification } from '../notificiation-service';
import { useDispatch } from 'react-redux';
import { createReminder, updateReminder } from '../Context/Actions/listActions'
import { router, useLocalSearchParams } from 'expo-router';
import styles from '../style';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';


export default function modal(){

  const { prevtitle,prevbody,prevdate,previd } = useLocalSearchParams()

  const [date, setDate] = useState(prevdate == undefined ? new Date() : new Date(prevdate))
  const [id, setId] = useState(previd == undefined ? Math.random()+10+Math.random() : previd)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [body, setBody] = useState(prevbody == undefined ? '' : prevbody)
  const [title, setTitle] = useState(prevtitle == undefined ? '' : prevtitle)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {setIsEnabled(previousState => !previousState); setError(previousState => !previousState)};
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const onChange = (e, selectedDate) => {
    setDate(selectedDate)
    setShow(false)
  }

  const showMode = (modeToShow) => {
    setShow(true)
    setMode(modeToShow)

  }

  useEffect(() => {
    if(title == '' && body == ''){
      setError(true)
    } else {
      setError(false)
    }
  }, [title, body])
  

  const handleAddReminder = () => {

    if(isEnabled || title != '' || body != ''){

      const isReminderOn = isEnabled ? date : null
      const reminder = {
        id: id,
        title: title,
        body: body,
        date: isReminderOn,
      }

      if(previd == undefined){
        dispatch(createReminder(reminder))
      } else {
        dispatch(updateReminder({id: id, body: body, date:date, title:title}))
      }

      router.back()

    } else {
      setError(true)
    }
  }
  

  return (
    <View style={{...styles.Main, flex:1}}>

      <TextInput
        placeholderTextColor={error ? 'red' : 'grey'}
        style={styles.input}
        placeholder='Add a Title' 
        onChangeText={setTitle}
        value={title}
      />
      {error ? <Ionicons name="alert-circle-outline" size={24} color="red" /> : null}
      <TextInput
        placeholderTextColor={error ? 'red' : 'grey'}
        style={styles.input}
        placeholder='Add a Body' 
        onChangeText={setBody}
        value={body}
      />
      {error ? <Ionicons name="alert-circle-outline" size={24} color="red" /> : null}

      <View style={styles.switch}>
        <Text style={styles.normaltext}>Add Reminder?</Text>
        <Switch
        trackColor={{false: 'red', true: 'green'}}
        thumbColor='#f4f3f4'
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
        
      </View>
      


      {
        isEnabled ?
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
          } 
          </Text>
        </Pressable>
      </View>
      :
      <>
      </>
      }

      

      {
        show &&
        <DateTimePicker
        value={date} 
        mode={mode} 
        onChange={onChange}
        display='spinner'
        />
      }

      <View style={{margin:20,bottom:10,position:'absolute'}}>
        <View style={styles.modalbottombuttons}>
        
        <Pressable 
            style={styles.schedulebutton}
            onPress={() => {router.back()}} 
          > 
            <Text style={styles.schedulebuttontext}>Cancel</Text>
          </Pressable>

          <Pressable 
            style={styles.schedulebutton}
            onPress={handleAddReminder} 
          > 
            <Text style={styles.schedulebuttontext}>Done</Text>
          </Pressable>

        </View>
      </View>

    </View>
  )
}


