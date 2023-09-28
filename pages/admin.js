import styles from "@/styles/Admin.module.css"
import axios from "axios"
import { useEffect, useState } from "react"

export default function admin(){
    //using use effect to retrieve data from the api and show it
    useEffect(()=>{
        async function apiHandler(){
            let response = await axios.get("/api/productlist")
         
            setproductList(response.data)
        }
        apiHandler()

    },[])
    const [productlist,setproductList]=useState([])
    const [productname,setproductName]=useState("")
    const [price,setPrice]=useState("")
    const [description,setDescription]=useState("")
    const [imagelink,setimageLink]=useState("")
    async function uploadbuttonHandler(){
        let response =await axios.post("/api/productupdate",
        {
            productName:productname,
            price:price,
            description:description,
            imageLink:imagelink
        }
        )
        location.reload()
        
    }
    function productnameHandler(e){
        setproductName(e.target.value)
    }

    function priceHandler(e){
        setPrice(e.target.value)
    }
    function descriptionHandler(e){
        setDescription(e.target.value)
    }
    function imagelinkHandler(e){
        setimageLink(e.target.value)
    }
    
    async function deleteHandler(e){
        console.log(e.target.id)
        let response=await axios.delete(`/api/productdelete?id=${e.target.id}`)
        location.reload()
        
    }

    return(
        <>
        <div className={styles.headingcontainer}>
            ADMIN PAGE
        </div>

        <div className={styles.maincontainer}>
            <div className={styles.addproductcontainer}>
                <p className={styles.description}> add products here</p>
                <input type="text" className={styles.input} placeholder="product name" value={productname} onChange={productnameHandler}  ></input>
                <input type="number" className={styles.input} placeholder="product price" value={price} onChange={priceHandler} ></input>
                <input type="text" className={styles.input} placeholder="product description" value={description} onChange={descriptionHandler}></input>
                <input type="text" className={styles.input} placeholder="imagelink" value={imagelink} onChange={imagelinkHandler} ></input>
                <button className={styles.uploadbutton} onClick={uploadbuttonHandler} >add product</button>
            </div>

            <div className={styles.viewproductscontainer}>
                <div className={styles.productcontainer}>
                    <div>image</div>
                    <div>name</div>
                    <div>price</div>
                    <div>description</div>
                </div>
                {
                    productlist.map((value)=>{
                        return(
                            <div className={styles.productcontainer}  key={value._id}>
                                <img src={value.imageLink} className={styles.productImage}></img>
                                <div className={styles.productText}>{value.productName}</div>
                                <div className={styles.productText}>{value.price}</div>
                                <div className={styles.descriptionbox}>{value.description}</div>
                                <button id={value._id} onClick={deleteHandler} className={styles.uploadbutton} >delete</button>
                                
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
        
    )
}