import './Profile.scss';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const Profile = () => {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const customer = useSelector((state) => state.customer.userInfo.data)

    

    const handleUpdatePassword = async (e) => {
        e.preventDefault(); // Ngăn chặn form submit mặc định

        if (newPassword !== confirmPassword) {
            toast.error("2 Password không trùng nhau!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/login/updatePassword", null, {
                params: {
                    customerId: customer.customerId,
                    password: password,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }
            });
            if (response.status === 200) {
                toast.success("Thay đổi mật khẩu thành công");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Mật khẩu cũ không chính xác");
            } else if (error.response && error.response.status === 404) {
                toast.error("Mật khẩu không đúng!");
            } else {
                toast.error("Có lỗi xảy ra!");
            }
        }
    };
    return (
        <>
            <div className="container mt-5">
                <h2 className='text-center'>Chào mừng {customer.username}</h2>
                <div className="row mt-5">
                    <div className="col-md-6">
                        <strong>
                            Thông tin cá nhân:
                        </strong>
                        <h2 className="mt-3">{customer.username}</h2>
                        <ul className="list-group">
                            <li className="list-group-item"><strong>Email:</strong> </li>
                            <li className="list-group-item"><strong>Phone:</strong></li>
                            <li className="list-group-item"><strong>Ngày đăng ký:</strong> </li>
                        </ul>
                    </div>
                    <div className='col-md-6'>
                        <form onSubmit={handleUpdatePassword}>
                            <div className='form-group'>
                                <label className='labelmk'>Mật khẩu cũ</label>
                                <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label className='labelmk'>Mật khẩu mới</label>
                                <input type="password" className='form-control' onChange={(e) => setNewPassword(e.target.value)} required />
                            </div>
                            <div className='form-group'>
                                <label className='labelmk'>Nhập mật khẩu mới</label>
                                <input type="password" className='form-control' onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary mt-3'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

           
        </>
    );
};
export default Profile;
