import React, { Component } from "react";

class orderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
        }
    }


    componentDidMount() {
    this.get();

    }

    get = () => {
        fetch('http://localhost:8000/order/')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
                console.log(json);
            })
            .catch(err => console.log(err));
    }

    render() {

        var { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading</div>
        }
        else {
            return (

                <div >

                    <div >
                        <ul>
                            {items.map(item => (
                                <li key={item.orderID}>
                                    <span><b>itemID:</b> </span>
                                    {item.itemID}
                                    <span><b> quantity:</b> </span>
                                    {item.quantity}
                                    <span><b> orderDate:</b> </span>
                                    {item.orderDate}
                                    <span><b> orderPrice:</b> </span>
                                    {item.orderPrice}
                                    <span><b> customerID:</b> </span>
                                    {item.customerID}
                                    <span><b> shipID:</b> </span>
                                    {item.shipID}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
    }

}

export default orderPage;
