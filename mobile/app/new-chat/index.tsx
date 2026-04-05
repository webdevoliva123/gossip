import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import { useUsers } from '@/hooks/useUsers'
import { useChats, useGetOrCreateChat } from '@/hooks/useChats'
import { ChatDType, UserDType } from '@/types'
import EmptyUI from '@/components/EmptyUI'
import UserItem from '@/components/UserItem'

const NEW_CHAT_SREEEN = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const { resData: usersLis, loading: usersLisLoading, error: usersLisError } = useUsers()
    const { getOrCreateChatAction, loading: getOrGenLoading, error: getOrGenError } = useGetOrCreateChat()
    const { refetch: refetchChatsListing } = useChats()


    // client side filtering
    const usersFilterLis: UserDType[] = usersLis && usersLis?.filter((lis) => {
        if (!searchQuery.trim()) return lis
        const queryLowercase = searchQuery.toLowerCase()
        return lis.name.toLowerCase().includes(queryLowercase) || lis.email.toLowerCase().includes(searchQuery)
    }) || []

    const handelUserSelect = (user: UserDType) => {
        getOrCreateChatAction({
            participantId: user?._id,
            onSuccess: (chat: ChatDType) => {
                refetchChatsListing()
                router.dismiss()
                setTimeout(() => {
                    router.push({
                        pathname: "/chat/[id]",
                        params: {
                            id: chat._id,
                            participantId: chat.participant._id,
                            name: chat.participant.name,
                            avatar: chat.participant.avatar
                        }
                    })
                }, 100)
            }
        })

    }

    return (
        <SafeAreaView className='flex-1 bg-surface' edges={["top"]}>
            <View className='flex-1 bg-black/40 justify-end'>
                <View className='bg-surface rounded-t-3xl h-[100%] overflow-hidden'>
                    <View className='px-5 pt-3 pb-3  bg-surface border-b border-surface-light flex-row items-center'>
                        <Pressable
                            className="w-9 h-9 rounded-full items-center justify-center mr-2 bg-surface-card"
                            onPress={() => router.back()}
                        >
                            <Ionicons name="close" size={20} color="#2F5D50" />
                        </Pressable>

                        <View className="flex-1">
                            <Text className="text-foreground text-xl font-semibold">New chat</Text>
                            <Text className="text-muted-foreground text-xs mt-0.5">
                                Search for a user to start chatting
                            </Text>
                        </View>
                    </View>

                    {/* SEARCH BAR */}
                    <View className="px-5 pt-3 pb-2 bg-surface">
                        <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
                            <Ionicons name="search" size={18} color="#6B6B70" />
                            <TextInput
                                placeholder="Search users"
                                placeholderTextColor="#6B6B70"
                                className="flex-1 text-foreground text-sm"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* User Listing */}
                    <View className='flex-1 bg-surface'>
                        {usersLisLoading || getOrGenLoading ?
                            <View className='flex-1 bg-surface justify-center'><ActivityIndicator size={"large"} color={"#3E7A68"} /></View>
                            : (!usersFilterLis || usersFilterLis?.length == 0) ?
                                <View className="flex-1 items-center justify-center px-5">
                                    <EmptyUI iconName='person-outline' iconSize={64} iconColor='#6B6B70' title='No users found' subtitle=' Try a different search term' />
                                </View> : (
                                    <ScrollView
                                        className="flex-1 px-5 pt-4"
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: 24 }}
                                    >
                                        <Text className="text-muted-foreground text-xs mb-3">USERS</Text>
                                        {usersFilterLis.map((user) => (
                                            <UserItem
                                                key={user._id}
                                                user={user}
                                                isOnline={true}
                                                onPress={() => handelUserSelect(user)}
                                            />
                                        ))}
                                    </ScrollView>
                                )}</View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default NEW_CHAT_SREEEN