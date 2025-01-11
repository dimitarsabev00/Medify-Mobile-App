import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/colors";
import { TypeList, WhenToTake } from "../constants/options";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  FormatDate,
  formatDateForText,
  formatTime,
  getDatesRange,
} from "../services/convertDateTime";
import { db } from "../configs/firebase";
import { getLocalStorage } from "../services/storage";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function AddMedicationForm() {
  const [formData, setFormData] = useState();
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    console.log(formData);
  };

  const SaveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");
    if (
      !(
        formData?.name ||
        formData?.type ||
        formData?.dose ||
        formData?.startDate ||
        formData?.endDate ||
        formData?.reminder
      )
    ) {
      Alert.alert("Enter all fields");
      return;
    }

    const dates = getDatesRange(formData?.startDate, formData.endDate);
    console.log(dates);
    setLoading(true);

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
        dates: dates,
      });

      console.log("Date Saved!");
      setLoading(false);
      Alert.alert("Great!", "New Medicationed added successfully!", [
        {
          text: "Ok",
          onPress: () => router.push("/(tabs)"),
        },
      ]);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <View
      style={{
        padding: 25,
      }}
    >
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="medkit-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>

      {/* Type List  */}
      <FlatList
        data={TypeList}
        horizontal
        style={{
          marginTop: 5,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name == formData?.type?.name ? Colors.PRIMARY : "white",
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name == formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Does Input  */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dose Ex. 2 , 5ml"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* When To Take Dropdown  */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
          style={{
            width: "90%",
          }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start and End Date  */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "startDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={new Date(formData?.startDate) ?? new Date()}
          />
        )}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons
            style={styles.icon}
            name="calendar-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                "endDate",
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={new Date(formData?.endDate) ?? new Date()}
          />
        )}
      </View>

      {/* Set Reminder Input  */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            style={styles.icon}
            name="timer-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData?.reminder ?? "Select Reminder Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event) => {
            onHandleInputChange(
              "reminder",
              formatTime(event.nativeEvent.timestamp)
            );
            setShowTimePicker(false);
          }}
          value={new Date(formData?.reminder) ?? new Date()}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => SaveMedication()}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"white"} />
        ) : (
          <Text style={styles.buttontext}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  dateInputGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    width: "100%",
    marginTop: 25,
  },
  buttontext: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});
