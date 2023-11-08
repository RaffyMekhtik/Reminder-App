import { View, Text, Pressable, FlatList, SafeAreaView, StatusBar, NativeModules, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import styles from '../style'
import { connect, useDispatch, useSelector } from 'react-redux';
import ReminderCard from './Components/ReminderCard'
import { RectButton } from 'react-native-gesture-handler';

export default function index() {
  const { StatusBarManager } = NativeModules;
  const data = useSelector((state) => state.listReducer.reminders)
  

  const reminders = (
    data.map( (item, index) => {
      return (
        <View style={
          index == 0 ? 
          {...styles.reminderlist,
            borderTopWidth:3,
            borderTopColor:'#5C5470'
          } : styles.reminderlist }
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
    <View style={styles.Main}>
      <StatusBar backgroundColor='#000000' barStyle='light-content' />


      <View style={styles.header}>
        <Text style={styles.titletext}> All Reminders </Text>
      </View>
      
      <View style={styles.body}>

        <View style={styles.modalbutton}>
        <Pressable>
          <Link href={'/modal'}>
            <Text style={{fontSize:30, color:'white'}}>+</Text>
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

