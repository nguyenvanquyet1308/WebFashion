
import { useEffect, useState } from 'react';
import './Product.scss';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import TruncateText from 'services/TruncateText';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from 'services/FormatCurrency';
import { useAuthStore } from 'store/auth.store';

const Product = () => {

    const [product, setProducts] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [keywords, setKeywords] = useState("")
    const navigate = useNavigate();
    
    const {userInfo} = useAuthStore()
    const customer = userInfo.data;



    const pageSize = 6;
    useEffect(() => {
        showProduct(currentPage);
    }, [currentPage]);

    const showProduct = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user/homepage`, {
                params: {
                    page: page,
                    pageSize: pageSize
                }
            });
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log("Error: " + error);
        }
    };
    const handlePageClick = (event) => {
        const newPage = event.selected;
        setCurrentPage(newPage);
    };
    useEffect(() => {
        handleSearch();
    }, [currentPage])
    const handleSearch = async () => {
        if (keywords.trim() !== "") {
            try {
                const response = await axios.get("http://localhost:8080/api/user/product/searchName", {
                    params: {
                        page: currentPage,
                        pageSize: pageSize,
                        keywords: keywords
                    }
                });
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.log("Lỗi tìm kiếm sản phẩm: ", error);
            }
        } else {
            showProduct(currentPage);
        }
    };
    const handleAddCart = async (productId) => {
     //   if (!customer) return null;
     if (customer == undefined) {
        navigate("/product")
        toast.warning("Bạn cần đăng nhập để sử dụng Cart !")
        return
       };
        console.log("dataa customer" + customer);
        console.log(customer.customerId);
        try {
            await axios.post('http://localhost:8080/api/user/cart/add', {
                product:  { productId: parseInt(productId) } ,
                quantity: parseInt(1),
                customer: { customerId: customer.customerId }
            }, {
                headers: { 'Content-Type': 'application/json' },
                Authorization: `Bearer ${customer.token}`
            });
            toast.success("Thêm sản phẩm thành công")
            console.log("Thêm sp thành công");
        } catch (error) {
            console.log("Lỗi thêm sản phẩm: " + error);
            toast.error("Lỗi thêm sản phẩm")
        }
    }
    
    return (
        <>
            <div class="row">
                <div class="form-group mt-2 ">
                    <img src="./images/banner.jpg" class="image-banner" alt="" />
                </div>
                <h1 className='text-center mt-4'>Sản phẩm mới</h1>

                <div class="col-md-3 filter-section mt-4">
                    <div class="form-group">
                        <label for="filterName">Name</label>
                        <input type="text" class="form-control" name='keywords' onChange={(e) => setKeywords(e.target.value)} placeholder="Search by name" />
                    </div>

                    <div class="form-group">
                        <label for="filterSize">Size</label>
                        <select class="form-control" id="filterSize">
                            <option value="">All Sizes</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="filterPrice">Price</label>
                        <input type="range" class="form-control-range" id="filterPrice" min="0" max="300" step="10" />
                        <div class="d-flex justify-content-between">
                            <span>$0</span>
                            <span>$300</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="filterColor">Color</label>
                        <select class="form-control" id="filterColor">
                            <option value="">All Colors</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="filterBrand">Brand</label>
                        <select class="form-control" id="filterBrand">
                            <option value="">All Brands</option>
                            <option value="nike">Nike</option>
                            <option value="adidas">Adidas</option>
                            <option value="puma">Puma</option>
                            <option value="reebok">Reebok</option>
                            <option value="new_balance">New Balance</option>
                        </select>
                    </div>


                    <button class="btn btn-primary btn-block mt-3" onClick={handleSearch} >Apply Filters</button>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        {product.map((item, index) => (
                            <div class="col-md-4 mt-2">
                                <div key={index} class="product">
                                    <div className='textProduct'><TruncateText text={item.name} maxLength={20} /></div>
                                    <img src={`http://localhost:8080/getimage/${item.image}`} alt="" style={{ height: "320px", width: "260px" }} />
                                    <div class="infoProduct">
                                        <p className="textPrice mt-2">{formatCurrency(item.unitPrice)}  </p>
                                        <button className='btn btn-dark' onClick={()=>handleAddCart(item.productId)} >Thêm vào giỏ hàng</button>                                    </div>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                </div>
            </div>
            <div className="pagination-container">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
            </div>
            <ToastContainer containerId="toast3"/>

        </>
    )
}

export default Product;