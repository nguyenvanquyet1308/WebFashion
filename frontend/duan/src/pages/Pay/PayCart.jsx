import { useEffect, useState } from "react";
import axios from 'axios';

const PayCart = () => {

    const [orders, setOrders] = useState([])


    useEffect(() => {
        const showPayCart = async () => {
            const response = await axios.get("http://localhost:8080/api/orders")
            setOrders(response.data)
            console.log(response.data);
        }
        showPayCart();
    }, [])

    return (<>


        <div className="row">
            <div className="col-md-7">
                <h3>Thông tin liên hệ giao hàng</h3>
                <div className="form-group">
                    <label htmlFor="">Họ và tên: </label>
                    <input type="text" className="form-control" />
                </div>
                <div className="form-group"><label htmlFor="">Email</label>
                    <input type="text" className="form-control" placeholder="email.." /></div>
                <div className="form-group"><label htmlFor="">Số điện thoại: </label>
                    <input type="text" className="form-control" placeholder="Số điện thoại.." />
                </div>
                <h4>Địa chỉ giao hàng</h4>
                <div class="form-group">
                    <label for="city">Chọn tỉnh thành *</label>
                    <select class="form-control" id="city">
                        <option>--- Chọn tỉnh thành ---</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="district">Chọn quận huyện *</label>
                    <select class="form-control" id="district">
                        <option>Bạn chưa chọn tỉnh thành</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="ward">Tên phường/Xã *</label>
                    <input type="text" class="form-control" id="ward" />
                </div>
                <div class="form-group">
                    <label for="address">Số nhà, tên đường *</label>
                    <input type="text" class="form-control" id="address" />
                </div>

            </div>
            <div className="col-md-5">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>ngày đặt hàng</th>
                            <th>người đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item,index) => (
                            <tr key={index}>
                                <td>{item.orderId}</td>
                                <td>{item.orderDate}</td>
                                <td>{item.customer.username}</td>
                                <td>{item.amount}</td>
                                <td>{item.status ? "Đã giao hàng" : "chưa giao hàng"}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
            <div><button className="btn btn-info">Thanh toán ngay</button></div>
        </div>

    </>)

}


export default PayCart;