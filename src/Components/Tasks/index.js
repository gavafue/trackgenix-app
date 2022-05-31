import styles from './tasks.module.css';
import TasksTable from './Table';
import { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const changeVisibilityDeleteModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
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
  const deleteTask = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/tasks/${string}`
    };
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.error === true) {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      } else {
        setContentFeedbackModal({ title: 'Request done!', description: res.message });
        setTasks(tasks.filter((task) => task._id !== string));
        changeVisibilityDeleteModal('none');
      }
    });
  };
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <TasksTable
        tasks={tasks}
        deleteTask={deleteTask}
        changeVisibilityDeleteModal={changeVisibilityDeleteModal}
      />
      <button className={styles.addBtn}>
        <a href="/tasks/form">Add New Task</a>
      </button>
    </section>
  );
};

export default Tasks;
