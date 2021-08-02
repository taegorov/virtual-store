const initialState = {

  productList: [
    { _id: '1', name: "1TB USB", category: "Electronics", inStock: 1936, price: 100.99 },
    { _id: '2', name: "Monitor", category: "Electronics", inStock: 1926, price: 100.99 },
    { _id: '3', name: "Mouse", category: "Electronics", inStock: 886, price: 100.99 },
    { _id: '4', name: "Keyboard", category: "Electronics", inStock: 931, price: 100.99 },
    { _id: '5', name: "TV", category: "Electronics", inStock: 1825, price: 698 },

    { _id: '6', name: "Apples", category: "Food", inStock: 792, price: 100.1 },
    { _id: '7', name: "Calzones", category: "Food", inStock: 777, price: 100.1 },
  ],

  activeProduct: '',
  products: [],
}


export default function productReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ACTIVE':
      const products = getProducts(payload.category);
      return { ...state, products: products }
    default:
      return state;
  }
}


export const getProducts = (category) => {
  const products = initialState.productList;
  const response = products.filter(product => product.category === category);
  return response;
}
