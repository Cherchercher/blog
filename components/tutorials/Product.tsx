import Image from 'next/image'
import styles from '../../styles/Product.module.scss';

const Product = (props) => {
    return (
        <div className={styles.product}>
            <h2 className={styles.product__title}>{props.product.name}</h2>
            <p className={styles.product__description}>{props.product.description}</p>
            <br/>
            <p className={styles.product__prereq}>{props.product.prereq}</p>
            <div className={styles.product__image}>
            <Image src={props.product.image} alt={props.product.image.src} />
            </div>
            <div className={styles.product__price_button_container}>
                <div className={styles.product__price}>${props.product.price.toFixed(2)}</div>
                <form
                //prod_O4wuJn9rU1aSBF
                        action="/api/spatchcock?productId=prod_O4x2XFGbGOD7oR"
                        method="POST"
                      >
                          <button
                            className={styles.product__button}
                            type="submit"
                            role="link"
                          >
                            Purchase
                          </button>
                      </form>

                {/* <button className={styles.product__button}>
                    Add to Cart
                </button> */}
            </div>
        </div>
    )
}

export default Product

                    // data-item-id={props.product.id}
                    // data-item-name={props.product.name}
                    // data-item-price={props.product.price}
                    // data-item-url={props.product.url}
                    // data-item-image={props.product.image.src}>