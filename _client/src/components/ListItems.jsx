function ListItems(){
    return (
        <div className="border-black w-60-per">
            <table className="w-100-per">
                <thead className="w-100-per">
                    <tr>
                        <th>Qt.</th>
                        <th>Produto</th>
                        <th>Unid.</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>SABONETE DOVE TOP</td>
                        <td>R$ 3,99</td>
                        <td>R$ 3,99</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>PASTA DENTAL MARCA BOA</td>
                        <td>R$ 6,99</td>
                        <td>R$ 13,98</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ListItems;