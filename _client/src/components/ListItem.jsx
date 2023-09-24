const ListItem = ({ object }) => {
    console.log("Object:", object);
    return (    
        <li className="list-item">
            {Object.values(object).map((value) => (
                <p>{value}</p> ))}
        </li>)
}

export default ListItem;