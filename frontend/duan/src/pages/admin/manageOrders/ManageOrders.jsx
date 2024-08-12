import axios from "axios";
import { useEffect, useState } from "react";
import { formatCurrency } from "services/FormatCurrency";

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const showOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/orders")
                setOrders(response.data)
                console.log(response.data);
            } catch (error) {
                console.log("Lỗi show orders: ", error);
            }
        }
        showOrders()
    }, [])

    return (
        <>
            <div> 
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Customer Name</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.orderDate}</td>
                                <td>  {formatCurrency(order.amount)}</td>
                                <td>{order.status ? "Đã Giao hàng" : "Chưa giao hàng"}</td>
                                <td>{order.customer.username}</td>
                                <td><button className="btn btn-dark">Xác nhận đơn</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ManageOrders;
