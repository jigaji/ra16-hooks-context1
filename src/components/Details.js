import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Details({ info }) {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (info) {
      setError(false);
      setLoading(true);
      fetch(`${process.env.REACT_APP_DATA_URL}${info.id}.json`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
        });
    }
  }, [info]);

  return (
    <div className="Details">
      {isError && <p>Ошибка загрузки</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && user && (
        <div className="Details-container">
          <div className="Details-avatar"><img src={`${user.avatar}?${Math.random()}`} alt={user.name} /></div>
          <div className="Details-name">{user.name}</div>
          <div className="Details-city">City: {user.details.city}</div>
          <div className="Details-company">Company: {user.details.company}</div>
          <div className="Details-position">Position: {user.details.position}</div>
        </div>
      )}
    </div>
  );
}

Details.propTypes = {
  info: PropTypes.object,
}
Details.defaultProps = {
  info: null,
};
