const getProducts = async () => {
  const res = await axios.get('https://dummyjson.com/products/category-list');
  return res.data;
}

const geta=getProducts();


conaole.log(geta);