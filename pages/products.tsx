import Breadcrumb from '../components/breadcrumb';
import ProductsFilter from '../components/products-filter';
import ProductsContent from '../components/products-content';

import styles from '../styles/ecommerce.module.scss';

const Products = () => (
  <div>
    <Breadcrumb />
    <section className={styles.products_page}>
      <div className={styles.container}>
        <ProductsFilter />
        <ProductsContent />
      </div>
    </section>
    </div>
)
  
export default Products
  