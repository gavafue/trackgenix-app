import DeleteModal from '../DeleteModal';
import { useState } from 'react';

const TasksTable = ({
  tasks,
  deleteTask,
  showDeleteModal,
  setShowDeleteModal,
  setShowFeedbackModal,
  showFeedBackModal
}) => {
  const editTask = (string) => {
    window.location = `/tasks/form?taskId=${string}`;
  };
  const [infoForDelete, setInfoForDelete] = useState({
    id: ''
  });
  return (
    <table>
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
        {tasks.map((task) => {
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
                    setInfoForDelete({
                      id: task._id
                    });
                    setShowDeleteModal(!showDeleteModal);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {showDeleteModal && (
        <DeleteModal
          modalId={infoForDelete.id}
          deleteTask={deleteTask}
          setInfoForDelete={setInfoForDelete}
          showFeedBackModal={showFeedBackModal}
          setShowFeedbackModal={setShowFeedbackModal}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </table>
  );
};

export default TasksTable;
