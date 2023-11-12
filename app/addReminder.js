import { View, TextInput, Pressable, Text, Switch } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createReminder, updateReminder } from '../Context/Actions/listActions'
import { router, useLocalSearchParams } from 'expo-router';
import { styles, accentColor, secondaryColor, backgroundColorLight, textColorLight, secondaryColorLight, cardColorLight, height } from '../style';
import { Ionicons } from '@expo/vector-icons';
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
  const isDarkMode = useSelector((state) => state.listReducer.isDarkMode)

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
    <View style={isDarkMode ? {...styles.Main, height:height} : {...styles.Main, height:height, backgroundColor:backgroundColorLight}}>

    <View style={{...styles.inputrow, marginTop:50}}>
      <Controller
        control={control}
        rules={isEnabled ? {required: false} : {required: true}}
        render={({ field: { onChange, value } }) => (
          <TextInput
          multiline={true}
          numberOfLines={2}
          placeholderTextColor='grey'
          style={isDarkMode ? {...styles.input, fontWeight:'bold',fontSize:25,} : {...styles.input, fontWeight:'bold',fontSize:25, color:textColorLight}}
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
          style={isDarkMode ? styles.input : {...styles.input, color:textColorLight}}
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
        <Text style={isDarkMode ? styles.normaltext : {...styles.normaltext, color: textColorLight}}>Add Reminder?</Text>
        <Switch
        trackColor={
          isDarkMode?
          {false: '#EEEEEE', true: '#EEEEEE'}
          :
          {false: secondaryColorLight, true: '#EEEEEE'}
          }
        thumbColor={
          isDarkMode?
          isEnabled ? accentColor : 'grey'
          :
          cardColorLight
          }
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
        
      </View>
      


      {
        isEnabled ?
        <View style={styles.datebuttonrow}>
        <Pressable style={isDarkMode ? styles.datebutton : {...styles.datebutton, backgroundColor:secondaryColorLight}} onPress={() => showMode("date")}>
          <Text style={isDarkMode ? styles.datebuttontext : {...styles.datebuttontext, color:textColorLight}}>
            {date.toLocaleString(DateTime.DATE_MED)}
          </Text>
        </Pressable>
        <Pressable style={isDarkMode ? styles.datebutton : {...styles.datebutton, backgroundColor:secondaryColorLight}} onPress={() => showMode("time")}>
          <Text style={isDarkMode ? styles.datebuttontext : {...styles.datebuttontext, color:textColorLight}}>
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

      <View style={{margin:20,bottom:60,position:'absolute'}}>
        <View style={styles.modalbottombuttons}>
        
        <Pressable 
            style={
              ({pressed}) =>
               isDarkMode ?
              pressed ? 
              {...styles.schedulebutton, backgroundColor:secondaryColor}
               : 
              {...styles.schedulebutton}
              :
              pressed ? 
              {...styles.schedulebutton, backgroundColor:secondaryColorLight}
               : 
              {...styles.schedulebutton}
            }
            onPress={() => {router.back()}} 
          > 
            <Text style={isDarkMode ? styles.schedulebuttontext : {...styles.schedulebuttontext, color: textColorLight}}>Cancel</Text>
          </Pressable>

          <Pressable 
            style={
              ({pressed}) =>
               isDarkMode ?
              pressed ? 
              {...styles.schedulebutton, backgroundColor:secondaryColor}
               : 
              {...styles.schedulebutton}
              :
              pressed ? 
              {...styles.schedulebutton, backgroundColor:secondaryColorLight}
               : 
              {...styles.schedulebutton}
            }
            onPress={handleSubmit(handleAddReminder)} 
          > 
            <Text style={isDarkMode ? styles.schedulebuttontext : {...styles.schedulebuttontext, color: textColorLight}}>Done</Text>
          </Pressable>

        </View>
      </View>

    </View>
  )
}


