import React, {SetStateAction, Dispatch} from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";

import {colors, fonts} from "@/theme";

type AddItemButtonProps = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export const AddItemButton = ({
  modalVisible,
  setModalVisible
}: AddItemButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom
    right: 20, // Distance from the right
    width: 50,
    height: 50,
    borderRadius: 25, // Make it round
    backgroundColor: colors.backgroundDark, // Set your button color
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 24, // Adjust font size as needed
    textAlign: 'center',
    lineHeight: 26,
  },
});
