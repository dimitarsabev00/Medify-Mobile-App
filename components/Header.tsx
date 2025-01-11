import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../services/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/colors";
import { useRouter } from "expo-router";

export default function Header() {
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    GetUserDetail();
  }, []);

  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/smiley.png")}
            style={{
              width: 45,
              height: 45,
            }}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            Hello {user?.displayName} 👋
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/add-new-medication")}>
          <Ionicons name="medkit-outline" size={34} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}