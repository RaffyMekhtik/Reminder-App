import { View, Text, Button } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Provider } from 'react-redux'
import { persistor, store } from '../Context/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function StackLayout() {
    const router = useRouter()
  return (
    <Provider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
    <Stack>

        <Stack.Screen name='index' options={{
          headerShown:false,
          headerTitle: 'All Reminders',
          headerTitleAlign: 'center',
          headerRight: () => <Button title='+' onPress={ () => router.push('modal')} />
        }} />

        <Stack.Screen 
          name='addReminder' 
          options={{
             headerTitle: 'Modal', 
             headerShown: false,
             }} 
          />

    </Stack>
    </PersistGate>
    </Provider>
  )
}