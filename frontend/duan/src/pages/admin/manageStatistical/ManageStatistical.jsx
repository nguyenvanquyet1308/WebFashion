import { useEffect, useState } from "react";
import "./ManageStatistical.scss"
import axios from "axios";

const MangageStatistical = () => {

    const [countCustomer, setCountCustomer] = useState()
    const [countOrders, setCountOrders] = useState();
    const [countOrderByTrue, setCountOrderByTrue] = useState()
    const [countOrderByFalse, setCountOrderByFalse] = useState()
    const [AmountBetweenDates, setAmountBetweenDates] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const handleCountCustomer = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/countCustomer")
                setCountCustomer(response.data)
                console.log(response.data);
            } catch (error) {
                console.log("lỗi: " + error);
            }
        }
        handleCountCustomer()
    }, [])

    useEffect(() => {
        const handleCountOrders = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/countOrders")
                setCountOrders(response.data)
                console.log(response.data);
            } catch (error) {
                console.log("lỗi: " + error);
            }
        }
        handleCountOrders()
    }, [])
    useEffect(() => {
        const handleCountOrderByTrue = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/countOrdersByTrue")
                setCountOrderByTrue(response.data)
                console.log(response.data);
            } catch (error) {
                console.log("lỗi: " + error);
            }
        }
        handleCountOrderByTrue()
    }, [])
    useEffect(() => {
        const handleCountOrderByFalse = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/admin/countOrdersByFalse")
                setCountOrderByFalse(response.data)
                console.log(response.data);
            } catch (error) {
                console.log("lỗi: " + error);
            }
        }
        handleCountOrderByFalse()
    }, [])

    const SumAmountBetweenDates = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/admin/countOrdersByFalse", {
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            })

            setAmountBetweenDates(response.data)
            console.log(response.data);
        } catch (error) {
            console.log("lỗi: " + error);
        }
    }

    return (<>
        <div className="QLThongKe mt-5">
            <div className="row">
                <div className="col-sm-4">
                    <div className="thongke">
                        <p>Tổng người dùng</p>
                        <strong>{countCustomer}</strong>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="thongke">
                        <p>Tổng Đơn Hàng</p>
                        <strong>{countOrders}</strong>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="thongke">
                        <div className="row">
                            <div className="col-sm-6">
                                <p>Tổng đơn đã giao</p>
                                <strong>{countOrderByTrue}</strong>
                            </div>
                            <div className="col-sm-6">
                                <p>Tổng đơn chưa giao</p>
                                <strong>{countOrderByFalse}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row mt-2">
                    <div className="col-sm-8">
                        <div className="thongke">
                            <label htmlFor="startDate">Từ ngày: </label>
                            <input type="date" className="ms-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            <label htmlFor="endDate" className="ms-2" >Đến ngày:</label>
                            <input type="date" className="ms-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            <button className="btn btn-success ms-2" onClick={SumAmountBetweenDates} >Tìm kiếm</button>
                            <br /><br />
                            <div className="doanhthu">
                                <strong>Doanh Thu: </strong> <br />
                                <strong>{AmountBetweenDates}</strong>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>
                </div>
        </div>

    </>)
}
export default MangageStatistical;