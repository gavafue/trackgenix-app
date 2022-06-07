import { useEffect, useState } from 'react';

import Table from '../Shared/Table/index';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';

const editData = (id) => {
  window.location = `/projects/form/${id}`;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const URL = `${process.env.REACT_APP_API_URL}`;

  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteProject = (string) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/projects/${string}`
    };
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
  };

  return (
    <section /*className={styles.container}*/>
      <div>
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
      </div>
      <button /*className={styles.addBtn}*/>
        <a href="/projects/form">Add a Project</a>
      </button>
    </section>
  );
};

export default Projects;
