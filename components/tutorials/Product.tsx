import styles from "../../styles/Product.module.scss";

const Product = (props) => {
  const {
    product,
    product__title,
    product__button,
    product__description,
    product__prereq,
    product__price,
    product__image,
    product__price_button_container,
  } = styles;
  return (
    <div className={product}>
      <h2 className={product__title}>{props.product.name}</h2>
      <p className={product__description}>{props.product.description}</p>
      <br />
      <p className={product__prereq}>{props.product.prereq}</p>
      <div className={product__image}>
        <img src={props.product.imageRelativeUrl} alt={`image for ${props.product.name}`} />
      </div>
      <div className={product__price_button_container}>
        <div className={product__price}>${props.product.price}</div>
        <form
          action={`/api/purchase?productId=${props.product.id}&priceId=${props.product.priceId}`}
          method="POST"
        >
          <button className={product__button} type="submit" role="link">
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Product;

// data-item-id={props.product.id}
// data-item-name={props.product.name}
// data-item-price={props.product.price}
// data-item-url={props.product.url}
// data-item-image={props.product.image.src}>
