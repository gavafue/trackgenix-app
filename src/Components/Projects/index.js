import { useEffect, useState } from 'react';

import Table from '../Shared/Table/index';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';
import { useHistory } from 'react-router-dom';

const Projects = () => {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const URL = `${process.env.REACT_APP_API_URL}`;

  const editData = (id) => {
    history.push(`/projects/form/${id}`);
  };
  useEffect(() => {
    setShowLoader(true);
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
        setShowLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteProject = (string) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/projects/${string}`
    };
    setShowLoader(true);
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
          setShowFeedbackMessage(true);
        } else {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          setProjects(projects.filter((project) => string !== project._id));
          setShowFeedbackMessage(true);
        }
      })
      .catch((error) => console.log(error));
    setShowLoader(false);
  };

  return (
    <section /*className={styles.container}*/>
      <div>
        <Button label="Add a Project" onClick={() => (window.location = '/projects/form')} />
        <Table
          data={projects}
          headersName={['Project', 'Description', 'Client', 'Start Date', 'End Date', 'Members']}
          headers={['name', 'description', 'client', 'startDate', 'endDate']}
          deleteProject={deleteProject}
          editData={editData}
          setShowModal={setShowDeleteMessage}
          setInfoForDelete={setInfoForDelete}
        />
        <Modal
          isOpen={showDeleteMessage}
          handleClose={() => {
            setShowDeleteMessage(false);
          }}
        >
          <DeleteMessage
            handleClose={() => {
              setShowDeleteMessage(false);
            }}
            infoForDelete={infoForDelete}
            deleteItem={deleteProject}
            setShowModal={setShowDeleteMessage}
          />
        </Modal>
        <Modal
          isOpen={showFeedbackMessage}
          handleClose={() => {
            setShowFeedbackMessage(false);
          }}
        >
          <FeedbackMessage infoForFeedback={infoForFeedback} />
        </Modal>
        {showLoader && <Loader />}
      </div>
    </section>
  );
};

export default Projects;
