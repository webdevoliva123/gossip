import { ActivityIndicator, Alert, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import useAuthSocial from '@/hooks/useAuthSocial'

const { width, height } = Dimensions.get("window")

const AUTH_SCREEN = () => {
  const {handleSocialAuth, errorStrategy, loadingStrategy} = useAuthSocial()

  useEffect(() => {
    if(errorStrategy?.strategy && errorStrategy?.message) {
      Alert.alert("Authentication Error", errorStrategy.message)
    }
  },[errorStrategy])

  return (
    <View className='flex-1 bg-surface-dark'>
      {/* animated */}
      <View className='absolute inset-0 overflow-hidden'></View>
      {/* Safeare View */}
      <SafeAreaView className='flex-1'>
        {/* Top Section - Branding */}
        <View className='items-center pt-10 gap-1'>
          <Text className=' text-5xl font-bold text-accent  tracking-wider text-center font-sans'>Gossip<Text className='text-primary'>.</Text></Text>

        </View>
        {/* Center Section - Hero Bg */}
        <View className='flex-1 items-center justify-center px-6'>
          <Image source={require("../../assets/images/auth-onboarding.svg")} style={{
            width: width * 0.94,
            height: height * 0.3,
            resizeMode: "contain"
          }} />
          <View className='mt-6 items-center'>
            <Text className=' text-5xl font-bold text-foreground  text-center  font-sans'>Connect & Chat </Text>
            <Text className='text-4xl text-accent font-bold  tracking-wider font-mono'>Seamlessly.</Text>
          </View>
          {/* Auth buttons */}
        <View className='flex-row gap-4 mt-10 '>
          {/* Pressable Component */}
          <Pressable className='flex-1 bg-white/95 rounded-2xl py-4 flex-row items-center justify-center gap-2 active:scale-[0.97]' disabled={loadingStrategy !== null} onPress={() => handleSocialAuth("oauth_google")} >
          { loadingStrategy !== "oauth_google"  ?<Image source={require("../../assets/images/google.png")} style={{
            width: 20,
            height: 20,
            objectFit: "contain"
          }}  /> : <ActivityIndicator size={"small"} color={"#000"} />}
          <Text className='text-lg text-gray-700 font-semibold text-foreground'> Google</Text>
          </Pressable>

          <Pressable className='flex-1 bg-white/10 border border-white/20 rounded-2xl py-4 flex-row items-center justify-center gap-2 active:scale-[0.97]' disabled={loadingStrategy !== null} onPress={() => handleSocialAuth("oauth_apple")} >
          { loadingStrategy !== "oauth_apple"  ?<Ionicons name='logo-apple' size={24} color={"#fff"} /> : <ActivityIndicator size="small" color="#fff" />}
            <Text className='text-lg text-foreground font-semibold text-foreground'> Apple</Text>
          </Pressable>
        </View>
        </View>

        
      </SafeAreaView>
    </View>
  )
}

export default AUTH_SCREEN
