import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Provider } from 'react-redux'
import { configureStore } from '../Context/store'

export default function StackLayout() {
    const router = useRouter()
    const store = configureStore()
  return (
    <Provider store={store}>
    <Stack>

        <Stack.Screen name='index' options={{
          headerShown:false,
          headerTitle: 'All Reminders',
          headerTitleAlign: 'center',
          headerRight: () => <Button title='+' onPress={ () => router.push('modal')} />
        }} />

        <Stack.Screen 
          name='modal' 
          options={{
             headerTitle: 'Modal', 
             presentation: 'modal',
             headerShown: false,
             }} 
          />

    </Stack>
    </Provider>
  )
}