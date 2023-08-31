const ListHeader = ({columns}) => {
    return (
        <li className="list-header">
        {columns?.map((column) => (
           <p>{column}</p> ))}
        </li>);
}

export default ListHeader;