import React from "react";

export default function Order() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setOrder] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:8000/order")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        orders.map((order) => {});
        setLoading(false);
      });
  }, []);

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
      {/* add button */}
      <button className="button is-primary" onClick={addOrder} >Add Order</button>
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
        </tr>
      </thead>
      <tbody>
        {order.map((order, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td>{order.itemID}</td>
            <td>{order.quantity}</td>
            <td>{order.orderDate}</td>
            <td>{order.orderPrice}</td>
            <td>{order.customerID}</td>
            <td>{order.shipID}</td>
            <td>
              <button className="button is-warning is-fullwidth" onClick={editOrder(order.orderID)}>Edit</button>
              <button className="button is-danger is-fullwidth" onClick={deleteOrder}>Delete</button>
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
        <button className="button delete is-danger" aria-label="close" onClick={closeModal}>X</button>
      </header>
      <section className="modal-body">
        <form>
          <div className="field">
            <label className="label">Item ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="Company" />
            </div>
            </div>
            <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input className="input" type="text" placeholder="Email" />
              </div>
              </div>
              <div className="field">
            <label className="label">Order Date</label>
            <div className="control">
              <input className="input" type="tel" placeholder="Phone Number" />
              </div>
              </div>
              <div className="field">
            <label className="label">Order Price</label>
            <div className="control">
              <input className="input" type="text" placeholder="Country" />
              </div>
              </div>
              <div className="field">
            <label className="label">Customer ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="Street" />
              </div>
              </div>
        </form>
      </section>
      <footer className="modal-footer">
        <button className="button is-success">Save changes</button>
        <button className="button is-danger" onClick={closeModal}>Cancel</button>
      </footer>

      </div>
      </div>

  </div>
    );
}