import './App.css';

function App() {
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
