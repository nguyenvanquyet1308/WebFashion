import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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

    const handleUpdateStatus = async (orderId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/updateStatusOrders/${orderId}`)
            setOrders(response.data)
            console.log("update xac nhan don: ", response.data);
            toast.success("Xác nhận đơn hàng thành công !")
        } catch (error) {
            console.log("lỖi khi xác nhận đơn: ", error);
        }
    }
    const handleDeleteOrders = async (orderId) => {
        try {
             await axios.delete(`http://localhost:8080/api/orders/${orderId}`)
             setOrders(orders.filter(order => order.orderId != orderId ))
             toast.success("Xóa thành công !")
        } catch (error) {
            console.log("err xóa",error);
            
            
        }
    }

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
                                <td>
                                    {!order.status ? (
                                        <button className="btn btn-dark" onClick={() => handleUpdateStatus(order.orderId)}>Xác nhận đơn</button>
                                    ) : (
                                        <button className="btn btn-danger " onClick={(e) => handleDeleteOrders(order.orderId)} >Xóa</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        <ToastContainer containerId="toast12" />

        </>
    )
}
export default ManageOrders;
