import { useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState(
    useSelector((state) => state.product.products)
  );
  const [product, setProduct] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    const data = products?.filter(
      (product) => product._id === location.pathname.split("/")[2]
    )[0];
    setProduct(data);
    setUpdatedProduct(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("products", products);
  console.log("product", product);
  console.log("updatedProduct", updatedProduct);

  const handleUpdate = (e) => {
    e.preventDefault();
    setProduct(updatedProduct);
    updateProduct(dispatch, products, updatedProduct);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">{product.title}</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{` ${product._id}`}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{`₹ ${product.price}`}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Categories:</span>
              <span className="productInfoValue">{`${product.categories}`}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Colors:</span>
              <span className="productInfoValue">{`${product.color}`}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">Size:</span>
              <span className="productInfoValue">{`${product.size}`}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">In stock:</span>
              <span className="productInfoValue">
                {product.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              defaultValue={product.title}
              name="title"
              onChange={(e) =>
                setUpdatedProduct((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Price</label>
            <input
              type="text"
              defaultValue={product.price}
              name="price"
              onChange={(e) =>
                setUpdatedProduct((p) => ({
                  ...p,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <label>Categories</label>
            <input
              type="text"
              defaultValue={product.categories}
              name="categories"
              onChange={(e) =>
                setUpdatedProduct((p) => ({
                  ...p,
                  [e.target.name]: e.target.value.split(","),
                }))
              }
            />
            <label>Colors</label>
            <input
              type="text"
              defaultValue={product.color}
              name="color"
              onChange={(e) =>
                setUpdatedProduct((p) => ({
                  ...p,
                  [e.target.name]: e.target.value.split(","),
                }))
              }
            />
            <label>Sizes</label>
            <input
              type="text"
              defaultValue={product.size}
              name="size"
              onChange={(e) =>
                setUpdatedProduct((p) => ({
                  ...p,
                  [e.target.name]: e.target.value.split(","),
                }))
              }
            />
            <label>In Stock</label>
            <select
              name="inStock"
              id="idStock"
              onChange={(e) =>
                setUpdatedProduct((p) => ({
                  ...p,
                  [e.target.name]: e.target.value === "yes" ? true : false,
                }))
              }
            >
              <option value="yes" selected={product.inStock}>
                Yes
              </option>
              <option value="no" selected={!product.inStock}>
                No
              </option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <input
                type="text"
                id="file"
                name="img"
                defaultValue={product.img}
                onChange={(e) =>
                  setUpdatedProduct((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <label>
                <Publish />
                <input
                  type="file"
                  id="file"
                  name="img"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setUpdatedProduct((p) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </label>
            </div>
            <div
              style={{
                padding: "20px 0",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <label>Description</label>
              <textarea
                type="text"
                defaultValue={product.desc}
                style={{ height: "80%" }}
                name="desc"
                onChange={(e) =>
                  setUpdatedProduct((p) => ({
                    ...p,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <button className="productButton" onClick={(e) => handleUpdate(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
