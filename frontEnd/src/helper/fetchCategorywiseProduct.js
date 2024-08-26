const fetchCategoryWiseProduct =async (category) =>{
const response = await fetch("https://e-commerce-backend-c2it.onrender.com/api/category-product",{
    method:"post",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify({
        category:category
    })
})

const dataresponse = await response.json();
return dataresponse;
}

export default fetchCategoryWiseProduct;