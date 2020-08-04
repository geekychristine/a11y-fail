import PubSub from "pubsub-js";
import rawStore from "../data/data.json";

const getStore = () => {
  const store = sessionStorage.getItem("store") || rawStore;
  if (typeof store === "string") {
    return JSON.parse(store);
  }
  return store;
};

const renderProduct = item => {
  const productNameSplit = item.product
    .replace(/[\,0-9-_\s+]+/, " ")
    .split(" ");
  const searchTerms = productNameSplit.join("/").toLowerCase();
  const unsplashUrl = "https://source.unsplash.com/featured/200?food,";

  return `<div class="product product-${item.id}" data-id="${item.id}">
    <button class="product-button">
      <span class="product-image"><img src="${unsplashUrl}${searchTerms}" alt="${item.alt}" /></span>
      <span class="product-name">${item.product}</span>
      <span class="product-cost">$${item.cost}</span>
    </button>
    </div>`;
};

const renderProducts = () => {
  let inventory = "";
  const store = getStore();

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

  containers.forEach(container => container.appendChild(products));
};

export default { getStore, loadProducts, renderProduct, renderProducts };