import Button from 'Components/Shared/Button';
import { getSelectedAdmin } from 'redux/admins/actions';
import { useDispatch } from 'react-redux';
import styles from 'Components/SuperAdmin/Table/table.module.css';

const Table = ({ data, headersName, headers, setShowModal, setInfoForDelete }) => {
  const dispatch = useDispatch();
  return (
    <table className={styles.container}>
      <thead className={styles.headers}>
        <tr>
          {headersName.map((headerName, index) => {
            return <th key={index}>{headerName}</th>;
          })}
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row._id} id={row._id}>
              {headers.map((header, index) => {
                return (
                  <td key={index} className={styles.rows}>
                    {row[header]}
                  </td>
                );
              })}
              {/* <td className={styles.rows}>
                <Button onClick={() => editData(row)} label="Edit" />
              </td> */}
              <td className={styles.rows}>
                <Button
                  label="Change Status"
                  theme="secondary"
                  onClick={() => {
                    setShowModal(true);
                    setInfoForDelete(row._id);
                    dispatch(getSelectedAdmin(row));
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
