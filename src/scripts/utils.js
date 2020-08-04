import PubSub from "pubsub-js";
import rawStore from "../data/data.json";

const renderProduct = item => {
  const productNameSplit = item.product
    .replace(/[\,0-9-_\s+]+/, " ")
    .split(" ");
  const searchTerms = productNameSplit.join("/").toLowerCase();

  return `<div class="product product-${item.id}" data-id="${item.id}">
    <button class="product-button">
      <span class="product-image"><img src="https://source.unsplash.com/featured/200?${searchTerms}" alt="${item.alt}" /></span>
      <span class="product-name">${item.product}</span>
      <span class="product-cost">$${item.cost}</span>
    </button>
    </div>`;
};

const renderProducts = () => {
  console.warn("running RenderProducts():");
  let inventory = "";
  let store = sessionStorage.getItem("store") || rawStore;

  store = JSON.parse(store);

  store.forEach(item => {
    inventory += renderProduct(item);
  });

  sessionStorage.setItem("store", JSON.stringify(store));

  const blob = document.createRange().createContextualFragment(inventory);

  if (blob) {
    PubSub.publish("rendered-products", blob);
  }

  return blob;
};

const loadProducts = containers => {
  const products = renderProducts();

  console.warn("containers:", containers);

  containers.forEach(container => container.appendChild(products));
};

export default { loadProducts, renderProduct, renderProducts };
