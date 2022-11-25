import React from "react";

export default function InventoryPage() {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        listItem();
    }, []);


    const listItem = () => {
        fetch('http://localhost:8000/inventory/')
            .then(res => res.json())
            .then(json => {
                setItems(json);
                setLoading(false);
                console.log(json);
            })
            .catch(err => console.log(err));
    }

    const addItem = () => {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }

    const editItem = (item) => {

    }

    const deleteItem = (id) => {

    }

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
            <h1 className="title is-1">Inventory</h1>
            {/* add button */}
            <button className="button is-primary" onClick={addItem} >Add Inventory</button>
            </div>



            <div className="data-table">
            <table className="my-table">
            <thead>
                <tr>
                <th>#</th>
                <th>itemID</th>
                <th>quantity</th>
                <th>inboundDate</th>
                <th>expirationDate</th>
                <th>action</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{item.itemID}</td>
                    <td>{item.quantity}</td>
                    <td>{item.inboundDate}</td>
                    <td>{item.expirationDate}</td>
                    <td>
                    <button className="button is-warning is-fullwidth" onClick={editItem(item)}>Edit</button>
                    <button className="button is-danger is-fullwidth" onClick={deleteItem(item.itemID)} >Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            </div>

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <header className="modal-header">
                        <p className="modal-card-title">Inventory</p>
                        <button className="button delete is-danger" aria-label="close" onClick={closeModal} >X</button>
                    </header>
                    <section className="modal-body">
                        <form>
                            <div className="field">
                                <label className="label">quantity</label>
                                <div className="control">
                                <input className="input" type="number" placeholder="quantity" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">inboundDate</label>
                                <div className="control">
                                <input className="input" type="text" placeholder="inboundDate" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">inboundDate</label>
                                <div className="control">
                                <input className="input" type="text" placeholder="inboundDate" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Item ID</label>
                                <div className="control">
                                <input className="input" type="text" placeholder="Item ID" />
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
