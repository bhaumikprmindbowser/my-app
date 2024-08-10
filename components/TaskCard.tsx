import React from "react";
import {Image, TouchableWithoutFeedback, Text, View} from "react-native";
import {StyleSheet} from "react-native";
import {colors, fonts} from "@/theme";
import {PriorityType, Task} from "@/types";
import {Ionicons} from "@expo/vector-icons";

type TaskCardProps = {
  item: Task;
  triggerEditTask: (task: Task) => void;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const TaskCard = ({
  item,
  triggerEditTask,
  handleCheck,
  handleDelete
}: TaskCardProps) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text
          style={[styles.cardPriority, styles[item.priority as PriorityType]]}
        >
          {item.priority}
        </Text>
      </View>

      <Text style={styles.cardDescription}>{item.description}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.cardStatus}>
          <Ionicons
            name={item.done ? "checkmark-done" : "stopwatch-outline"}
            style={styles.cardActionIcon}
            size={20}
          />
          <Text style={item.done ? styles.taskDone : styles.taskPending}>
            {item.done ? "Done" : "Pending"}
          </Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableWithoutFeedback onPress={() => handleCheck(item.id)}>
            <View style={styles.cardActionButton}>
              <Ionicons
                name={
                  item.done
                    ? "close-circle-outline"
                    : "checkmark-done-circle-outline"
                }
                style={styles.cardActionIcon}
                size={20}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => triggerEditTask(item)}>
            <View style={styles.cardActionButton}>
              <Ionicons
                name={'create-outline'}
                style={styles.cardActionIcon}
                size={20}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleDelete(item.id)}>
            <View style={styles.cardActionButton}>
              <Ionicons
                name={"trash-bin-outline"}
                style={styles.cardActionIcon}
                size={20}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 12,
    elevation: 5,
    overflow: "hidden"
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    columnGap: 2
  },
  cardTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: fonts.md,
    flexWrap: "wrap",
    flex: 1
  },
  cardPriority: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: fonts.xs,
    textTransform: "uppercase"
  },
  critical: {
    color: colors.critical
  },
  high: {
    color: colors.high
  },
  medium: {
    color: colors.medium
  },
  low: {
    color: colors.low
  },
  cardDescription: {
    color: colors.text,
    fontFamily: fonts.light,
    fontSize: fonts.xs,
    marginBottom: 28
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardStatus: {
    flexDirection: "row",
    alignItems: "center"
  },
  taskDone: {
    color: colors.done,
    fontFamily: fonts.semiBold,
    fontSize: fonts.xs,
    marginLeft: 8
  },
  taskPending: {
    color: colors.pending,
    fontFamily: fonts.semiBold,
    fontSize: fonts.xs,
    marginLeft: 8
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardActionButton: {
    marginLeft: 16
  },
  cardActionIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  priority: {
    padding: 10
  }
});
