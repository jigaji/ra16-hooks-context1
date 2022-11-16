import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

const Details = ({ info }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!info.id) return;

    const fetchData = async () => {
      try {
        setData(null);
        const response = await fetch(`${process.env.REACT_APP_INITIAL_URL}${info.id}.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const profileData = await response.json();
        setData(profileData);
      } catch(e) {
        console.error(e);
      }
    }

    return fetchData();

  }, [info.id]);

  if (!data) return null;

  return (
    <div className="ui red card">
      <div className="image">
        <img src={data.avatar} alt="avatar" />
      </div>
      <div className="content">
        <p className="header">{data.name}</p>
        {Object.keys(data.details).map((key) => (
          <div className="description" key={shortid.generate()}>
            <b>{key}</b>: {data.details[key]}
          </div>
        ))}
      </div>
    </div>
  );
};

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default Details;