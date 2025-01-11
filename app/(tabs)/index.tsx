import React from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import MedicationList from "@/components/MedicationList";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView
      style={{
        padding: 20,
        paddingTop: 0,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <ScrollView>
        <Header />
        <MedicationList />
      </ScrollView>
    </SafeAreaView>
  );
}
