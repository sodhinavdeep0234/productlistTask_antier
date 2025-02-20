import {
  PRODUCTS_LIST,
  PRODUCTS_LIST_GET_BY_CATEGORY,
  SEARCH_LIST,
} from '../constants';
import {http} from './http';

class products {
  getProductsList(data: any) {
    return http.get(`${PRODUCTS_LIST}?limit=${data.limit}&skip=${data?.page}`);
  }
  getProductsByCatList(data: any) {
    return http.get(`${PRODUCTS_LIST_GET_BY_CATEGORY}${data?.category}`);
  }
  getProductsBySearch(label: string) {
    return http.get(`${SEARCH_LIST}?q=${label}`);
  }
}

export default new products();
