import React, { Component } from "react";

class inventoryPage extends Component {
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
        fetch('http://localhost:8000/inventory/')
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
                                <li key={item.stackID}>
                                    <span><b>itemID:</b> </span>
                                    {item.itemID}
                                    <span><b> quantity:</b> </span>
                                    {item.quantity}
                                    <span><b> EXP:</b> </span>
                                    {item.EXP}
                                    <span><b> inboundDate:</b> </span>
                                    {item.inboundDate}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }
    }

}

export default inventoryPage;
