import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import React, { useEffect, useState} from "react";
import Modal from "./components/Modal";
import AddItemForm from "./components/AddItemForm";
import { useNavigate } from "react-router-dom";

function Cart() {
  
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(false);

  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    
    const keyCode = event.keyCode || event.which;

    switch (keyCode) {
      case 112: // F1 key
        event.preventDefault();
        navigate('/consults')
        break;
      case 113: // F2 key
      handleButtonTrigger(<AddItemForm onSubmit={handleAddItem} />)
        break;
      case 114: // F3 key
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  document.addEventListener('keydown', handleKeyPress);

  

  const handleAddItem = (code) => {
    fetch("http://localhost:3050/api/product/get?"+ new URLSearchParams({
      id: code
    }))
    .then((response) => response.json())
    .then((data) => {
      const { price, description, cod, cost } = data;
      const filteredProduct = { price, description, cod, cost }; 

      setProducts((prevProducts) => [...prevProducts, filteredProduct]);
      return 'success';
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      return 'error';
    });

    
  }

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]); 

  const handleButtonTrigger = (content) => {
    setOpenModal(!openModal);
    setModalContent(content);
  }


  const subtotal = products?.reduce((acc, product) => acc + product.price, 0);
  const discount = 0;
  const total = subtotal - discount;
  const headers = ['Código', 'Descrição', 'Preço', 'Custo'];
  return <div className="app">
    <header className="app-header">
      <h1>Produtos</h1> 
    </header>
    <div className="app-content">
      <div className="list-container">
        < ListHeader columns = {headers}/>
        {products?.map((product) => {
          console.log("Product:", product); // Log the product data
          return <ListItem key={product.cod} product={product} />;
        })}
      </div>
      <div className="info-box">
        <div className="info-box-subtotal">
          <h1>Subtotal</h1>
          <p>R$ {subtotal}</p>
        </div>
        <div className="info-box-discount">
          <h1>Desconto</h1>
          <p>R$ {discount}</p>
        </div>
        <div className="info-box-total">
          <h1>Total</h1>
          <p>R$ {total}</p>
        </div>
      </div>

    </div>
    
    <footer className="app-footer">
      <button onClick={() => navigate('/consults')} className="footer-button">F1  Consultas</button>
      <button className="footer-button" onClick={() => handleButtonTrigger(<AddItemForm onSubmit={handleAddItem} />)}>F2  Adicionar produto</button>
      <button className="footer-button" >F3  Finalizar compra</button>
    </footer>


    <Modal children={modalContent} isOpen={openModal} setCloseModal={() => setOpenModal(!openModal)} />
  </div>;
}

export default Cart;
