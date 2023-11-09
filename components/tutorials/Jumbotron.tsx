import styles from "../../styles/Product.module.scss";

const Jumbotron = (props) => {
  let {paragraphOne, heading, paragraphTwo} = props;
  console.log(paragraphOne)
  
  return (
  <>
    <div className={styles.promotional_message}>
     {paragraphOne && paragraphOne()}
     {heading()}
     {paragraphTwo()}
    </div>
  </>
)
  }

export default Jumbotron;


{/* <p>
<strong>Step-by-step tutorials </strong> to get that trick.
</p>
<h2>Be Pole Strong</h2>
<p>
By <strong>Xpert certified, contortion trained</strong> poler
</p> */}