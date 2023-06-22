const ListItem = ({ product }) => {
    return (    
        <li className="list-item">
            <p> {product.cod}</p>
            <p> {product.description}</p>
            <p> {product.price}</p>
            <p> {product.cost}</p>
        </li>)
}

export default ListItem;