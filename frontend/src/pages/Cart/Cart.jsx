import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { food_list } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { promoCode } from '../../constant';



const Cart = () => {


  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (promocode.toLowerCase() === promoCode) {
      setDiscount(0.1);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  console.log(promoCode)

  const totalAmount = getTotalCartAmount();
  const discountedAmount = totalAmount - (totalAmount * discount);
  const deliveryFee = totalAmount === 0 ? 0 : 2;
  const finalAmount = discountedAmount + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt='' />
                  <p>{item.name}</p>
                  <p>Rp{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>Rp{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rp{totalAmount}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className='cart-total-details'>
                  <p>Discount (10%)</p>
                  <p>-Rp{totalAmount * discount}</p>
                </div>
                <hr />
              </>
            )}
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>Rp{deliveryFee}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>Rp{finalAmount}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here</p>
            <form className='cart-promocode-input' onSubmit={handlePromoSubmit}>
              <input
                type='text'
                placeholder='Promo code'
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
