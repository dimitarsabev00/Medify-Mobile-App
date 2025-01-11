import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image
          source={require("../../assets/images/login.png")}
          style={styles?.image}
        />
      </View>

      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          marginTop: -20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          Stay on Track, Stay Healthy!
        </Text>

        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 17,
            marginTop: 20,
          }}
        >
          Track your meds, take control of your health. Stay consitent, stay
          confident
        </Text>

        <TouchableOpacity
          style={styles?.button}
          onPress={() => router.push("auth/signIn")}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: Colors.PRIMARY,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            marginTop: 10,
          }}
        >
          Note: By Clicking Continue button, you will agree to our terms and
          condition
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 450,
    borderRadius: 23,
    borderWidth: 3,
  },
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 99,
    marginTop: 25,
  },
});
