import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from './components/LoginScreen';
import TodoListScreen from './components/TodoListScreen';
import AddTaskScreen from './components/AddTaskScreen';
import TaskDetailScreen from './components/TaskDetailScreen';
import ProfileScreen from './components/ProfileScreen';
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function App() {
  const [user, setUser] = useState(false);

  const checkLogin = async () => {
    let temp = await AsyncStorage.getItem('access_token');
    if (temp) {
      setUser(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []); // Ensure that this useEffect runs only once on component mount

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path="/Profile" element={<ProfileScreen />} />
            <Route path="/TodoList" element={<TodoListScreen />} />
            <Route path="/AddTask" element={<AddTaskScreen />} />
            <Route path="/TaskDetail" element={<TaskDetailScreen />} />
            <Route path="/*" element={<Navigate to="/TodoList" />} />
          </>
        ) : (
          <>
            <Route path="/Login" element={<LoginScreen />} />
            <Route path="/*" element={<Navigate to="/Login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
