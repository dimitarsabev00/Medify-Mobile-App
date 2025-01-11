import { View, Text, ScrollView } from "react-native";
import React from "react";
import AddMedicationHeader from "../../components/AddMedicationHeader";
import AddMedicationForm from "../../components/AddMedicationForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNewMedication() {
  return (
    <SafeAreaView>
      <ScrollView>
        <AddMedicationHeader />
        <AddMedicationForm />
      </ScrollView>
    </SafeAreaView>
  );
}
