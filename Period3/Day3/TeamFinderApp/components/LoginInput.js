import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = (props) => {
  const [userName, setUserName] = useState("t1");
  const [password, setPassword] = useState("secret");
  const [distance, setDistance] = useState("100");

  const loginHandler = () => {
    props.onLogin(userName, password, Number(distance));
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TextInput
          placeholder="Search distance to other teams"
          style={styles.input}
          /* keyboardType="numeric"
          maxLength={10} */
          onChangeText={(text) => {
            /* const numbers = text.replace(/[^0-9]/g, ""); */
            setDistance(text);
          }}
          value={distance}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="SIGN IN" onPress={loginHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default GoalInput;
