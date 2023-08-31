import React from "react";
import { useState, useEffect } from "react";
import QueriesDropDownList from "./components/QueriesDropDownList";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const queries = [
  "Consulta 1",
  "Consulta 2",
  "Consulta 3",
  "Consulta 4",
  "Consulta 5",
  "Consulta 6",
  "Consulta 7",
  "Consulta 8",
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

  useEffect(() => {
    if (selectedQuery !== "Selecione uma consulta") {
      fetch(
        "http://localhost:3050/api/queries" +
          endpoints[queries.indexOf(selectedQuery)]
      )
        .then((response) => response.json())
        .then((data) => {
          setObjects(data);
          console.log("Data: ", data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedQuery]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Consultas</h1>
      </header>
      
      <div className="consults-container">
        <QueriesDropDownList className="dropdown"
            queries={queries}
            selectedQuery={selectedQuery}
            setSelectedQuery={setSelectedQuery}
        />
        <div className="list-container">
          <ListHeader columns={objects.length > 0 ? Object.keys(objects[0]) : []} />
          {objects?.map((object) => (
            <ListItem key={object.id} object={object} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Consults;
