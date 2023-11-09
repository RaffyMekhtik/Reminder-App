import { View, Text, Pressable, FlatList, SafeAreaView, StatusBar, NativeModules, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import styles from '../style'
import { connect, useDispatch, useSelector } from 'react-redux';
import ReminderCard from './Components/ReminderCard'
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { clearAllReminders } from '../Context/Actions/listActions'

export default function index() {
  const dispatch = useDispatch()
  const { StatusBarManager } = NativeModules;
  const [show, setShow] = useState(false)
  const data = useSelector((state) => state.listReducer.reminders)
  
  const toggleShowModal = () => {setShow(prev => !prev)}

  const reminders = (
    data.map( (item, index) => {
      return (
        <View style={
          index == 0 ? 
          {...styles.reminderlist,
            borderTopWidth:3,
            borderTopColor:'#5C5470'
          } : styles.reminderlist }
          key={index}
        >
          <ReminderCard key={item.id} props={item} />
      </View>)
    })
  )
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
     }}>
      
    <Modal transparent={true} visible={show} animationType="fade">
    <View style={styles.clearAllModalOuter}>
      <View style={styles.clearAllModal}>
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

    <View style={styles.Main}>
      <StatusBar backgroundColor='#000000' barStyle='light-content' />


      <View style={styles.header}>
        <Text style={styles.titletext}> All Reminders </Text>
      </View>
      
      <View style={styles.body}>

        <View style={styles.modalbutton}>

          <Pressable onPress={toggleShowModal}>
            <Ionicons name='remove-circle-outline' size={30} color="white"/>
          </Pressable>
          
          <Pressable>
            <Link href={'/addReminder'}>
            <Ionicons name='add-circle-outline' size={30} color="white"/>

            </Link>
          </Pressable>

        </View>
        
        <ScrollView>
          { reminders }
        </ScrollView>
        
      </View>

     
      
      

    </View>
    </SafeAreaView>
  )
}

