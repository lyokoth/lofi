// src/components/TaskManager.js
import { useState, useEffect } from 'react';
import { db, auth } from 'src/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { styled } from '@mui/material/styles';
import { Button } from 'src/components/ui/Button';

// Styled Components using MUI's styled
const TaskManagerContainer = styled('div')(({ theme }) => ({
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const TaskInput = styled('input')({
  padding: '10px',
  width: 'calc(100% - 20px)',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontSize: '16px',
});

const TaskList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
});

const TaskItem = styled('li')({
  padding: '10px',
  borderBottom: '1px solid #ddd',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  
  '&:last-child': {
    borderBottom: 'none',
  },
});

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
    <TaskManagerContainer>
      <h1>Your Tasks</h1>
      <TaskInput
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <TaskList>
        {tasks.map(task => (
          <TaskItem key={task.id}>
            {task.text}
            <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          </TaskItem>
        ))}
      </TaskList>
    </TaskManagerContainer>
  );
}
