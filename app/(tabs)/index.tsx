import React from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";

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
      <Header />
      <EmptyState />
    </SafeAreaView>
  );
}
