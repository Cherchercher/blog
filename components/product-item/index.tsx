import Link from 'next/link';
import { some } from 'lodash';
import { toggleFavProduct } from 'store/reducers/user';
import { ProductTypeList } from 'types';

const ProductItem = ({ discount, images, id, name, price, currentPrice }: ProductTypeList) => {
  // const isFavourite = some(favProducts, productId => productId === id);

  // const toggleFav = () => {
  //   dispatch(toggleFavProduct(
  //     { 
  //       id,
  //     }
  //   ))
  // }

  // onClick={toggleFav}
  return (
    <div className="product_item">
      <div className="product__image">
        <button type="button" className={`btn-heart ${true ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>

        <Link href={`/product/${id}`}>
          <a>
            <img src={images ? images[0] : ''} alt="product" />
            {discount && 
              <span className="product__discount">{discount}%</span>
            }
          </a>
        </Link>
      </div>
      
      <div className="product__description">
        <h3>{name}</h3>
        <div className={"product__price " + (discount ? 'product__price--discount' : '')} >
          <h4>${ currentPrice }</h4>

          {discount &&  
            <span>${ price }</span>
          }
        </div>
      </div>
    </div>
  )
};


export default ProductItem