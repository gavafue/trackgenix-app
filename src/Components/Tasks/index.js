import styles from './tasks.module.css';
import TasksTable from './Table';
import { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const url = `${process.env.REACT_APP_API_URL}/tasks`;
  useEffect(async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTasks(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <TasksTable tasks={tasks} />
      <button className={styles.addBtn}>
        <a href="/tasks/form">Add New Task</a>
      </button>
    </section>
  );
};

export default Tasks;
