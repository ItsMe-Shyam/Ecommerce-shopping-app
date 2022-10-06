import React from 'react';
import './CartItem.css';
import {useDispatch} from 'react-redux';
import { addItemToCart, removeFromCart } from '../../actions/cartActions';
import {Link} from 'react-router-dom';

const CartItem = ({item}) => {
  const dispatch = useDispatch();
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemToCart(id, newQty));
  };

  const removeItem = (id) => {

    dispatch(removeFromCart(id));

  }

  return (
    <div className="item-container">
      <div className="product-img">
          <img src={item.image} alt="product Img" />
          <div>
            <Link to={`/products/${item.product}`}><p>{item.name}</p></Link>
            <p>Price: ₹{item.price}</p>
          </div>
      </div>
        <div className='item-quantity'>
            <span onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>
            <input value={item.quantity} type="number" readOnly />
            <span onClick={() => decreaseQuantity(item.product, item.quantity)}>-</span>
        </div>
        <div className="price">
            <h1>₹{item.price * item.quantity}</h1>
            <button onClick={() => removeItem(item.product)}>Remove</button>
        </div>
    </div>
  )
}

export default CartItem