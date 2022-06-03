import styles from './tasks.module.css';
import TasksTable from './Table';
import { useEffect, useState } from 'react';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    fetch(`${url}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteTask = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/tasks/${string}`
    };
    fetch(options.url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.error === true) {
          setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
        } else {
          setContentFeedbackModal({ title: 'Request done!', description: res.message });
          setTasks(tasks.filter((task) => task._id !== string));
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <TasksTable
        tasks={tasks}
        deleteTask={deleteTask}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <button className={styles.addBtn}>
        <a href="/tasks/form">Add New Task</a>
      </button>
    </section>
  );
};

export default Tasks;
