import { View, TextInput, Pressable, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { schedulePushNotification } from '../notificiation-service';
import { useDispatch } from 'react-redux';
import { createReminder, updateReminder } from '../Context/Actions/listActions'
import { router, useLocalSearchParams } from 'expo-router';
import { styles, accentColor, secondaryColor } from '../style';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { DateTime } from 'luxon';

export default function modal(){

  const { prevtitle,prevbody,prevdate,previd } = useLocalSearchParams()

  const [date, setDate] = useState(prevdate == undefined ? DateTime.now() : DateTime.fromISO(prevdate))
  const [datetime, setDatetime] = useState( new Date())
  const [id, setId] = useState(previd == undefined ? Math.random()+10+Math.random() : previd)
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const [isEnabled, setIsEnabled] = useState(prevdate == undefined ? false : true);
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: (prevtitle == undefined ? '' : prevtitle),
      body: (prevbody == undefined ? '' : prevbody),
    },
  })

  const onChange = (e, selectedDate) => {
    // const temp = DateTime.fromISO(selectedDate)
    // setDate(temp)
    setDatetime(selectedDate)
    setDate(DateTime.fromJSDate(selectedDate))
    setShow(false)
  }

  const showMode = (modeToShow) => {
    setShow(true)
    setMode(modeToShow)

  }

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    clearErrors()
  };


  const handleAddReminder = (data) => {

    if(isEnabled || data.title != '' || data.body != ''){

      const isReminderOn = isEnabled ? date : null
      const reminder = {
        id: id,
        title: data.title,
        body: data.body,
        date: isReminderOn,
      }

      if(previd == undefined){
        dispatch(createReminder(reminder))
      } else {
        dispatch(updateReminder({id: id, body: data.body, date:isReminderOn, title:data.title}))
      }

      router.back()

    }
  }
  

  return (
    <View style={{...styles.Main, flex:1}}>

    <View style={{...styles.inputrow, marginTop:50}}>
      <Controller
        control={control}
        rules={isEnabled ? {required: false} : {required: true}}
        render={({ field: { onChange, value } }) => (
          <TextInput
          multiline={true}
          numberOfLines={2}
          placeholderTextColor='grey'
          style={{...styles.input, fontWeight:'bold',fontSize:25,}}
          placeholder='Add a Title' 
          onChangeText={onChange}
          value={value}
        />
        )}
        name="title"
      />
      {
        errors.title && 
        <View style={styles.error}>
          <Ionicons name="alert-circle-outline" size={24} color="red" />
          <Text style={{color:'red'}}>Title is required</Text>
        </View>
      }
    </View>

    <View style={styles.inputrow}>
      <Controller
        control={control}
        rules={isEnabled ? {required: false} : {required: true}}
        render={({ field: { onChange, value } }) => (
          <TextInput
          multiline={true}
          numberOfLines={2}
          placeholderTextColor='grey'
          style={styles.input}
          placeholder='Add a Body' 
          onChangeText={onChange}
          value={value}
        />
        )}
        name="body"
      />
        {
        errors.body && 
        <View style={styles.error}>
          <Ionicons name="alert-circle-outline" size={24} color="red" />
          <Text style={{color:'red'}}>Body is required</Text>
        </View>
      }
    </View>

      <View style={styles.switch}>
        <Text style={styles.normaltext}>Add Reminder?</Text>
        <Switch
        trackColor={{false: 'grey', true: '#EEEEEE'}}
        thumbColor={accentColor}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
        
      </View>
      


      {
        isEnabled ?
        <View style={styles.datebuttonrow}>
        <Pressable style={styles.datebutton} onPress={() => showMode("date")}>
          <Text style={styles.datebuttontext}>
            {date.toLocaleString(DateTime.DATE_MED)}
          </Text>
        </Pressable>
        <Pressable style={styles.datebutton} onPress={() => showMode("time")}>
          <Text style={styles.datebuttontext}>
          {date.toLocaleString(DateTime.TIME_SIMPLE)}
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
        value={datetime} 
        mode={mode} 
        onChange={onChange}
        display='spinner'
        />
      }

      <View style={{margin:20,bottom:10,position:'absolute'}}>
        <View style={styles.modalbottombuttons}>
        
        <Pressable 
            style={({pressed}) => pressed ? {...styles.schedulebutton, backgroundColor:secondaryColor} : {...styles.schedulebutton}}
            onPress={() => {router.back()}} 
          > 
            <Text style={styles.schedulebuttontext}>Cancel</Text>
          </Pressable>

          <Pressable 
            style={({pressed}) => pressed ? {...styles.schedulebutton, backgroundColor:secondaryColor} : {...styles.schedulebutton}}
            onPress={handleSubmit(handleAddReminder)} 
          > 
            <Text style={styles.schedulebuttontext}>Done</Text>
          </Pressable>

        </View>
      </View>

    </View>
  )
}


