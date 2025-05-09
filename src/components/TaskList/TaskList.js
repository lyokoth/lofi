import { useState, useEffect } from 'react';
import { db, auth } from 'src/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { styled } from '@mui/material/styles';
import { IconButton, ListItem, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Styled Components
const TaskManagerContainer = styled(ReactTabs)`
  display: flex;
  background-color: var(--background-primary);
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

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

const CategorySelect = styled('select')({
  padding: '10px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontSize: '16px',
  width: '100%',
});

const CustomTabList = styled(TabList)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  padding: '0',
  marginBottom: '10px',
  listStyleType: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  backgroundColor: 'transparent',
  flex: 0.5,
  fontWeight: '500',
  fontSize: '15px',
  marginTop: '2px',
  borderRadius: '5px',
  border: '1px solid transparent',
  marginLeft: '3px',
  marginRight: '3px',
  padding: '5px',
  cursor: 'pointer',
  '&.react-tabs__tab--selected': {
    backgroundColor: 'var(--background-primary)',
    borderColor: 'var(--background-primary)',
    color: theme.palette.primary.main,
  },
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    backgroundColor: 'var(--background-primary)',
  }
}));

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories] = useState(['Work', 'Personal', 'Urgent']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const tasksCollection = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCollection);
      const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const changeStatus = async (id) => {
    const itemDoc = doc(db, 'tasks', id);
    await updateDoc(itemDoc, {
      status: 'completed',
    });
    fetchTasks();
  };

  const addTask = async () => {
    if (newTask.trim() === '' || newCategory.trim() === '') return;
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        text: newTask,
        category: newCategory,
        userId: user.uid,
        createdAt: new Date(),
        status: 'active',
      });
      setTasks([...tasks, { id: docRef.id, text: newTask, category: newCategory, userId: user.uid, createdAt: new Date(), status: 'active' }]);
      setNewTask('');
      setNewCategory('');
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    let matchesTab = true;
    if (activeTab === 1) matchesTab = task.status === 'active';
    if (activeTab === 2) matchesTab = task.status === 'completed';

    let matchesCategory = selectedCategory === '' || task.category === selectedCategory;

    return matchesTab && matchesCategory;
  });

  return (
    <TaskManagerContainer selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
      <h1>My Tasks</h1>

      <CustomTabList>
        <CustomTab>All</CustomTab>
        <CustomTab>Active</CustomTab>
        <CustomTab>Completed</CustomTab>
      </CustomTabList>

      <TabPanel>
        <TaskInput
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <CategorySelect value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </CategorySelect>
        <Button onClick={addTask} variant="contained" color="primary">Add Task</Button>
        
        <TaskList>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id}>
              <span>{task.text}</span>
              <div>
                <IconButton title="Delete Task" onClick={() => deleteTask(task.id)}>
                  <Icon icon="iconoir:cancel" />
                </IconButton>
                {task.status === 'active' && (
                  <IconButton title="Task Completed" onClick={() => changeStatus(task.id)}>
                    <Icon icon="material-symbols:check" />
                  </IconButton>
                )}
              </div>
            </TaskItem>
          ))}
        </TaskList>
      </TabPanel>
    </TaskManagerContainer>
  );
}
