import { useState,useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web';

const App =() => {

  const[cart,setCart] = useState([])
  const[allItems,setAllItems] = useState([])

  useEffect(() => {
    alanBtn({
        key: '0c892e1656496db8a7f1ac4617811d332e956eca572e1d8b807a3e2338fdd0dc/stage',
        onCommand: (commandData) => {
          if (commandData.command === "getMenu") {
            setAllItems(commandData.data)
           }else if (commandData.command === "addToCart") {
            addToCart(commandData.data)
           }
        }
    });
  }, []);

  const addToCart=(menuItem) =>{
    setCart((oldCart) => {
      return [...oldCart,menuItem]
    })
  }

  return (
    <div className="App">
      <h1>List Items</h1>
      {allItems.map((menuItem) => (
          <div key={menuItem.name}>
            {menuItem.name} - {menuItem.price} -{menuItem.category}
            <button onClick={() => addToCart(menuItem )}> add to cart </button>
          </div>
        ))}
        <h1>Cart</h1>
        {cart.map(cartItem =>{
          return (
             <div key={cartItem.name}>
            {cartItem.name} - {cartItem.price} -{cartItem.category}
            </div>
          )
        })}
    </div>
  );
}

export default App;