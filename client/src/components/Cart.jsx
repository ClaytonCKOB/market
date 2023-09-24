// import './index.css';
import { ListItems } from './ListItems';
import { Infobar } from './Infobar';

function Cart(){
    return(
        <div className='flex h-screen'>
            <ListItems />
            <Infobar />
        </div>
    );
}

export default Cart;
