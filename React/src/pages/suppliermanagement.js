import React from "react";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:8000/supplier")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
        suppliers.map((supplier) => {});
        setLoading(false);
      });
  }, []);

  const editSupplier = (supplierID) => {
    // console.log(supplierID);
  };
  const deleteSupplier = (supplierID) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    // if (confirmDelete) {
    //   fetch("http://localhost:8000/supplier/" + supplierID, {
    //     method: "DELETE",
    //   }).then((res) => {
    //     if (res.ok) {
    //       alert("Supplier deleted");
    //       window.location.reload();
    //     }
    //   });
    // }

  };
  const addSupplier = () => {
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
      <h1 className="title is-1">Supplier Management</h1>
      {/* add button */}
      <button className="button is-primary" onClick={addSupplier} >Add Supplier</button>
    </div>



      <div className="data-table">
      <table className="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Country</th>
          <th>Street</th>
          <th>City</th>
          <th>State</th>
          <th>Zip</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier, i) => (
          <tr key={i}>
            <td>{i+1}</td>
            <td>{supplier.company}</td>
            <td>{supplier.email}</td>
            <td>{supplier.phoneNum}</td>
            <td>{supplier.country}</td>
            <td>{supplier.street}</td>
            <td>{supplier.city}</td>
            <td>{supplier.state}</td>
            <td>{supplier.zip}</td>
            <td>{supplier.note}</td>
            <td>
              <button className="button is-warning is-fullwidth" onClick={editSupplier(supplier.supplierID)}>Edit</button>
              <button className="button is-danger is-fullwidth" onClick={deleteSupplier} >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>

 <div id="myModal" className="modal">
    <div className="modal-content">
      <header className="modal-header">
        <p className="modal-card-title">Add Supplier</p>
        <button className="button delete is-danger" aria-label="close" onClick={closeModal} >X</button>
      </header>
      <section className="modal-body">
        <form>
          <div className="field">
            <label className="label">Company</label>
            <div className="control">
              <input className="input" type="text" placeholder="Company" />
            </div>
            </div>
            <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" placeholder="Email" />
              </div>
              </div>
              <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input className="input" type="tel" placeholder="Phone Number" />
              </div>
              </div>
              <div className="field">
            <label className="label">Country</label>
            <div className="control">
              <input className="input" type="text" placeholder="Country" />
              </div>
              </div>
              <div className="field">
            <label className="label">Street</label>
            <div className="control">
              <input className="input" type="text" placeholder="Street" />
              </div>
              </div>
              <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input className="input" type="text" placeholder="City" />
              </div>
              </div>
              <div className="field">
            <label className="label">State</label>
            <div className="control">
              <input className="input" type="text" placeholder="State" />
              </div>
              </div>
              <div className="field">
            <label className="label">Zip</label>
            <div className="control">
              <input className="input" type="text" placeholder="Zip" />
              </div>
              </div>
              <div className="field">
            <label className="label">Note</label>
            <div className="control">
              <input className="input" type="text" placeholder="Note" />
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