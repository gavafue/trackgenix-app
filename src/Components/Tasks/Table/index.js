import styles from './table.module.css';
import DeleteModal from '../DeleteModal';
import { useState } from 'react';

const TasksTable = (props) => {
  const editTask = (string) => {
    window.location = `/tasks/form?taskId=${string}`;
  };
  const changeDisplayModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const [infoForDelete, setInfoToDelete] = useState({
    id: ''
  });
  return (
    <table className={styles.table}>
      <thead>
        <th>Project</th>
        <th>Week</th>
        <th>Day</th>
        <th>Description</th>
        <th>Hours</th>
        <th></th>
        <th></th>
      </thead>
      <tbody>
        {props.tasks.map((task) => {
          return (
            <tr key={task._id}>
              <td>{JSON.stringify(task.nameProject.name)}</td>
              <td>{task.week}</td>
              <td>{task.day}</td>
              <td>{task.description}</td>
              <td>{task.hours}</td>
              <td>
                <button onClick={() => editTask(task._id)}>edit</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setInfoToDelete({
                      id: task._id
                    });
                    changeDisplayModal('flex');
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <DeleteModal
        modalId={infoForDelete.id}
        deleteTask={props.deleteTask}
        changeVisibilityDeleteModal={props.changeVisibilityDeleteModal}
      />
    </table>
  );
};

export default TasksTable;
