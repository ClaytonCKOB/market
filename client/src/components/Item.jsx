export function Item({description, price, quatity, total}){
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap  px-6 py-4 font-medium">{description}</td>
            <td className="whitespace-nowrap  px-6 py-4">R$ {price}</td>
            <td className="whitespace-nowrap  px-6 py-4">{quatity}x</td>
            <td className="whitespace-nowrap  px-6 py-4">R$ {total}</td>
        </tr>
    );
}