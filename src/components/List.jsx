import { useEffect, useState } from "react";

function List({handleProfile}) {
  const [names, setNames] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    const fetchData = async () => {   
      try {
        const response = await fetch(`${process.env.REACT_APP_INITIAL_URL}users.json`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const profileData = await response.json();
        setNames(profileData);
      } catch(e) {
        console.error(e);
      }
    }

    return fetchData();

  }, []);

  const handleSelect = (id, name) => {
    setSelect(id);
    handleProfile(id, name);
  };

  return (
    <div className="ui basic">
      <div className="ui vertical menu button primary">
        {names.map(({ id, name }) => (
          <div
            className={`link red item ${id === select ? "active" : ""}`}
            key={id}
            onClick={() => handleSelect(id, name)}
          >
            <div className="header">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;