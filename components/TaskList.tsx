import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ListRenderItem
} from "react-native";
import {RefObject} from "react";
import {TaskCard} from "@/components/TaskCard";

import {colors, fonts} from "@/theme";
import {Task} from "@/types";
import { Ionicons } from "@expo/vector-icons";

type TaskListProps = {
  tasks: Task[];
  flatListRef: RefObject<FlatList<Task>>;
  triggerEditTask: (task: Task) => void;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

export const TasksList = ({
  tasks,
  flatListRef,
  triggerEditTask,
  handleCheck,
  handleDelete
}: TaskListProps) => {
  const renderItem: ListRenderItem<Task> = ({item}) => (
    <TaskCard
      item={item}
      triggerEditTask={triggerEditTask}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
    />
  );

  return (
    <View style={styles.listContainer}>
      {tasks.length === 0 ? (
        <View style={styles.noContentContainer}>
          <Ionicons name="warning-outline" size={36} style={styles.noContentImg} color={colors.yellow} />
          <Text style={styles.noContentText}>No tasks</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  noContentContainer: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center"
  },
  noContentImg: {
    tintColor: colors.yellow,
    width: 36,
    height: 36,
    marginBottom: 12
  },
  noContentText: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: fonts.sm
  }
});
