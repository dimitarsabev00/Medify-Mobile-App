import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { getLocalStorage } from "@/services/storage";

export default function TabsLayout() {
  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);

    if (!userInfo) {
      router.replace("/auth");
    }
  };

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addNew"
        options={{
          tabBarLabel: "Add New",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
