import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import React, { useState} from "react";
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
      setProducts((prevProducts) => [...prevProducts, data]);
      return 'success';
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
      return 'error';
    });


  }

  const handleButtonTrigger = (content) => {
    setOpenModal(!openModal);
    setModalContent(content);
  }


  const subtotal = products?.reduce((acc, product) => acc + product.price, 0);
  const discount = 0;
  const total = subtotal - discount;

  return <div className="app">
    <header className="app-header">
      <h1>Produtos</h1> 
    </header>
    <div className="app-content">
      <div className="list-container">
        < ListHeader/>
        { products?.map((product) => ( <ListItem key={product.id} product={product} /> ))}
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

// function selectItemData(id_sell){
//     // Selecting data to insert into database
//     let data = [];
//     let item = [];

//     $('.item_cart').each(function(){
//        data.push({
//             'id_sells': id_sell,
//             'id_product': parseInt($(this).attr('id_product')),
//             'price': parseFloat($(this).children(".container_price").children(".item_price").text().replace(',', '.'))
//         });
//     });

//     return data;
// }

// function loadResume(){
//     let payment_method = "";
//     let total = "";

//     // Selecting payment method
//     $('.payment_item').each(function(){
//         if($(this).attr("payment") == "1"){
//             payment_method = $(this).text();
//         }
//     });

//     // Selecting total
//     total = $('#price').text();

//     $('.resume_content').html("<p>Forma de pagamento: "+payment_method+"</p><p>Total: R$ "+total+"</p>");

// }

// function selectUpperPay(){
//     let payments = $('.payment_item').toArray();
//     let i = 0;
//     let notChanged = true;

//     while(i < payments.length && notChanged){
//         if(payments[i].getAttribute('payment') == "1"){
//             if(i != 0){
//                 payments[i].setAttribute('payment', "0");
//                 payments[i - 1].setAttribute('payment', "1");
//                 updatedPayment();
//                 notChanged = false;
//             }
//         }
//         i += 1;
//     }
// }

// function selectLowerPay(){
//     let payments = $('.payment_item').toArray();
//     let i = 0;
//     let notChanged = true;

//     while(i < payments.length && notChanged){
//         if(payments[i].getAttribute('payment') == "1" && i != payments.length - 1){
//             payments[i].setAttribute('payment', "0");
//             payments[i + 1].setAttribute('payment', "1");
//             updatedPayment();
//             notChanged = false;
//         }
//         i += 1;
//     }
// }

// function updatedPayment(){
//     let color = "";

//     $(".payment_item").each(function(){
//         color = $(this).attr("payment") == "0"  ? "white" : "blue";
//         $(this).css("background-color", color);
//     });
// }

// document.onkeyup = function(e){
//     if(e.which >= 48 && e.which <= 57){
//         $('#cod_barras').val($('#cod_barras').val()+e.key);
//     }

//     switch(e.which){
//         case 121: // F10
//             if($('.payment_methods').css('display') == 'block'){
//                 $('.payment_methods').css('display', 'none');
//                 $('.resume').css('display', 'block');
//                 loadResume();
//             }else if($('.resume').css('display') == 'block'){
//                 let payment_method = "";
//                 let total = "";
//                 let _token   = $('meta[name="csrf-token"]').attr('content');

//                 // Searching the payment method
//                 $(".payment_item").each(function(){
//                     if($(this).attr("payment") == "1"){
//                         payment_method = $(this).attr('id');
//                     }
//                 });

//                 // Selecting the total of the sell
//                 total = parseFloat($('#price').text().replace(',', '.'));

//                 // Ending the sell
//                 $.ajax({
//                 url: "/createSell",
//                 type:"POST",
//                 data:{
//                     payment_method: payment_method,
//                     total: total,
//                     _token: _token
//                 },
//                 success:function(response){
//                     $.ajax({
//                         url: "/insertItens",
//                         type:"POST",
//                         data:{
//                             itens: selectItemData(response.id),
//                             _token: _token
//                         },
//                         success:function(response){
//                             // Reset all info
//                             $('#cart').html('');
//                             $('#price').text('0,00');
//                             $('.resume').css('display', 'none');
//                             $('.unit_value').text('0,00');
//                             $('.total_value').text('0,00');

//                 }});

//                 }});

//             }else{
//                 $('.payment_methods').css('display', 'block');
//                 updatedPayment();
//             }
//             break;

//         // case 13: // Enter
//         //     let cod = $("#cod_barras").val();
//         //     let _token   = $('meta[name="csrf-token"]').attr('content');

//         //     $.ajax({
//         //         url: "/searchProduct",
//         //         type:"POST",
//         //         data:{
//         //             cod: cod,
//         //             _token: _token
//         //         },
//         //         success:function(response){
//         //             let found = false;
//         //             let total = 0;

//         //             $("#cod_barras").val('');

//         //             $('.item_cart').each(function(){
//         //                 if($(this).attr('cod') == cod){
//         //                     let price = $(this).children(".container_price").children(".item_price");
//         //                     let quantity = $(this).children(".container_quantity").children(".item_quantity");

//         //                     total_of_product = (parseFloat(price.text()) + response.data.price).toFixed(2).replace('.', ',');
//         //                     price.text(total_of_product);
//         //                     quantity.text((parseFloat(quantity.text().replace('x','')) + 1).toString() + 'x');
//         //                     $('.total_value').text(total_of_product);

//         //                     found = true;
//         //                 }
//         //             });

//         //             if(!found){
//         //                 $('#cart').append('<div class="item_cart" cod="'+cod+'" id_product="'+response.data.id.toString()+'"><div class="item_description" style="flex-basis: 70%;"><p>'+response.data.description+' </p></div><div class="container_price" style="flex-basis: 20%;"><p>R$ </p><p class="item_price">'+(response.data.price).toFixed(2).replace('.',',')+'</p></div><div class="container_quantity" style="flex-basis: 10%;"><p class="item_quantity">1x</p></div></div>');
//         //                 $('.total_value').text((response.data.price).toFixed(2).replace('.', ','));
//         //             }
//         //             total = (parseFloat($('#price').text().replace(",", ".")) + response.data.price).toFixed(2).replace('.', ',');
//         //             $('#price').text(total);
//         //             $('.unit_value').text((response.data.price).toFixed(2).replace('.', ','));

//         //         }
//         //     });
//         //     break;

//         // case 27: // Esc
//         //     if($('.payment_methods').css('display') == 'block'){
//         //         $('.payment_methods').css('display', 'none');
//         //     }

//         //     if($('.resume').css('display') == 'block'){
//         //         $('.resume').css('display', 'none');
//         //     }
//         //     break;

//         // case 38: // Up arrow
//         //     if($('.payment_methods').css('display') == 'block'){
//         //         selectUpperPay();
//         //     }
//         //     break;

//         // case 40: // Down arrow
//         //     if($('.payment_methods').css('display') == 'block'){
//         //         selectLowerPay();
//         //     }
//         //     break;

//         }
//     }
