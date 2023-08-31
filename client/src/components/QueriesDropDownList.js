import { useState } from "react";
function QueriesDropDownList({queries, selectedQuery, setSelectedQuery}) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => setIsActive(!isActive)}
      >{selectedQuery}</div>
      {isActive && (
        <div className="dropdown-content">
            {queries.map((query) => (
                <div onClick={(e) => {
                    setSelectedQuery(query) 
                    setIsActive(false)
                }
                }  className="dropdown-item">{query}</div>
            ))}
        </div>
      )}
    </div>
  );
}
export default QueriesDropDownList;