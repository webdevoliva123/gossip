import { AnimatedOrb } from '@/components/AnimatedOrb'
import useAuthSocial from '@/hooks/useAuthSocial'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from "expo-blur"
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Dimensions, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get("window")

const AUTH_SCREEN = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial()
  const isLoading = loadingStrategy !== null


  return (
    <View className='flex-1 bg-surface-dark'>
      {/* animated */}
      <View className="absolute inset-0 overflow-hidden">
        <LinearGradient
          colors={["#0D0D0F", "#1A1A2E", "#16213E", "#0D0D0F"]}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <AnimatedOrb
          colors={["#3E7A68", "#1F3F36"]}
          size={300}
          initialX={-80}
          initialY={height * 0.1}
          duration={4000}
        />
        <AnimatedOrb
          colors={["#1F3F36", "#2e564b"]}
          size={250}
          initialX={width - 100}
          initialY={height * 0.3}
          duration={5000}
        />
        <AnimatedOrb
          colors={["#224138", "#114436"]}
          size={200}
          initialX={width * 0.3}
          initialY={height * 0.6}
          duration={3500}
        />
        <AnimatedOrb
          colors={["#3E7A68", "#3E7A68"]}
          size={180}
          initialX={-50}
          initialY={height * 0.75}
          duration={4500}
        />

        <BlurView
          intensity={70}
          tint="dark"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </View>
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
            <Pressable className='flex-1 bg-white/95 rounded-2xl py-4 flex-row items-center justify-center gap-2 active:scale-[0.97]' 
            disabled={isLoading} 
            onPress={() => !isLoading && handleSocialAuth("oauth_google")}
            accessibilityLabel='Continue With Google'
            accessibilityRole='button'
             >
              {loadingStrategy !== "oauth_google" ? 
              <Image source={require("../../assets/images/google.png")} style={{
                width: 20,
                height: 20,
                objectFit: "contain"
              }} /> 
              : 
              <ActivityIndicator size={"small"} color={"#000"} />}
              <Text className='text-lg text-gray-700 font-semibold text-foreground'> Google</Text>
            </Pressable>

            <Pressable 
            className='flex-1 bg-white/10 border border-white/20 rounded-2xl py-4 flex-row items-center justify-center gap-2 active:scale-[0.97]' 
            disabled={isLoading} 
            onPress={() => !isLoading && handleSocialAuth("oauth_apple")} 
            accessibilityLabel='Continue With Apple'
            accessibilityRole='button'
            >
              {loadingStrategy !== "oauth_apple" ? 
              <Ionicons name='logo-apple' size={24} color={"#fff"} /> 
              : 
              <ActivityIndicator size="small" color="#fff" />}
              <Text className='text-lg text-foreground font-semibold text-foreground'> Apple</Text>
            </Pressable>
          </View>
        </View>


      </SafeAreaView>
    </View>
  )
}

export default AUTH_SCREEN
