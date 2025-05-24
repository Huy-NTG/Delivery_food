// import { useEffect, useState } from 'react';
// import productApi from '~/api/productApi';
// import './ProductManagement.scss';

// function ProductManagement() {
//     const [products, setProducts] = useState([]);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [editingProduct, setEditingProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     const loadProducts = async () => {
//         try {
//             setLoading(true);
//             const response = await productApi.getAll();
//             setProducts(response.data);
//         } catch (err) {
//             setError('Lấy sản phẩm thất bại!');
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         loadProducts();
//     }, []);
//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const response = await productApi.getAll();
//                 setProducts(response.data);
//             } catch (err) {
//                 setError('Lấy sản phẩm thất bại!');
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchProducts();
//     }, []);

//     // Thêm sản phẩm
//     const handleAddProduct = async (product, imageFile) => {
//         try {
//             const createProduct = {
//                 name: product.name,
//                 price: product.price,
//                 category: product.category,
//                 quantity: product.quantity,
//                 image: imageFile
//             };

//             await productApi.create(createProduct);
//             setShowAddModal(false);
//             await loadProducts();
//             alert('Thêm sản phẩm thành công!');
//         } catch (error) {
//             alert('Thêm sản phẩm thất bại!');
//         }
//     };



//     // Sửa sản phẩm
//     // const handleEditProduct = async (e) => {
//     //     e.preventDefault();
//     //     const formData = new FormData(e.target);
//     //     console.log(formData.get('image'));
//     //     const img = formData.get('image');
//     //     if (img == null) {
//     //         img = productApi.getById(formData.get('id')).image;
//     //     }
//     //     const updatedProduct = {
//     //         id: editingProduct.id,
//     //         name: formData.get('name'),
//     //         price: Number(formData.get('price')),
//     //         category: formData.get('category'),
//     //         quantity: Number(formData.get('stock')),
//     //         image: img
//     //     };

//     //     try {
//     //         const res = await productApi.update(updatedProduct.id, updatedProduct);
//     //         const pr = productApi.getById(updatedProduct.id);
//     //         setEditingProduct(null);
//     //         setProducts(products.map(p => p.id === pr.id ? pr : p));
//     //         // setShowAddModal(false);
//     //     } catch (error) {
//     //         console.error("Lỗi cập nhật sản phẩm:", error);
//     //     }
//     // };
//     const handleEditProduct = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const updatedProduct = {
//             id: editingProduct.id,
//             name: formData.get('name'),
//             price: Number(formData.get('price')),
//             category: formData.get('category'),
//             quantity: Number(formData.get('stock')),
//             image: formData.get('image'),
//         };

//         try {
//             await productApi.update(updatedProduct.id, updatedProduct);
//             setEditingProduct(null);
//             await loadProducts();
//             alert('Sửa sản phẩm thành công!');
//         } catch (error) {
//             console.error("Lỗi cập nhật sản phẩm:", error);
//         }
//     };

//     const handleDeleteProduct = async (id) => {
//         if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
//             try {
//                 await productApi.delete(id);
//                 await loadProducts();
//                 alert('Xóa sản phẩm thành công');
//             } catch (error) {
//                 alert('Xóa sản phẩm thất bại!');
//             }
//         }
//     };

//     return (
//         <div className="product-management">
//             <div className="management-header">
//                 <div className="search-bar">
//                     <span className="material-symbols-outlined">search</span>
//                     <input type="text" placeholder="Tìm kiếm sản phẩm..." />
//                 </div>
//                 <button className="add-btn" onClick={() => setShowAddModal(true)}>
//                     <span className="material-symbols-outlined">add</span>
//                     Thêm sản phẩm
//                 </button>
//             </div>

//             <div className="products-table">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Tên sản phẩm</th>
//                             <th>Giá</th>
//                             <th>Danh mục</th>
//                             <th>Hình ảnh</th>
//                             <th>Tồn kho</th>
//                             <th>Thao tác</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((product) => (
//                             <tr key={product.id}>
//                                 <td>#{product.id}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.price}đ</td>
//                                 <td>{product.category}</td>
//                                 <td>
//                                     <img
//                                         src={`http://localhost:3000/uploads/${product.image}`}
//                                         alt={product.name}
//                                         style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                                     />
//                                 </td>
//                                 <td>{product.quantity}</td>
//                                 <td>
//                                     <div className="action-buttons">
//                                         <button className="edit-btn" onClick={() => setEditingProduct(product)}>
//                                             <span className="material-symbols-outlined">edit</span>
//                                         </button>
//                                         <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
//                                             <span className="material-symbols-outlined">delete</span>
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {showAddModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2>Thêm sản phẩm mới</h2>
//                         <form
//                             onSubmit={(e) => {
//                                 e.preventDefault();
//                                 const formData = new FormData(e.target);
//                                 const imageFile = e.target.image.files[0]; // 👉 đây là file người dùng đã chọn

//                                 handleAddProduct({
//                                     name: formData.get('name'),
//                                     price: Number(formData.get('price')),
//                                     category: formData.get('category'),
//                                     quantity: Number(formData.get('stock')),
//                                 }, imageFile);
//                             }}
//                         >
//                             <div className="form-group">
//                                 <label>Tên sản phẩm</label>
//                                 <input type="text" name="name" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Ảnh sản phẩm</label>
//                                 <input type="file" name="image" accept="image/*" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Giá</label>
//                                 <input type="number" name="price" required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Danh mục</label>
//                                 <select name="category" required>
//                                     <option value="Món chính">Món chính</option>
//                                     <option value="Món phụ">Món phụ</option>
//                                     <option value="Đồ uống">Đồ uống</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Tồn kho</label>
//                                 <input type="number" name="stock" required />
//                             </div>
//                             {/* Nếu bạn có upload ảnh, thêm input file ở đây */}
//                             <div className="modal-actions">
//                                 <button type="button" onClick={() => setShowAddModal(false)}>
//                                     Hủy
//                                 </button>
//                                 <button type="submit">Thêm</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {editingProduct && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2>Chỉnh sửa sản phẩm</h2>
//                         <form
//                             onSubmit={handleEditProduct}
//                         >

//                             <div className="form-group">
//                                 <label>Tên sản phẩm</label>
//                                 <input type="text" name="name" defaultValue={editingProduct.name} required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Ảnh sản phẩm</label>
//                                 <input type="file" name="image" accept="image/*" />
//                             </div>
//                             <div className="form-group">
//                                 <label>Giá</label>
//                                 <input type="number" name="price" defaultValue={editingProduct.price} required />
//                             </div>
//                             <div className="form-group">
//                                 <label>Danh mục</label>
//                                 <select name="category" defaultValue={editingProduct.category} required>
//                                     <option value="Món chính">Món chính</option>
//                                     <option value="Món phụ">Món phụ</option>
//                                     <option value="Đồ uống">Đồ uống</option>
//                                 </select>
//                             </div>
//                             <div className="form-group">
//                                 <label>Tồn kho</label>
//                                 <input type="number" name="stock" defaultValue={editingProduct.quantity} required />
//                             </div>
//                             {/* Tương tự nếu muốn chỉnh sửa ảnh thì thêm phần xử lý riêng */}
//                             <div className="modal-actions">
//                                 <button type="button" onClick={() => setEditingProduct(null)}>
//                                     Hủy
//                                 </button>
//                                 <button type="submit">Lưu</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ProductManagement;
import { useEffect, useState } from 'react';
import productApi from '~/api/productApi';
import './ProductManagement.scss';

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = (await productApi.getAll()).data;
            setProducts(response.data);
        } catch (err) {
            setError('Lấy sản phẩm thất bại!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAddProduct = async (product, imageFile) => {
        try {
            const createProduct = {
                name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity,
                image: imageFile
            };

            await productApi.create(createProduct);
            setShowAddModal(false);
            await loadProducts();
            alert('Thêm sản phẩm thành công!');
        } catch (error) {
            alert('Thêm sản phẩm thất bại!');
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedProduct = {
            id: editingProduct.id,
            name: formData.get('name'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            quantity: Number(formData.get('stock')),
            image: formData.get('image'),
        };

        try {
            await productApi.update(updatedProduct.id, updatedProduct);
            setEditingProduct(null);
            await loadProducts();
            alert('Sửa sản phẩm thành công!');
        } catch (error) {
            console.error("Lỗi cập nhật sản phẩm:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await productApi.delete(id);
                await loadProducts();
                alert('Xóa sản phẩm thành công');
            } catch (error) {
                alert('Xóa sản phẩm thất bại!');
            }
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className="product-management">
            <div className="management-header">
                <div className="search-bar">
                    <span className="material-symbols-outlined">search</span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-btn" onClick={() => setShowAddModal(true)}>
                    <span className="material-symbols-outlined">add</span>
                    Thêm sản phẩm
                </button>
            </div>

            <div className="products-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Danh mục</th>
                            <th>Hình ảnh</th>
                            <th>Tồn kho</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td>#{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}đ</td>
                                <td>{product.category}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/uploads/${product.image}`}
                                        alt={product.name}
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{product.quantity}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => setEditingProduct(product)}>
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Thêm sản phẩm mới</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const imageFile = e.target.image.files[0];

                                handleAddProduct({
                                    name: formData.get('name'),
                                    price: Number(formData.get('price')),
                                    category: formData.get('category'),
                                    quantity: Number(formData.get('stock')),
                                }, imageFile);
                            }}
                        >
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input type="text" name="name" required />
                            </div>
                            <div className="form-group">
                                <label>Ảnh sản phẩm</label>
                                <input type="file" name="image" accept="image/*" />
                            </div>
                            <div className="form-group">
                                <label>Giá</label>
                                <input type="number" name="price" required />
                            </div>
                            <div className="form-group">
                                <label>Danh mục</label>
                                <select name="category" required>
                                    <option value="Món chính">Món chính</option>
                                    <option value="Món phụ">Món phụ</option>
                                    <option value="Đồ uống">Đồ uống</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tồn kho</label>
                                <input type="number" name="stock" required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowAddModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit">Thêm</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingProduct && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Chỉnh sửa sản phẩm</h2>
                        <form onSubmit={handleEditProduct}>
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input type="text" name="name" defaultValue={editingProduct.name} required />
                            </div>
                            <div className="form-group">
                                <label>Ảnh sản phẩm</label>
                                <input type="file" name="image" accept="image/*" />
                            </div>
                            <div className="form-group">
                                <label>Giá</label>
                                <input type="number" name="price" defaultValue={editingProduct.price} required />
                            </div>
                            <div className="form-group">
                                <label>Danh mục</label>
                                <select name="category" defaultValue={editingProduct.category} required>
                                    <option value="Món chính">Món chính</option>
                                    <option value="Món phụ">Món phụ</option>
                                    <option value="Đồ uống">Đồ uống</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Tồn kho</label>
                                <input type="number" name="stock" defaultValue={editingProduct.quantity} required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={() => setEditingProduct(null)}>
                                    Hủy
                                </button>
                                <button type="submit">Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;
