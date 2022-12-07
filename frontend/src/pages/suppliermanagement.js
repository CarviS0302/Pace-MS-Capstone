import React from "react";

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
  return JSON.parse(tokenString);

}
  let formDatas = {
    supplierID: "",
    company: "",
    email: "",
    phoneNum: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    note: "",
  };
  React.useEffect(() => {
    fetch("http://localhost:8000/supplier",{
      headers: new Headers({
        'Authorization': 'Bearer '+ getToken()
    })
    })
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
        suppliers.map((supplier) => {});
        setLoading(false);
      }).catch((error) => {
        console.log('error: ' + error);
        // this.setState({ requestFailed: true });
      });
  }, []);
  const inputChanged = (event) => {
    formDatas[event.target.name] = event.target.value;
  };
  function resetForm() {
    document.getElementById("supplierForm").reset();
    formDatas = {
      supplierID: "",
      company: "",
      email: "",
      phoneNum: "",
      country: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      note: "",
    };
  }
  const handleSubmit = (event) => {
    submitForm(formDatas);
  };
  const editSupplier = (supplierID) => {
    console.log(supplierID);
    console.log("edit");
    fetch("http://localhost:8000/supplier/find/" + supplierID,{

        headers: new Headers({
          'Authorization': 'Bearer '+ getToken()
      })
    })
      .then((res) => res.json())
      .then((data) => {
        formDatas.supplierID = data.supplierID;
        formDatas.company = data.company;
        formDatas.email = data.email;
        formDatas.phoneNum = data.phoneNum;
        formDatas.country = data.country;
        formDatas.street = data.street;
        formDatas.city = data.city;
        formDatas.state = data.state;
        formDatas.zip = data.zip;
        formDatas.note = data.note;
        console.log(formDatas);
        addSupplier();
      });

  };
  function deleteSuppliers(supplierID) {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      fetch("http://localhost:8000/supplier/delete/" + supplierID, {
        method: "DELETE",
        headers: new Headers({
          'Authorization': 'Bearer '+ getToken()
      })
      }).then((res) => {
        if (res.ok) {
          alert("Supplier deleted");
          window.location.reload();
        }
      });
    }

  };
  const saveChanges = () => {
    // get the values from the form
    console.log("saving changes");
    submitForm(formDatas);
    // reload the page
    closeModal();
    // window.location.reload();

  };
  function getSupplier(supplierID) {
    fetch("http://localhost:8000/supplier/find/" + supplierID)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      }
      );
  };

  function submitForm(datas) {
    if (datas.supplierID === "") {
      fetch("http://localhost:8000/supplier/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+ getToken(),
        },
        body: JSON.stringify(datas),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          resetForm();
          window.location.reload();
        });
    } else {
    fetch("http://localhost:8000/supplier/update/" + datas.supplierID+"/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer '+ getToken(),
      },
      body: JSON.stringify(datas),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resetForm();
        window.location.reload();
      // });
    });
  }

  }

  const addSupplier = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    // set the values of the form
    for(let key in formDatas) {
      try {
      document.getElementById(key).value = formDatas[key];

      } catch (error) {
        console.log(error);
      }
    }
    try {
      if(formDatas.phoneNum !== "") {
        // remove spaces and dashes
        let phoneNum = formDatas.phoneNum.replace(/\s/g, "").replace(/-/g, "");
        formDatas.phoneNum = phoneNum;
      }
    } catch (error) {
      console.log(error);
    }

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
              <button className="button is-warning is-fullwidth" onClick={() => editSupplier(supplier.supplierID)}>Edit</button>
              <button className="button is-danger is-fullwidth" onClick={() => deleteSuppliers(supplier.supplierID)} >Delete</button>
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
        <form id="supplierForm">
          <div className="field">
            <label className="label">Company</label>
            <div className="control">
              <input className="input" type="text"  name="company" id="company" onChange={inputChanged} placeholder="Company" />
            </div>
            </div>
            <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" name="email" id="email"  onChange={inputChanged} placeholder="Email" />
              </div>
              </div>
              <div className="field">
            <label className="label">Phone Number</label>
            <div className="control">
              <input className="input" type="tel" name="phoneNum" id="phoneNum"  onChange={inputChanged} placeholder="Phone Number" />
              </div>
              </div>
              <div className="field">
            <label className="label">Country</label>
            <div className="control">
              <input className="input" type="text" name="country" id="country"  onChange={inputChanged} placeholder="Country" />
              </div>
              </div>
              <div className="field">
            <label className="label">Street</label>
            <div className="control">
              <input className="input" type="text" name="street" id="street"  onChange={inputChanged} placeholder="Street" />
              </div>
              </div>
              <div className="field">
            <label className="label">City</label>
            <div className="control">
              <input className="input" type="text" name="city" id="city"  onChange={inputChanged} placeholder="City" />
              </div>
              </div>
              <div className="field">
            <label className="label">State</label>
            <div className="control">
              <input className="input" type="text"  name="state" id="state"  onChange={inputChanged} placeholder="State" />
              </div>
              </div>
              <div className="field">
            <label className="label">Zip</label>
            <div className="control">
              <input className="input" type="text" name="zip" id="zip"  onChange={inputChanged} placeholder="Zip" />
              </div>
              </div>
              <div className="field">
            <label className="label">Note</label>
            <div className="control">
              <input className="input" type="text" name="note" id="note"  onChange={inputChanged} placeholder="Note" />
              </div>
              </div>
        </form>
      </section>
      <footer className="modal-footer">
        <button className="button is-success" onClick={saveChanges} >Save changes</button>
        <button className="button is-danger" onClick={closeModal}>Cancel</button>
      </footer>

      </div>
      </div>

  </div>
    );
}