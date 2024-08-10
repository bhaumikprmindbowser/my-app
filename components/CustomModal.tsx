import React from "react";
import {View, TouchableWithoutFeedback, Modal, Keyboard} from "react-native";
import {StyleSheet} from "react-native";
import {colors} from "@/theme";

export const CustomModal = ({open, children}) => {
  return (
    <Modal visible={open} transparent>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    backgroundColor: colors.backgroundLight,
    width: "90%",
    padding: 24,
    borderRadius: 16,
    elevation: 5
  }
});
