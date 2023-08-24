import ProductList from "/components/tutorials/ProductList";
import Jumbotron from "/components/tutorials/Jumbotron";

export default function Tutorials({products}) {
    return (
        <div className="container mx-auto px-10 mb-8">
            <Jumbotron />
            <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8 border-b border-secondaryShadow" >
                <ProductList products={products}/>
                </div>
            </div>
            <p>In Vancouver? Consider taking an <a href="https://skylinepole.vercel.app/">in person lesson</a> instead for personalized adjustments and spotting.</p>
        </div>


    )
}

export const products = [
    {
        id: "spatchcock",
        name: "Master the Spatchcock",
        price: 30.00,
        image: '/images/spatchcock.png',
        description: "Rated 1.0 in IPSF code of point. Covers the flexibility, strength, and technique to get in and out of Spatchcock.",
        prereq: "No prerequsite to benefit. Progress at your own pace. \n Recommend ability to handspring to fully get the trick.",
        url: '/api/spatchcock'
    },
    {
        id: "marchenko",
        name: "Rainbow Marchenko",
        price: 30.00,
        image: '/images/marchenko.png',
        description: "Get bendy and strong. Master the technique and mobility needed for Rainbow Marchenko.",
        prereq: "No prerequsite to benefit. Progress at your own pace. \n Recommend ability to Brass Monkey to rip the full benefits.",
        url: '/api/marchenko'
    }
]

export const getStaticProps = async (context) => {

    return {
        props: {
            products
        }
    }
}
