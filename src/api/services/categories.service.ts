import {CATEGORY_LIST} from '../constants';
import {http} from './http';

class categories {
  getCategoriesList() {
    return http.get(CATEGORY_LIST);
  }
}

export default new categories();
