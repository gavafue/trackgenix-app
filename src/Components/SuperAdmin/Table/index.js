import Button from 'Components/Shared/Button';
import { getSelectedAdmin } from 'redux/admins/actions';
import { useDispatch } from 'react-redux';
import styles from 'Components/SuperAdmin/Table/table.module.css';

const Table = ({ data, headersName, headers, setShowModal, getIdFromRow }) => {
  const dispatch = useDispatch();
  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.headers}>
          <tr>
            {headersName.map((headerName, index) => {
              return <th key={index}>{headerName}</th>;
            })}
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.bodyContainer}>
          {data.map((row) => {
            return (
              <tr key={row._id} id={row._id} className={styles.rows}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.cell}>
                      {row[header]}
                    </td>
                  );
                })}
                <td className={styles.cell}>
                  <Button
                    label="Change Status"
                    theme="secondary"
                    onClick={() => {
                      setShowModal(true);
                      getIdFromRow(row._id);
                      dispatch(getSelectedAdmin(row));
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
