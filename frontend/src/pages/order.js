import React from "react";

export default function OrderPage() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [dateOrder, setDateOrder] = React.useState('');
  const [priceOrder, setPriceOrder] = React.useState('');
  const [customerID, setCustomerID] = React.useState('');

  let formDatas = {
    orderID: "",
    itemID: "",
    quantity: "",
    orderPrice: "",
    customerID: "",
    shipID: ""
  };

  React.useEffect(() => {
    listItem();
  }, []);

  const listItem = () => {
    let url = "http://localhost:8000/order/?";
    url += "orderDate=" + dateOrder;
    url += "&orderPrice=" + priceOrder;
    url += "&customerId=" + customerID;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
        // orders.map((order) => {});
        setLoading(false);
      });
  }

  const dateChanged = (event) => {
    setDateOrder(event.target.value)
  }

  const priceChanged = (event) => {
    setPriceOrder(event.target.value)
  }

  const customerIDChanged = (event) => {
    setCustomerID(event.target.value)
  }

  const editOrder = (orderID) => {
    // console.log(orderID);
  };
  const deleteOrder = (orderID) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    // if (confirmDelete) {
    //   fetch("http://localhost:8000/order/" + orderID, {
    //     method: "DELETE",
    //   }).then((res) => {
    //     if (res.ok) {
    //       alert("Order deleted");
    //       window.location.reload();
    //     }
    //   });
    // }

  };
  const addOrder = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    formDatas = {
      orderID: "",
      itemID: "",
      quantity: "",
      orderPrice: "",
      customerID: "",
      shipID: ""
    };
    for(let key in formDatas) {
      try {
          document.getElementById(key).value = formDatas[key];
      } catch (error) {
          console.log(error);
      }
    }
  };

  const inputChanged = (event) => {
    formDatas[event.target.name] = event.target.value;
  };

  function submitForm(datas) {
    fetch("http://localhost:8000/order/add/", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
        })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if(data.code == 0){
            window.confirm(data.msg);
          }else{
            window.location.reload();
          }
        });

}

  const saveChanges = () => {
    // get the values from the form
    console.log("saving changes");
    submitForm(formDatas);
    // reload the page
    closeModal();
    // window.location.reload();

  };

  const search = () => {
    listItem();
  }

  const reset = () => {
    setDateOrder('');
    setPriceOrder('');
    setCustomerID('');
    setTimeout(() => {
      listItem();
    }, 0)
  }


  const print = (order) => {
    let iframe = document.createElement('IFRAME');
    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;size: auto;margin: 0mm;');
    document.body.appendChild(iframe);
    let doc = iframe.contentWindow.document;
    doc.write("<h2 style='margin:auto;text-align: center;'>Invoice</h2><br/>");
    let tbody = "";
    Object.keys(order).forEach(function(key) {
      let tr = "<tr>"
      tr += "<th style='border: 1px solid black;height: 50px;'>" + key + "</th>"
      tr += "<td style='border: 1px solid black;;height: 50px;'>" + order[key] + "</td>"
      tr+= "</tr>"
      tbody += tr;
    });
    let table = "<table style= 'margin:auto; border: 1px solid black; text-align: center; width: 90%;' cellspacing='0'>"
                +"<thead><tr>"
                // +"<th style='border: 1px solid black;'>itemID</th>"
                // +"<th style='border: 1px solid black;'>quantity</th>"
                // +"<th style='border: 1px solid black;'>inboundDate</th>"
                // +"<th style='border: 1px solid black;'>expirationDate</th>"
                +"</tr></thead><tbody>"
                + tbody
                +"</tbody></table>";
    
    doc.write(table);
    // doc.body.innerHTML = obj.innerHTML;
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  const closeModal = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  };
  // loading
  if (loading) {
    return <div>Loading...</div>;
  }



    return (
  <div>
    <div>
      <h1 className="title is-1">Order</h1>
      <div style={{margin: '10px'}}>
            OrderDate:
            <select placeholder="cost" value={dateOrder} onChange={dateChanged} style={{margin: '10px', padding: '10px'}}>
              <option style={{display:'none'}}></option>
              <option value="orderDate">Low to High</option>
              <option value="-orderDate">High to Low</option>
            </select>
            OrderPrice:
            <select placeholder="price" value={priceOrder} onChange={priceChanged} style={{margin: '10px', padding: '10px'}}>
              <option style={{display:'none'}}></option>
              <option value="orderPrice">Low to High</option>
              <option value="-orderPrice">High to Low</option>
            </select>
            CustomerID:
            <select value={customerID} onChange={customerIDChanged} style={{margin: '10px', padding: '10px'}}>
              <option style={{display:'none'}}></option>
              <option value="customerID_id">Low to High</option>
              <option value="-customerID_id">High to Low</option>
            </select>
            <button className="button is-primary" onClick={search} style={{margin: '10px', padding: '10px'}}>Search</button>
            <button className="button is-primary" onClick={reset} >Reset</button>
        </div>
      {/* add button */}
      <button className="button is-primary" onClick={addOrder}>Add Order</button>
    </div>



      <div className="data-table">
      <table className="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Item ID</th>
          <th>Quantity</th>
          <th>Order Date</th>
          <th>Order Price</th>
          <th>Customer ID</th>
          <th>Ship ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td>{order.itemID}</td>
            <td>{order.quantity}</td>
            <td>{order.orderDate}</td>
            <td>{order.orderPrice}</td>
            <td>{order.customerID}</td>
            <td>{order.shipID}</td>
            {/* <td>{order.state}</td>
            <td>{order.zip}</td>
            <td>{order.note}</td> */}
            <td>
              <button className="button is-warning is-fullwidth" onClick={() => print(order)}>Print</button>
              {/* <button className="button is-warning is-fullwidth" onClick={editOrder(order.orderID)}>Edit</button>
              <button className="button is-danger is-fullwidth" onClick={deleteOrder}>Delete</button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

 <div id="myModal" className="modal">
    <div className="modal-content">
      <header className="modal-header">
        <p className="modal-card-title">Add Order</p>
        <button className="button delete is-danger" aria-label="close" onClick={closeModal} >X</button>
      </header>
      <section className="modal-body">
        <form>
          <div className="field">
            <label className="label">Item ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="Item ID" id="itemID" name="itemID" onChange={inputChanged}/>
            </div>
            </div>
            <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input className="input" type="number" placeholder="Quantity" id="quantity" name="quantity" onChange={inputChanged}/>
              </div>
              </div>
              {/* <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="tel" placeholder="Email" />
              </div>
              </div> */}
              <div className="field">
            <label className="label">Order Date</label>
            <div className="control">
              <input className="input" type="text" placeholder="Order Date" id="orderDate" name="orderDate" onChange={inputChanged}/>
              </div>
              </div>
              {/* <div className="field">
            <label className="label">Order Price</label>
            <div className="control">
              <input className="input" type="text" placeholder="Order Price" id="orderPrice" name="orderPrice" onChange={inputChanged}/>
              </div>
              </div> */}
              <div className="field">
            <label className="label">Customer ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="Customer ID" id="customerID" name="customerID" onChange={inputChanged}/>
              </div>
              </div>
              <div className="field">
            <label className="label">Ship ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="Ship ID" id="shipID" name="shipID" onChange={inputChanged}/>
              </div>
              </div>
        </form>
      </section>
      <footer className="modal-footer">
        <button className="button is-success" onClick={saveChanges}>Save changes</button>
        <button className="button is-danger" onClick={closeModal}>Cancel</button>
      </footer>

      </div>
      </div>

  </div>
    );
}