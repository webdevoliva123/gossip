import { Pressable, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/expo'

const PROFILE_TAB = () => {
  const {signOut} = useClerk()
  return (
    <ScrollView className='bg-surface' contentInsetAdjustmentBehavior='automatic'>
      <Text className='text-lg font-medium text-white'>Profile Tab </Text>
      <Pressable onPress={() => signOut()}><Text className='text-red-500'>Sign Out</Text></Pressable>
    </ScrollView>
  )
}

export default PROFILE_TAB
