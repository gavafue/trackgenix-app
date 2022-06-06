import Button from '../Button';

const DeleteMessage = ({ resourceName }) => {
  return (
    <div>
      <h1>Delete {resourceName}</h1>
      <p>Are you sure you want to delete?</p>
      <div>
        <Button />
        <Button />
      </div>
    </div>
  );
};

export default DeleteMessage;
