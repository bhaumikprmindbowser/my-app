import React, {useState, useRef} from "react";
import {View, Alert, FlatList} from "react-native";
import {StyleSheet} from "react-native";
import {useSelector, useDispatch} from "react-redux";

import {
  addTaskAction,
  toggleDoneAction,
  editTaskAction,
  removeTaskAction
} from "@/store/taskSlice";

import {AddTaskModal} from "@/components/AddTaskModal";
import {Header} from "@/components/Header";
import {AddItemButton} from "@/components/AddItemButton";
import {TasksList} from "@/components/TaskList";
import {EditTaskModal} from "@/components/EditTaskModal";

import {useDropdown} from "@/hooks/useDropdown";
import {colors} from "@/theme";
import {AppDispatch, RootState} from "@/store";
import {PriorityType, Task} from "@/types";
import {getRandomInt} from "@/utils";
import { useDatabase } from "@/context/Database";

const dropdownItems = [
  {label: "Critical", value: PriorityType.Critical},
  {label: "High", value: PriorityType.High},
  {label: "Medium", value: PriorityType.Medium},
  {label: "Low", value: PriorityType.Low}
];

export default function TodoScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const {db} = useDatabase();

  const [task, setTask] = useState({
    id: 0,
    title: "",
    description: "",
    priority: "",
    done: false
  });
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const flatListRef = useRef<FlatList<Task> | null>(null);

  const {
    dropdownOpen,
    setIsDropdownOpen,
    dropdownValue,
    setDropdownValue,
    items,
    setItems
  } = useDropdown(dropdownItems);

  const triggerEditTask = (task: Task) => {
    setTaskToEdit(task);
    setEditModalVisible(true);
  };

  const handleChangeTitle = (value: string) => setTask({...task, title: value});
  const handleChangeDesc = (value: string) =>
    setTask({...task, description: value});

  const handleCancelAdd = () => {
    setAddModalVisible(false);
    setTask({
      title: "",
      description: "",
      priority: "",
      done: false,
      id: getRandomInt(1, 1000000)
    });
    setDropdownValue(null);
  };
  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setTaskToEdit(null);
  };

  const handleAddTask = async () => {
    if (
      task.title === "" ||
      task.description === "" ||
      dropdownValue === null
    ) {
      Alert.alert(
        "Please fill all fields",
        "Title, description and Priority are required to create a task",
        [{text: "OK", style: "destructive"}]
      );
      return;
    }
    
    try {
      await db?.withTransactionAsync(async () => {
        const result = await db.runAsync('INSERT INTO tasks (title, description, priority, done) VALUES (?, ?, ?, ?)',[task.title, task.description, task.priority, task.done ? 1 : 0]);
        dispatch(
          addTaskAction({
            ...task,
            priority: dropdownValue,
            id: result.lastInsertRowId
          })
        );
      });
    } catch (error) {
      console.log(error,"error")
    }
    const id = getRandomInt(1, 1000000);
    // dispatch(
    //   addTaskAction({
    //     ...task,
    //     priority: dropdownValue,
    //     id
    //   })
    // );

    setAddModalVisible(false);
    setTask({
      title: "",
      description: "",
      priority: "",
      done: false,
      id
    });
    setDropdownValue(null);

    if (tasks.length > 1) flatListRef.current?.scrollToEnd();
  };

  const handleCheck = async (id: number) => {
    try {
      await db?.withTransactionAsync(async () => {
        await db.runAsync('UPDATE tasks SET done = CASE WHEN done = 1 THEN 0 ELSE 1 END WHERE id = ?',[id]);
      });
      dispatch(toggleDoneAction(id));
    } catch (error) {
      console.log(error,"error")
    }
    // dispatch(toggleDoneAction(id));
  };
  const handleEdit =  async (id: number, data: Task) => {
    try {
      await db?.withTransactionAsync(async () => {
        await db.runAsync('UPDATE tasks SET title = ?, description = ?, priority = ?, done = ? WHERE id = ?',[data.title,data.description,data.priority,data.done ? 1 : 0]);
      });
      dispatch(editTaskAction({id, data}));
    } catch (error) {
      console.log(error,"error")
    }
    // dispatch(editTaskAction({id, data}));
    setEditModalVisible(false);
  };
  
  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteTask(id) }
      ]
    );
  };

  const deleteTask = async (id: number) => {
    try {
      await db?.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM tasks WHERE id = ?',[id]);
      });
      dispatch(removeTaskAction(id));
    } catch (error) {
      console.log(error,"error")
    }
    // dispatch(removeTaskAction(id));
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          title="Todos"
          subtitle="Things that you may require to do"
        />

        <TasksList
          tasks={tasks}
          flatListRef={flatListRef}
          triggerEditTask={triggerEditTask}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />

        <AddItemButton
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
        />

        <AddTaskModal
          open={addModalVisible}
          handleChangeTitle={handleChangeTitle}
          handleChangeDesc={handleChangeDesc}
          task={task}
          handleCancel={handleCancelAdd}
          handleAddTask={handleAddTask}
          dropdownOpen={dropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
          items={items}
          setItems={setItems}
        />

        <EditTaskModal
          open={editModalVisible}
          task={taskToEdit}
          handleCancel={handleCancelEdit}
          handleEdit={handleEdit}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    paddingTop: 48,
    paddingHorizontal: 24
  }
});
