import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function NewProduct() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [file, setFile] = useState({});

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const fileName = new Date().getTime() + file.name;

      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("default");
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error.message);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setProduct((p) => ({ ...p, img: downloadURL }));
          });
        }
      );

      product.img && addProduct(dispatch, product);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>

          <input
            type="file"
            required
            id="file"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Product Name</label>
          <input
            type="text"
            name="title"
            required
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            type="text"
            name="price"
            required
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            name="categories"
            required
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value.split(","),
              }))
            }
          />
        </div>
        <div className="addProductItem">
          <label>Colors</label>
          <input
            type="text"
            name="color"
            required
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value.split(","),
              }))
            }
          />
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input
            type="text"
            name="size"
            required
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value.split(","),
              }))
            }
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea
            type="text"
            required
            style={{ height: "80%" }}
            name="desc"
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select
            name="inStock"
            id="idStock"
            onChange={(e) =>
              setProduct((p) => ({
                ...p,
                [e.target.name]: e.target.value === "yes" ? true : false,
              }))
            }
          >
            <option value="yes" selected>
              Yes
            </option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={(e) => handleCreate(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
