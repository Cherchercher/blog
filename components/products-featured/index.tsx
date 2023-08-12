import ProductsCarousel from './carousel';
import useSwr from 'swr';

import styles from '../../styles/ecommerce.module.scss';

const ProductsFeatured = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSwr('/api/products', fetcher);

  return (
    <section className={`${styles.section} ${styles.section_products_featured}`}>
      <div className={styles.container}>
        <header className={styles.section_products_featured__header}>
          <h3>Selected just for you</h3>
          <a href="/products" className={`${styles.btn} ${styles.btn__rounded} ${styles.btn__border}`}>Show All</a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  )
};

export default ProductsFeatured