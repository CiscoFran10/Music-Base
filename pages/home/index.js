import { products } from "../../scripts/productsData.js";
import { categories } from "../../scripts/productsData.js";

function showProducts(products) {
	const productsList = document.getElementById("js-products-list");

	return (productsList.innerHTML = products
		.map((product) => {
			return `<li class="card" id="${product.category}">
    <div class="card-image">
      <img src="${product.img}" alt="img">
    </div>
    <div class="card-header">
      <h3 class="font-3">${product.band}</h2>
        <span class="font-4"${product.year}</span>
    </div>
    <div class="card-body">
      <h2 class="font-2">${product.title}</h2>
    </div>
    <div class="card-footer">
      <span class="font-3">R$ ${product.price}.00</span>
      <button class="card-btn">Comprar</button>
    </div>
  </li>`;
		})
		.join(" "));
}
showProducts(products);

function showCategories(categories) {
	const categoriesList = document.getElementById("js-categories-list");

	categories.forEach((category) => {
		categoriesList.insertAdjacentHTML(
			"beforeend",
			`<li class="category-item"><button class="categories-btn">${category}</button></li>`
		);
	});
}
showCategories(categories);

function filter() {
	const categoriesList = document.querySelectorAll(".category-item button");

	categoriesList[0].classList.add("active");

	categoriesList.forEach((btn) =>
		btn.addEventListener("click", handleFilterCategory)
	);

	function handleFilterCategory(e) {
		categoriesList.forEach((btn) => btn.classList.remove("active"));

		this.classList.add("active");
		const category = categories.indexOf(e.target.innerHTML);

		const filteredProducts = products.filter(
			(item) => item.category === category
		);
		showProducts(filteredProducts);
		total(filteredProducts);

		if (e.target.innerHTML === "Todos") {
			showProducts(products);
			total();
		}
	}
}

filter();

function total(array = products) {
	const filterValue = document.querySelector(".filter-price");
	const filterInput = document.querySelector(".filter-range");
	const productPrices = document.querySelectorAll(".card-footer span");

	let totalPrice = Array.from(productPrices).reduce(
		(a, b) => a + +b.innerHTML.slice(2),
		0
	);

	filterInput.setAttribute("max", totalPrice);

	filterInput.addEventListener("input", handleFilter);

	function handleFilter() {
		let value = filterInput.value;
		filterValue.innerHTML = `Até R$ ${value}`;

		showProducts(array.filter((item) => item.price <= value));
	}
}
total();
