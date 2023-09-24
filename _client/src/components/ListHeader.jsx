const ListHeader = ({columns}) => {
    console.log(columns);
    return (
        columns.length > 0 ? (
        <li className="list-header">
        {columns?.map((column) => (
           <p>{column}</p> ))}
        </li>) : (<></>)
        );
}

export default ListHeader;