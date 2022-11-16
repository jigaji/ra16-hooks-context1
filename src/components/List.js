import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function List({ selectUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_DATA_URL}users.json`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return (
    <ul className="List">
      {isError && <li className="List-item">Ошибка загрузки</li>}
      {isLoading && <li className="List-item">Loading...</li>}
      {users.map((item) => {
        return <li key={item.id} className="List-item" onClick={selectUser(item)}>{item.name}</li>
      })}
    </ul>
  );
}

List.propTypes = {
  selectUser: PropTypes.func.isRequired,
}