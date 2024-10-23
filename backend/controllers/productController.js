//function for adding product

const addProduct = async (req, res) => {
  

    try {
        const {name, description, price, category, subCategory, sizes, bestseller } = req.body;

       

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const image =[image1,image2,image3,image4].filter((item)=> item !== undefined)
    }catch(err) {
        console.log(err)
        res.json({success:false, msg: err.message })
    }
    ///--6:45:32--

}

//function for listing product
const listProducts = async (req, res) => {

}

//function for removing product 
const removeProduct = async (req, res ) =>{

}

// function for single product info
const singleProduct = async (req, res) => {

}

export {listProducts, removeProduct, singleProduct,addProduct}