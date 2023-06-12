import './App.css';

function App() {

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


  return (
    <div className="App">
      <header className="App-header">
        <div className="modal payment_methods">
          <div className="modal-content">
              <h2>Forma de pagamento:</h2>
              <div className="payment_item" payment="1" id="1">
                  <p>Dinheiro</p>
              </div>
              <div className="payment_item" payment="0" id="2">
                  <p>Pix</p>
              </div>
              <div className="payment_item" payment="0" id="3">
                  <p>Cartão de Crédito</p>
              </div>
              <div className="payment_item" payment="0" id="4">
                  <p>Cartão de Débito</p>
              </div>
          </div>
      </div>
      <div className="modal resume">
          <div className="modal-content">
              <div className="modal_title">
                  <h2>Resumo:</h2>
              </div>
              <div className="resume_content">

              </div>
          </div>
      </div>
      <div id="container">
          <div className="products_side">
              <input id="cod_barras" type="text"/>
              <div id="cart">
              </div>
          </div>
          <div className="info_side">
              <div id="total">
                  <p id="sub-total" className="header">SUB-TOTAL:</p>
                  <div className="card_content">
                      <p className="info_value total_value" id="price">0,00</p>
                  </div>
              </div>
              <div id="unit_value">
                  <p className="header" >VALOR UNITÁRIO:</p>
                  <div className="card_content">
                      <p className="info_value unit_value">0,00</p>
                  </div>
              </div>
              <div id="item_info">
                  <p className="header">VALOR TOTAL DO ITEM:</p>
                  <div className="card_content">
                      <p className="info_value total_value">0,00</p>
                  </div>
              </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
