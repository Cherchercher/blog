import styles from "../../../../styles/Product.module.scss";


type CheckboxType = {
	type?: string;
	label: string;
	name: string;
	onChange?: () => void;
}

const Checkbox = ({ type = '', label, name, onChange }: CheckboxType) => (
	<label htmlFor={label+'-'+name} className={`${styles.checkbox} ${type ? 'checkbox__'+type : ''}`}>
		<input name={name} onChange={onChange} type="checkbox" id={label+'-'+name} />
		<span className={styles.checkbox__check}></span>
    	<p>{label}</p>
	</label>
);
  
export default Checkbox;