import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const data = useSelector((state) => state.product.products);
  useEffect(() => {
    setProducts(data);
  }, [data, products]);

  const handleDelete = (title) => {
    deleteProduct(dispatch, title);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.title)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "4",
        justifyContent: "flex-start",
      }}
    >
      <Link to="/newproduct">
        <button className="productAddButton">Create a New Product</button>
      </Link>
      <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
    </div>
  );
}
