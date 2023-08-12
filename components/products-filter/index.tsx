import { useState } from 'react';
import Checkbox from './form-builder/checkbox';
import CheckboxColor from './form-builder/checkbox-color';
import Slider from 'rc-slider';

// data
import productsTypes from './../../utils/ecommerce/data/products-types';
import productsColors from './../../utils/ecommerce/data/products-colors';
import productsSizes from './../../utils/ecommerce/data/products-sizes';

import styles from '../../styles/ecommerce.module.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductsFilter = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const addQueryParams = () => {
    // query params changes
  }

  return (
    <form className={styles.products_filter} onChange={addQueryParams}>
      <button type="button" 
        onClick={() => setFiltersOpen(!filtersOpen)} 
        className={`${styles.products_filter__menu_btn} ${filtersOpen} ? ${styles.products_filter__menu_btn__active} : ''}`}
        >
          Add Filter <i className={styles.icon_down_open}></i>
      </button>
      
      <div className={`${styles.products_filter__wrapper} {${filtersOpen} ? ${styles.products_filter__wrapper__open} : ''`}>
        <div className={styles.products_filter__block}>
          <button type="button">Product type</button>
          <div className={styles.products_filter__block__content}>
            {productsTypes.map(type => (
              <Checkbox 
                key={type.id} 
                name="product-type" 
                label={type.name} 
              />
            ))}
          </div>
        </div>

        <div className={styles.products_filter__block}>
          <button type="button">Price</button>
          <div className={styles.products_filter__block__content}>
            <Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}%`} />
          </div>
        </div>
        
        <div className={styles.products_filter__block}>
          <button type="button">Size</button>
          <div className={`${styles.products_filter__block__content} ${styles.checkbox_square_wrapper}`}>
            {productsSizes.map(type => (
              <Checkbox 
                type="square" 
                key={type.id} 
                name="product-size" 
                label={type.label} />
            ))}
          </div>
        </div>
        
        <div className={styles.products_filter__block}>
          <button type="button">Color</button>
          <div className={styles.products_filter__block__content}>
            <div className={styles.checkbox_color_wrapper}>
              {productsColors.map(type => (
                <CheckboxColor key={type.id} valueName={type.color} name="product-color" color={type.color} />
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className={`${styles.btn} ${styles.btn_submit} ${styles.btn__rounded} ${styles.btn__yellow}`}>Apply</button>
      </div>
    </form>
  )
}
  
export default ProductsFilter
  