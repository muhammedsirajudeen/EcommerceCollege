import styles from "@/styles/Admin.module.css"
export default function admin(){
    return(
        <>
        <div className={styles.headingcontainer}>
            ADMIN PAGE
        </div>

        <div className={styles.maincontainer}>
            <div className={styles.addproductcontainer}>
                <p className={styles.description}> add products here</p>
                <input type="text" className={styles.input} placeholder="product name"></input>
                <input type="number" className={styles.input} placeholder="product price"></input>
                <input type="text" className={styles.input} placeholder="imagelink"></input>
                <button className={styles.uploadbutton}>add product</button>
            </div>

            <div className={styles.viewproductscontainer}>
                {/* here add code that will return all the products from database  */}
            </div>
        </div>
        </>
        
    )
}