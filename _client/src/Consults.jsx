import React from "react";
import { useState } from "react";
import QueriesDropDownList from "./components/QueriesDropDownList";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import QueryForm from "./components/QueryForm";

const queries = [
  "Detalhes dos clientes",
  "Detalhes das categorias",
  "Vendas dos funcionarios",
  "Vendas com mais de um método de pagamento",
  "Produtos não vendidos",
  "Fornecedor com os mesmos produtos",
  "Zerar descontos de um fornecedor",
  "Detalhes das entregas",
];

const endpoints = [
  "/detalhes-clientes",
  "/detalhes-categorias",
  "/detalhes-funcionarios",
  "/vendas-mais-de-um-metodo-pag",
  "/produtos-nao-vendidos",
  "/mesmos-produtos-fornecedor",
  "/zera-desconto-fornecedor",
  "/detalhes-vendas-por-turno",
];

function Consults() {
  const [selectedQuery, setSelectedQuery] = useState("Selecione uma consulta");
  const [objects, setObjects] = useState([]);

  const fetchData = (param) => {
    const parameters = param !== "" ? ("?" +
      new URLSearchParams({
        param: param,
      })) : "";
  
    const url =
      "http://localhost:3050/api/queries" +
      endpoints[queries.indexOf(selectedQuery)] +
      parameters;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setObjects(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <div className="app">
      <header className="app-header">
        <h1>Consultas</h1>
      </header>
      <div className="querys-container">
        <div className="querys-list-header">
          <QueriesDropDownList
            key={"querys-list"}
            className="dropdown"
            queries={queries}
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
          />
          <QueryForm
            key={"querys-list-form"}
            selectedQueryIndex={queries.indexOf(selectedQuery)}
            fetchData={fetchData}
          />
        </div>
        <div className="list-container">
          <ListHeader
            key={"querys-list-header"}
            columns={objects.length > 0 ? Object.keys(objects[0]) : []}
          />
          {Array.isArray(objects) ? (
              objects.map((object) => (
                <ListItem key={object.id} object={object} />
              ))
            ) : (<div>
              {objects.info && (
                <p>
                  {objects.info}
                </p>
              )}
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Consults;
