import React from "react";

export default function item() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:8000/item")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        items.map((item) => {});
        setLoading(false);
      });
  }, []);

  const editItem = (itemID) => {
    // console.log(itemID);
  };
  const deleteItem = (ItemID) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    // if (confirmDelete) {
    //   fetch("http://localhost:8000/item/" + itemID, {
    //     method: "DELETE",
    //   }).then((res) => {
    //     if (res.ok) {
    //       alert("Item deleted");
    //       window.location.reload();
    //     }
    //   });
    // }

  };
  const addItem = () => {
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
      <h1 className="title is-1">Item</h1>
      {/* add button */}
      <button className="button is-primary" onClick={addItem} >Add Item</button>
    </div>



      <div className="data-table">
      <table className="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>Cost</th>
          <th>Selling Price</th>
          <th>Note</th>
          <th>Supplier ID</th>
          <th>Classification</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td>{item.company}</td>
            <td>{item.email}</td>
            <td>{item.phoneNum}</td>
            <td>{item.country}</td>
            <td>{item.street}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>
            <td>{item.zip}</td>
            <td>{item.note}</td>
            <td>
              <button className="button is-warning is-fullwidth" onClick={editItem(item.itemID)}>Edit</button>
              <button className="button is-danger is-fullwidth" onClick={deleteItem} >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

 <div id="myModal" className="modal">
    <div className="modal-content">
      <header className="modal-header">
        <p className="modal-card-title">Add Item</p>
        <button className="button delete is-danger" aria-label="close" onClick={closeModal} >X</button>
      </header>
      <section className="modal-body">
        <form>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input className="input" type="text" placeholder="Description" />
            </div>
            </div>
            <div className="field">
            <label className="label">Cost</label>
            <div className="control">
              <input className="input" type="text" placeholder="Cost" />
              </div>
              </div>
              <div className="field">
            <label className="label">Selling Price</label>
            <div className="control">
              <input className="input" type="tel" placeholder="Phone Number" />
              </div>
              </div>
              <div className="field">
            <label className="label">Note</label>
            <div className="control">
              <input className="input" type="text" placeholder="Note" />
              </div>
              </div>
              <div className="field">
            <label className="label">Supplier ID</label>
            <div className="control">
              <input className="input" type="text" placeholder="Supplier ID" />
              </div>
              </div>
              <div className="field">
            <label className="label">Classification</label>
            <div className="control">
              <input className="input" type="text" placeholder="Classification" />
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