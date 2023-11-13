import { View, Text, Pressable, FlatList, SafeAreaView, StatusBar, NativeModules, ScrollView, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import {accentColor, backgroundColor, backgroundColorLight, secondaryColor, secondaryColorLight, styles, textColor, textColorLight} from '../style'
import { connect, useDispatch, useSelector } from 'react-redux';
import ReminderCard from './Components/ReminderCard'
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { clearAllReminders,toggleDark } from '../Context/Actions/listActions'

export default function index() {
  const dispatch = useDispatch()
  const { StatusBarManager } = NativeModules;
  const [show, setShow] = useState(false)
  const [showTopButton, setShowTopButton] = useState(false)
  const data = useSelector((state) => state.listReducer.reminders)
  const isDarkMode = useSelector((state) => state.listReducer.isDarkMode)
  
  const toggleShowModal = () => {setShow(prev => !prev)}

  const reminders = (
    data.map( (item, index) => {
      return (
        <View style={
          index == 0 ?
          isDarkMode? 
          {
            ...styles.reminderlist, 
            borderTopWidth:3,
            borderTopColor:secondaryColor
          }
          : 
          {
            ...styles.reminderlist, 
            borderTopWidth:3,
            borderTopColor:'black'
          } 
          : 
          styles.reminderlist 
        }
          key={index}
        >
          <ReminderCard key={item.id} props={item} />
      </View>)
    })
  )

  var scrollObject;

  const onScroll = (event) => {
    var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    if(direction == 'down'){
      setShowTopButton(true)
    }else{
      setShowTopButton(false)
    }
  }

  return (
    <SafeAreaView style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
     }}>
      
    <Modal transparent={true} visible={show} animationType="fade">
    <View style={styles.clearAllModalOuter}>
      <View style={isDarkMode ? styles.clearAllModal : {...styles.clearAllModal, backgroundColor:backgroundColorLight}}>
        <Text
          style={{
            textAlign:'center',
            fontSize:20,
          }}
        >
        Are you sure you want to clear all reminders?
        </Text>
        <View
        style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-around',
          width:'100%',
          marginTop:20
        }}>
          <Pressable onPress={toggleShowModal}>
          <Text
          style={{
            textAlign:'center',
            fontSize:20,
          }}
        >Cancel</Text>
          </Pressable>
          <Pressable 
            onPress={() => 
            {
              toggleShowModal()
              dispatch(clearAllReminders())
            }}>
          <Text
          style={{
            textAlign:'center',
            fontSize:20,
          }}
        >Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
    </Modal>

    <View style={isDarkMode ? styles.Main : {...styles.Main, backgroundColor:backgroundColorLight}}>
    

      <StatusBar backgroundColor='#000000' barStyle='light-content' />

      <ScrollView
        
        ref={ref => scrollObject = ref}
        onScroll={(nativeEvent) => onScroll(nativeEvent)}
      >
      <View style={isDarkMode ? styles.header : {...styles.header, backgroundColor:secondaryColorLight}}>
        {
          isDarkMode?

          <Pressable style={({pressed}) => pressed ? {backgroundColor:'grey', borderRadius:25, padding:5} : {padding:5}} onPress={() => {dispatch(toggleDark())}}>
            <Ionicons name='sunny' size={30} color="yellow"/>
          </Pressable>
          :
          <Pressable style={({pressed}) => pressed ? {backgroundColor:'lightgrey', borderRadius:25, padding:5} : {padding:5}} onPress={() => {dispatch(toggleDark())}}>
            <Ionicons name='moon' size={25} color="black"/>
          </Pressable>
        }
        <Text style={isDarkMode ? styles.titletext : {...styles.titletext, color:textColorLight}}> All Reminders </Text>
      </View>
      
      <View style={styles.body}>
      
        <View style={styles.modalbutton}>

          <Pressable onPress={toggleShowModal}>
            <Ionicons name='remove-circle-outline' size={30} color={isDarkMode ? textColor : textColorLight}/>
          </Pressable>
          
          <Pressable>
            <Link href={'/addReminder'}>
            <Ionicons name='add-circle-outline' size={30} color={isDarkMode ? textColor : textColorLight}/>

            </Link>
          </Pressable>

        </View>
          
          { reminders }

      </View>
        
     </ScrollView>

      {
        showTopButton &&
        <Pressable 
        style={isDarkMode ? styles.scrollToTopButton : {...styles.scrollToTopButton, backgroundColor:accentColor}} 
        onPress={() => scrollObject.scrollTo({x: 0, animated: true})}
        >
          <Ionicons name='arrow-up' size={30} color={isDarkMode ? textColor : textColorLight}/>
        </Pressable>
      }
      
    </View>
    </SafeAreaView>
  )
}

