export function ListItems() {

    return (
        <div className="flex flex-col w-8/12">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light">
                        <thead
                            className="border-b bg-neutral-800 font-medium dark:border-neutral-500 text-white">
                            <tr>
                            <th scope="col" className=" px-6 py-4">Item</th>
                            <th scope="col" className=" px-6 py-4">Valor Un.</th>
                            <th scope="col" className=" px-6 py-4">Quantidade</th>
                            <th scope="col" className=" px-6 py-4">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}