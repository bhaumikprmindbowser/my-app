import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { colors } from '@/theme';
import { useDatabase } from '@/context/Database';
import { Task } from '@/types';
import { fetchTasksAction } from '@/store/taskSlice';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {db} = useDatabase()

  useEffect(() => {
    async function getTasks () {
      try {
        await db?.withTransactionAsync(async () => {
          const result = await db.getAllAsync<Task>('SELECT * FROM tasks');
          if(result) {
            const tasks: Task[] = result.map((row: any) => ({
              id: row.id,
              title: row.title,
              description: row.description,
              priority: row.priority,
              done: row.done === 1 // Convert integer to boolean
            }));
            fetchTasksAction(tasks);
          }
        });
      } catch (error) {
        console.log(error,"error")
      }
    }
    getTasks();

  },[])
  

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.violet,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'camera' : 'camera-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
