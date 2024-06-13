import React, { useEffect, useState } from 'react'
import axios from 'axios';
import $ from 'jquery';

const DataBinding = () => {
    const [products, setProducts] = useState([]);

    function loadData() {

        // get ajax through //1
        $.ajax({
            method:'get',
            url:'products.json',
            success:(response=>{
                setProducts(response)
            })
        })


        // get axios through //2
        // axios.get("products.json")
        // .then(response=>{
        //     setProducts(response.data)
        // })
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.name}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataBinding;
