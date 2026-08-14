import axios from "axios";

const getCategories = async () => {
  const res = await axios.get(
    "https://dummyjson.com/products/category-list"
  );

  if (res.status == 200) {
    return res.data;
  }
};

const showCategories = async () => {
  const categories = await getCategories();

  const html = categories.map((cat) => {
    return `<a href="#" category="${cat}"
        cat-link
        class="flex flex-col items-center justify-center gap-1.5 bg-white border border-gray-200 rounded-2xl py-4 px-2 text-center hover:translate-y-1 transition-all">
        <span class="text-sm font-medium capitalize">${cat}</span>
      </a>`;
  });

  document.querySelector("[categories-wrap]").innerHTML = html.join("");

  const categoryLinks = document.querySelectorAll("[cat-link]");

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const category = link.getAttribute("category");

      categoryLinks.forEach((link) => {
            link.classList.remove("border-pink-100");
            link.classList.remove("bg-pink-50");
            link.classList.add("border-gray-200");
            link.classList.add("bg-white");
      });

      link.classList.add("border-pink-100");
      link.classList.add("bg-pink-50");
      link.classList.remove("border-gray-200");
      link.classList.remove("bg-white");
      

      showProducts(category);
    });
  });
};

showCategories();


const getProducts = async (category) => {
  let url;

  if (category) {
    url = `https://dummyjson.com/products/category/${category}`;
  } else {
    url = "https://dummyjson.com/products?limit=10";
  }

  const res = await axios.get(url);

  return res.data.products;
};


const showProducts = async (category) => {
  const products = await getProducts(category);
  

  const html = products.map((p) => {
    return `
      <a  href="#" product-id="${p.id}"
        class="product bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all">
        
        <img src="${p.thumbnail}" alt="${p.title}" class="w-full object-cover" />

        <div class="p-3">
          <h3 class="text-sm font-medium mb-1">${p.title}</h3>
          <p class="text-xs mb-2"> ★ ${p.rating}</p>
          <span class="text-sm font-semibold">$${p.price}</span>
        </div>

      </a>
    `;
  });

  document.querySelector("[products-grid]").innerHTML = html.join("");

const  allProducts = document.querySelectorAll("[product-id]");

  allProducts.forEach((product) => {
    product.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Product ID:", product.getAttribute("product-id"));
      showProductDetails(product.getAttribute("product-id"));
    });
  });

};

const getProductDetails = async (id) => {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);
  return res.data;
};

const showProductDetails = async (id) => {
  const p = await getProductDetails(id);

  const imagesHtml = p.images.map((img) => {
    return `<img src="${img}" class="w-full rounded-lg" />`;
  }).join('');

  const reviewsHtml = p.reviews.map((r) => {
    return `
      <div class="border rounded-lg p-3 mb-2">
        <p class="text-sm font-semibold">${r.reviewerName} — ★ ${r.rating}</p>
        <p class="text-sm">${r.comment}</p>
      </div>
    `;
  }).join('');

  document.querySelector('[product-detail]').innerHTML = `
    <h1 class="text-3xl font-semibold mb-3">${p.title}</h1>
    <p class="mb-4">${p.description}</p>
    <p class="mb-2 font-semibold">$${p.price}</p>
    <p class="mb-6">Stock: ${p.stock}</p>

    <div class="grid grid-cols-2 gap-3 mb-8">
      ${imagesHtml}
    </div>

    <h2 class="text-xl font-semibold mb-3">Reviews</h2>
    ${reviewsHtml}
  `;
    document.querySelector('[product-detail-popup]').classList.remove('hidden');

};
const closeDetailsButton = document.querySelector('[close-Details]');
closeDetailsButton.addEventListener('click', () => {
  document.querySelector('[product-detail-popup]').classList.add('hidden');
});



showProducts();