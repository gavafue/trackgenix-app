import styles from './tasks.module.css';
import Table from '../Shared/Table';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, deleteTask } from '../../redux/tasks/thunks';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage,
  getSelectedItem,
  cleanSelectedItem
} from '../../redux/tasks/actions';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  const isPending = useSelector((state) => state.tasks.isPending);
  const feedbackInfo = useSelector((state) => state.tasks.infoForFeedback);
  const deleteInfo = useSelector((state) => state.tasks.infoForDelete);
  const showDelete = useSelector((state) => state.tasks.showDeleteMessage);
  const showFeedback = useSelector((state) => state.tasks.showFeedbackMessage);

  const history = useHistory();
  const editData = (row) => {
    dispatch(getSelectedItem(row));
    history.push(`/tasks/form/`);
  };
  const createTask = () => {
    history.push('/tasks/form/');
  };

  const deleteHandler = () => {
    dispatch(deleteTask(deleteInfo));
  };

  useEffect(() => {
    dispatch(cleanSelectedItem());
    dispatch(getTasks());
  }, []);

  const taskData =
    tasks &&
    tasks.map((task) => ({
      ...task,
      nameProject: task.nameProject?.name || 'Project Not Found',
      nameProjectId: task.nameProject?._id
    }));

  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div className={styles.buttonContainer}>
        <Button onClick={createTask} label="Add new task" />
      </div>
      <Table
        data={taskData}
        headersName={['Project', 'Description', 'Week', 'Day', 'Hours']}
        headers={['nameProject', 'description', 'week', 'day', 'hours']}
        setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        setInfoForDelete={(taskId) => dispatch(setInfoForDelete(taskId))}
        editData={editData}
        deleteTask={deleteHandler}
      />
      <Modal
        isOpen={showDelete}
        handleClose={() => {
          dispatch(showDeleteMessage(!showDelete));
        }}
      >
        <DeleteMessage
          handleClose={() => {
            dispatch(showDeleteMessage(!showDelete));
          }}
          infoForDelete={deleteInfo}
          deleteItem={deleteHandler}
          setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default Tasks;
