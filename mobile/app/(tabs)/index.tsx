
import ChatItem from '@/components/ChatItem'
import EmptyUI from '@/components/EmptyUI'
import { useChats } from '@/hooks/useChats'
import { ChatDType } from '@/types'
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native'

const CHATS_TAB = () => {
  const { resData: chats, error, loading } = useChats()
  const router = useRouter()

  function handlePressChat(item: ChatDType) {
    router.push({
      pathname : "/chat/[id]",
      params : {
        id : item._id,
        participantId : item.participant._id,
        name : item.participant.name,
        avatar : item.participant.avatar
      }
    })
  }

  if (loading) return <View className='flex-1 bg-surface justify-center'><ActivityIndicator size={"large"} color={"#f4A261"} /></View>
  if (error) return <View className='flex-1  bg-surface items-center justify-center'><Text className='text-orange-500 font-semibold'>Failed to load chats.</Text></View>
  return (
    <View className='flex-1 bg-surface'>
      <FlatList
        data={chats as ChatDType[]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ChatItem chat={item} onPress={() => handlePressChat(item)} />}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior={"automatic"}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={<EmptyUI 
          title='No Chats Yet!' 
          subtitle='Start a conversation' 
          iconColor={'#6b6b70'}
          iconSize={64}
          buttonLabel='New Chat'
          onPressButton={() => Alert.alert("Ok")}
          />}
      />
    </View>
  )
}

const Header = () => {
  return (
    <View className='px-5 pt-2 pb-4'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-2xl font-bold text-foreground'>Chats</Text>
        <Pressable className='size-10 bg-primary rounded-full items-center justify-center'>
          <Ionicons name='create-outline' size={20} color={"#0d0d0f"} />
        </Pressable>
      </View>
    </View>
  )
}



export default CHATS_TAB
