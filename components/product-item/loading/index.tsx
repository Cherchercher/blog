import styles from '../../../styles/ecommerce.module.scss';

const ProductItemLoading = () => (
  <a href="#" className={`${styles.product_item} ${styles.product_item__loading}`}>
    <div className={styles.product__image}>

    </div>
    
    <div className={styles.product__description}>
      <h3></h3>
      <div className={styles.product__price}>
        <h4></h4>
      </div>
    </div>
  </a>
);


export default ProductItemLoading