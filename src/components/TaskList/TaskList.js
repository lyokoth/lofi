// components/TaskManager.js
import { useState, useEffect } from 'react';
import { db, auth } from 'src/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Button } from 'src/components/ui/Button';
import './TaskList.css';

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCollection);
    const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;
    await addDoc(collection(db, 'tasks'), {
      text: newTask,
      userId: user.uid,
      createdAt: new Date()
    });
    setNewTask('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
    fetchTasks();
  };

  return (
    <div className="task-manager">
      <h1>Your Tasks</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
