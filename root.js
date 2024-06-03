import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets, SafeAreaProvider } from "react-native-safe-area-context";

export default RootNavigation = () => {
  const insets = useSafeAreaInsets();
  const [favourite, setFavourite] = useState([]);
  const [input, setInput] = useState("");

  const readStorage = async () => {
    const favChar = await AsyncStorage.getItem("favChar");
    console.log(typeof favChar);

    if (favChar) {
      alert(favChar);
      const res = JSON.parse(favChar);
      setFavourite(res);
      console.log("20. satir", res, typeof res);
    } else {
      console.log("Favori numara bulunmuyor.");
    }
  };

  const writeStorage = (id) => {
    favourite.push(id);
    console.log("28. satir", favourite);

    AsyncStorage.setItem("favChar", JSON.stringify(favourite));
    readStorage();
    setInput("");
  };

  const deleteStorage = async (id) => {
    const index = favourite.indexOf(id);
    if (index > -1) {
      favourite.splice(index, 1);
      AsyncStorage.setItem("favChar", JSON.stringify(favourite));
      readStorage();
    } else alert("İlgili numara hafızada bulunmuyor.");
    setInput("");
  };

  useEffect(() => {
    readStorage();
  }, []);

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Text style={[styles.title, { marginVertical: 8 }]}>AsyncStorage Tutorial</Text>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput inputMode={"decimal"} keyboardType={"number-pad"} style={styles.textInput} value={input} onChangeText={(e) => setInput(e)} />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.inputButton} onPress={() => writeStorage(input)}>
            <Text style={styles.title}>Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputButton} onPress={() => deleteStorage(input)}>
            <Text style={styles.title}>Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
      {favourite?.length == 1 && <Text style={styles.title}>Favori numaram {favourite[0]}</Text>}
      {favourite?.length > 1 && (
        <Text style={styles.title}>
          Favori numaralarım :{" "}
          {favourite.map((e, index) => (
            <Text key={index} style={styles.title}>
              {e},
            </Text>
          ))}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inputContainer: {
    height: 100, // Keyboarddan etkilenmemesi için sabit verildi.
    width: "100%",
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  inputButton: {
    backgroundColor: "pink",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  title: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "#fff",
    height: 40,
    width: "90%",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    fontSize: 18,
    marginBottom: 8,
  },
});
