import { Redirect, Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons"
import { useAuth } from "@clerk/expo";


const BottomTabLayout = () => {

      const { isSignedIn, isLoaded } = useAuth()
    
      if (!isLoaded) {
        return null
      }
    
      if (!isSignedIn) {
        return <Redirect href={'/(auth)'} />
      }


    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle : {
                backgroundColor : "#0F0F10",
                borderTopColor : "#050506",
                borderTopWidth : 1,
                height : 88,
                paddingBottom : 20,
                paddingTop : 10
            },
            tabBarActiveTintColor :"#3E7A68",
            tabBarInactiveTintColor : "#F5F5F5",
            tabBarLabelStyle : {
                fontSize : 12,
                fontWeight : "600"
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: "Chats",
                tabBarIcon: ({ color, size, focused }) => {
                   return <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color} />
                }
            }} />
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                tabBarIcon: ({ color, size, focused }) => {
                   return <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
                }
            }} />
        </Tabs>
    );
}

export default BottomTabLayout;