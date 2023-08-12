import { useState } from 'react';
import List from './list';

import styles from '../../styles/ecommerce.module.scss';

const ProductsContent = () => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  
  return (
    <section className={styles.products_content}>
      <div className={styles.products_content__intro}>
        <h2>Men's Tops <span>(133)</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className={styles.products_filter_btn}><i className={styles.icon_filters}></i></button>
        <form className={`${styles.styles} ${orderProductsOpen ? styles.products_order_open : ''}`}>
          <div className={styles.products__filter__select}>
            <h4>Show products: </h4>
            <div className={styles.select_wrapper}>
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
          <div className={styles.products__filter__select}>
            <h4>Sort by: </h4>
            <div className={styles.select_wrapper}>
              <select>
                <option>Popular</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <List />
    </section>
  );
};
  
export default ProductsContent
  