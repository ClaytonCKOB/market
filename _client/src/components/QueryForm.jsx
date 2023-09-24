import { useState } from "react";


function QueryForm({selectedQueryIndex, fetchData}){
    const typeMessages = ["Digite o nome do fornecedor: " ,"Digite o turno: "];
    const placeholders = ["Fornecedor A", "Noite"];
    const placeholder = (selectedQueryIndex === 5 || selectedQueryIndex === 6) ? placeholders[0] : placeholders[1];
    const label = (selectedQueryIndex === 5 || selectedQueryIndex === 6) ? typeMessages[0] : typeMessages[1];
    const [param, setParam] = useState("");

    const handleChange = (e) => {
        setParam(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(param);
    }

    return (
        selectedQueryIndex > 4 ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="param">{label}</label>
            <input
              name="param"
              type="text"
              id="param"
              placeholder={placeholder}
              autoFocus={true}
              onChange={handleChange}
            />
            <button type="submit">Consultar</button>
          </form>
        ) : <form onSubmit={handleSubmit}>
                <button type="submit">Consultar</button>
            </form>
      );
}


export default QueryForm;   