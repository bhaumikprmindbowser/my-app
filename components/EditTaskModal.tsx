import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Alert
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import {useDropdown} from "@/hooks/useDropdown";
import {CustomModal} from "@/components/CustomModal";
import {StyleSheet} from "react-native";
import {colors, fonts} from "@/theme";

const dropdownItems = [
  {label: "Critical", value: "critical"},
  {label: "High", value: "high"},
  {label: "Medium", value: "medium"},
  {label: "Low", value: "low"}
];

export const EditTaskModal = ({open, task, handleCancel, handleEdit}) => {
  const [newTask, setNewTask] = useState(task);

  const {
    dropdownOpen,
    setIsDropdownOpen,
    dropdownValue,
    setDropdownValue,
    items,
    setItems
  } = useDropdown(dropdownItems);

  const handleChangeTitle = (value) => setNewTask({...newTask, title: value});
  const handleChangeDesc = (value) =>
    setNewTask({...newTask, description: value});

  useEffect(() => {
    setNewTask(task);
    setDropdownValue(task?.priority);
  }, [task]);

  const handleEditTask = () => {
    if (
      newTask?.title === "" ||
      newTask?.description === "" ||
      dropdownValue === null
    ) {
      Alert.alert(
        "Please fill all fields",
        "Title, description and time are required to edit a task",
        [{text: "OK", style: "destructive"}]
      );
      return;
    }

    handleEdit(newTask.id, {...newTask, priority: dropdownValue});
  };

  return (
    <CustomModal open={open}>
      <Text style={styles.modalHeading}>Edit Task</Text>

      <View style={styles.modalForm}>
        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Title</Text>
          <TextInput
            onChangeText={handleChangeTitle}
            value={newTask?.title}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Description</Text>
          <TextInput
            onChangeText={handleChangeDesc}
            value={newTask?.description}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Priority</Text>
          <DropDownPicker
            open={dropdownOpen}
            value={dropdownValue}
            items={items}
            setOpen={setIsDropdownOpen}
            setValue={setDropdownValue}
            setItems={setItems}
            placeholder="Select a priority"
            style={styles.modalFormInput}
            textStyle={styles.dropdownText}
            labelStyle={styles.dropdownLabel}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholderStyle={styles.dropdownPlaceholder}
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

          <TouchableWithoutFeedback onPress={handleEditTask}>
            <View
              style={[
                styles.modalFormAction,
                styles.primaryButton,
                {marginLeft: 6}
              ]}
            >
              <Text style={styles.modalFormActionText}>Save</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </CustomModal>
  );
};

export const styles = StyleSheet.create({
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
  dropdownText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: fonts.sm
  },
  dropdownLabel: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: fonts.sm
  },
  dropdownContainer: {
    backgroundColor: colors.backgroundLight,
    borderColor: colors.textLight
  },
  dropdownPlaceholder: {
    color: colors.textLight,
    fontFamily: fonts.regular,
    fontSize: fonts.sm
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
