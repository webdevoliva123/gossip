
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
      pathname: "/chat/[id]",
      params: {
        id: item._id,
        participantId: item.participant._id,
        name: item.participant.name,
        avatar: item.participant.avatar
      }
    })
  }

  if (loading) return <View className='flex-1 bg-surface justify-center'><ActivityIndicator size={"large"} color={"#3E7A68"} /></View>
  if (error) return <View className='flex-1  bg-surface items-center justify-center'><Text className='text-orange-500 font-semibold'>Failed to load chats.</Text></View>
  return (
    <View className='flex-1 bg-surface'>
      <FlatList
        keyExtractor={(item, index) => item?._id?.toString() || index.toString()}
        data={chats as ChatDType[]}
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
          onPressButton={() => router.push("/new-chat")}
        />}
      />
    </View>
  )
}

const Header = () => {
  const router = useRouter()
  return (
    <View className='px-5 pt-2 pb-4'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-2xl font-bold text-foreground'>Chats</Text>
        <Pressable className='size-10 bg-accent rounded-full items-center justify-center' onPress={() => router.push("/new-chat")}>
          <Ionicons name='create-outline' size={20} color={"#ffffff"} />
        </Pressable>
      </View>
    </View>
  )
}



export default CHATS_TAB
