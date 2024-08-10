import {TouchableWithoutFeedback, TextInput, Text, View} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {CustomModal} from "@/components/CustomModal";
import {StyleSheet} from "react-native";
import {colors, fonts} from "@/theme";
import {Task} from "@/types";
import {Dispatch, SetStateAction} from "react";
import {DropdownItem} from "@/hooks/useDropdown";

type AddTaskModalProps = {
  open: boolean;
  handleChangeTitle: (value: string) => void;
  handleChangeDesc: (value: string) => void;
  task: Task;
  handleCancel: () => void;
  handleAddTask: () => void;
  dropdownOpen: boolean;
  dropdownValue: string | null;
  items: DropdownItem[];
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  setDropdownValue: Dispatch<SetStateAction<string | null>>;
  setItems: Dispatch<SetStateAction<DropdownItem[]>>;
};

export const AddTaskModal = ({
  open,
  handleChangeTitle,
  handleChangeDesc,
  task,
  handleCancel,
  handleAddTask,
  dropdownOpen,
  dropdownValue,
  items,
  setIsDropdownOpen,
  setDropdownValue,
  setItems
}: AddTaskModalProps) => {
  return (
    <CustomModal open={open}>
      <Text style={styles.modalHeading}>Add Task</Text>

      <View style={styles.modalForm}>
        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Title</Text>
          <TextInput
            onChangeText={handleChangeTitle}
            value={task.title}
            style={styles.modalFormInput}
          />
        </View>

        <View style={styles.modalFormGroup}>
          <Text style={styles.modalFormLabel}>Description</Text>
          <TextInput
            onChangeText={handleChangeDesc}
            value={task.description}
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
            dropDownDirection="TOP"
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

          <TouchableWithoutFeedback onPress={handleAddTask}>
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
