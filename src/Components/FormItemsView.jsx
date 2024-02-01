import { useEffect, useState } from "react";

export const FormItemsView = ({handler}) => {
    const [invoiceItemsState, setInvoiceItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });
    const { product, price, quantity } = invoiceItemsState;
    useEffect (()=>{

    },[price]);
    useEffect (()=>{
    
     },[invoiceItemsState]);
     const onInputChange = ({ target: { name, value } }) => {
        //  console.log(name)
        // console.log(value)
        setInvoiceItemsState({ ...invoiceItemsState, [name]: value });
      }

      const onInvoiceSubmit = (event) => {
        event.preventDefault();
        if (product.trim().length <= 1) return;
        if (price.trim().length < 1) return;
        if (isNaN(price.trim())) {
          alert("error, el precio no es un numero");
          return;
        }
        if (quantity.trim().length < 1) return;
        if (isNaN(quantity.trim())) {
          alert("error, la cantidad no es un numero");
          return;
        }
    
        handler(invoiceItemsState);
        setInvoiceItemsState({
          product: '',
          price: '',
          quantity: '',
        })
       
    
      }
    return( <>
        <form className="w-50" onSubmit={onInvoiceSubmit}>
            <input className="form-control m-3" type="text" name="product" placeholder="Producto" value={product} onChange={onInputChange}></input>
            <input className="form-control m-3" type="text" name="price" placeholder="Precio" value={price} onChange={onInputChange}></input>
            <input className="form-control m-3" type="text" name="quantity" placeholder="Cantidad" value={quantity} onChange={onInputChange}></input>
            <button type="submit" className="btn btn-primary m-3">Nuevo item</button>
        </form>
    </>)
   
}