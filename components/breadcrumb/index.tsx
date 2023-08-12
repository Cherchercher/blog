import styles from '../../styles/ecommerce.module.scss';

const Breadcrumb = () => (
  <section className={styles.breadcrumb}>
    <div className={styles.container}>
      <ul className={styles.breadcrumb_list}>
        <li><a href="#"><i className={styles.icon_home}></i></a></li>
        <li>All Products</li>
      </ul>
    </div>
  </section>
);


export default Breadcrumb