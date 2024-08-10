import React from "react";
import {View, Text, TouchableWithoutFeedback, TextInput} from "react-native";
import {StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {colors, fonts} from "@/theme";
import {CustomModal} from "@/components/CustomModal";

export const AddReminderModal = ({
  open,
  reminder,
  time,
  handleChangeTitle,
  handleChangeDesc,
  handleChangeTime,
  handleCancel,
  handleAddReminder
}) => {
  return (
    <CustomModal open={open}>
      <Text style={styles.modalHeading}>Add Reminder</Text>

      <View style={styles.modalForm}>
        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Title</Text>
          <TextInput
            onChangeText={handleChangeTitle}
            value={reminder.title}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Description</Text>
          <TextInput
            onChangeText={handleChangeDesc}
            value={reminder.description}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Time</Text>
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            onChange={handleChangeTime}
            display="spinner"
            style={styles.timePicker}
            textColor={colors.text}
          />
        </View>

        <View style={styles.modalFormActions}>
          <TouchableWithoutFeedback onPress={handleCancel}>
            <View
              style={[
                styles.modalFormAction,
                styles.secondaryButton,
                {marginRight: 6}
              ]}
            >
              <Text
                style={[
                  styles.modalFormActionText,
                  styles.modalFormActionTextSecondary
                ]}
              >
                Cancel
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={handleAddReminder}>
            <View
              style={[
                styles.modalFormAction,
                styles.primaryButton,
                {marginLeft: 6}
              ]}
            >
              <Text style={styles.modalFormActionText}>Add</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modalHeading: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: fonts.md,
    marginBottom: 42
  },
  modalForm: {},
  modalFormGroup: {
    marginBottom: 24
  },
  modalFormLabel: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: fonts.sm,
    marginBottom: 12
  },
  modalFormInput: {
    backgroundColor: colors.backgroundLight,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: fonts.sm,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.textLight
  },
  timePicker: {
    height: 90,
    width: "100%"
  },
  modalFormActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    zIndex: -1
  },
  modalFormAction: {
    width: 120,
    borderRadius: 12,
    padding: 12,
    marginLeft: 0
  },
  primaryButton: {
    backgroundColor: colors.primary
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary
  },
  modalFormActionText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: fonts.xs,
    textTransform: "uppercase",
    textAlign: "center"
  },
  modalFormActionTextSecondary: {
    color: colors.primary
  }
});
