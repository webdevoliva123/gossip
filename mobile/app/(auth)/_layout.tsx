import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

const AUTH_LAYOUT = () => {
    const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />
  }

  return (
    <Stack screenOptions={{
      headerShown : false
    }}/>
  )
}

export default AUTH_LAYOUT

const styles = StyleSheet.create({})