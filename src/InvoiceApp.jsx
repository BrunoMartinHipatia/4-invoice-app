import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice"
import { ClientView } from "./Components/ClientView";
import { CompanyView } from "./Components/CompanyView";
import { InvoiceView } from "./Components/InvoiceView";
import { ListItemsView } from "./Components/ListItemsView";
import { TotalView } from "./Components/TotalView";
import { FormItemsView } from "./Components/FormItemsView";

const invoiceInitial = {
  id: 0,
  name: 'Componentes PC',
  client: {
    name: '',
    lastName: '',
    address: {
      country: '',
      city: '',
      street: '',
      number: 0
    }
  },
  company: {
    name: '',
    fiscalNumber: 0,
  },
  items: [

  ]
}


export const InvoiceApp = () => {
  const [activeForm, setActiveForm ] = useState(false);
  const [total, setTotal] = useState(0);
  const [invoice, setInvoice] = useState(invoiceInitial);
  const [items, setItems] = useState([]);

  const [counter, setCounter] = useState(4);


  useEffect(() => {
    const data = getInvoice();
    console.log(invoice);
    setInvoice(data);
    setItems(data.items)
  }, [])


  useEffect(() => {
    //console.log('los items cambiaron!')
    setTotal(calculateTotal(items));
  }, [items]);





  const { id, name, client, company } = invoice;






  const handlerAddItems = ({product, price, quantity}) => {

  
    setItems([...items, { id: counter, product: product.trim(), price: parseInt(price.trim(), 10), quantity: parseInt(quantity, 10) }])

    setCounter(counter + 1)
 
  }
  const handlerDeleteItem = (id) =>{
    setItems(items.filter(item =>item.id!==id));
  }
  const onActiveForm=() =>{ 
    setActiveForm(!activeForm);
  }
  return (<>

    <div className="container">
      <div className="card my-3">

        <h1 className="card-header">Ejemplo factura</h1>
        <div className="card-body">
          <InvoiceView id={id} name={name}></InvoiceView>
          <div className="row my-3">
            <div className="col">
              <ClientView title="Datos del cliente" client={client} ></ClientView>
            </div>
            <div className="col">
              <CompanyView title="Datos de la empresa" company={company}></CompanyView>
            </div>
          </div>

          <ListItemsView title="Datos de la factura" items={items} handlerDeleteItem={id=>handlerDeleteItem(id)}></ListItemsView>
          <TotalView total={total}></TotalView>
          <button className="btn btn-secondary" onClick={onActiveForm}>{!activeForm ?'Agregar Item': 'Ocultar form'}</button>
          {!activeForm || <FormItemsView handler={handlerAddItems}></FormItemsView>}

        </div>
      </div>
    </div>
  </>)
}