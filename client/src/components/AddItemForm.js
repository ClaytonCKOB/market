import { useState } from "react";


const AddItemForm = ({ onSubmit }) => {

    const [code,setCode] = useState('');

    const handleChange = (e) => {  
        setCode(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(code);
        setCode('');
    }


    return ( 
        <div className="add-item-form">
            <div className="add-item-form-header">
                <h3>Adicionar produto</h3>
            </div>

            
            <form onSubmit={handleSubmit}>
                <label for="codigo">Digite o código do item: </label>
                <input
                 name="codigo"
                 type="text"
                 id="codigo"
                 placeholder="Código do item" 
                 value={code}
                 autoFocus={true}
                 onChange={handleChange}/>


                <button type="submit">Adicionar</button>
            </form>
        </div>
        

    );
}

export default AddItemForm;