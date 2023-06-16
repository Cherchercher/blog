import { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash.debounce';

import styles from '../styles/search.module.css';

const fakeResults = {
  status: "OK",
  "candidates": [
      {
          "formatted_address": "6910 Melrose Ave, Los Angeles, CA 90038, United States",
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "name": "Object",
          "place_id": "ChIJWSulwdS4woAR7DQBNzC7ipc",
          "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "types": [
              "store",
              "point_of_interest",
              "establishment"
          ],
          "rating": 0,
          "user_ratings_total": 0,
          "image": "https://maps.googleapis.com/maps/api/place/photo?key=undefined&maxwidth=400&photoreference=AfLeUgMG6ipPHV3vVs0DltCyCrj5Fay2F_N42MCnananvGzaYCAgJ3IQ5bkGcZNA5nVTNA0JfxHQu6omHuPEBoBtRungmxxciUaoLzaYRgdW5CRfsxQUFStQlsz5b4U4xQz-ndCSqQngCnV3D-A1DuyTlDQ9f342Qz9F7Q2jM9xju-w7TNRL"
      },
      {
          "formatted_address": "750 Swift Blvd #11, Richland, WA 99352, United States",
          "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
          "name": "Objective Medical Assessments",
          "place_id": "ChIJAQAAAJBwmFQRTjBFwr0DohI",
          "types": [
              "point_of_interest",
              "health",
              "establishment"
          ],
          "rating": 0,
          "user_ratings_total": 0,
          "image": ""
      },
      {
          "formatted_address": "2600 Business Pkwy, Union Gap, WA 98903, United States",
          "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
          "name": "Objective Medical Assessments",
          "place_id": "ChIJ84cuPfN9l1QRCo_va3r2Zo0",
          "types": [
              "point_of_interest",
              "health",
              "establishment"
          ],
          "rating": 0,
          "user_ratings_total": 0,
          "image": ""
      },
      {
          "formatted_address": "C. Amado Paniagua 3017, Aviacion, 22014 Tijuana, B.C., Mexico",
          "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "name": "Object",
          "place_id": "ChIJ40BwPwFJ2YARxYIhuz0hqTs",
          "types": [
              "home_goods_store",
              "store",
              "point_of_interest",
              "establishment"
          ],
          "rating": 4.5,
          "user_ratings_total": 78,
          "image": "https://maps.googleapis.com/maps/api/place/photo?key=undefined&maxwidth=400&photoreference=AfLeUgP_OcbYT4CiSpa7Na2BqvA6A8lIBf9CJ_5WJvVdgID7ncNaNahIXr81ttHOeSWbjj6HSkqj05nbFi4C-c8W5xT5KDv7htnKTtGpNOedwn_DpiKMqTE85rKLIDUzA4pFBZ7a_8FN43DEopn8hARB7S1T1nXCILbZaxg2np-IBhRc8zez"
      },
      {
          "formatted_address": "3017 Ocean Park Blvd, Santa Monica, CA 90405, United States",
          "url": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
          "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
          "name": "Object Salon",
          "place_id": "ChIJNbUEnRy7woARIj-AcQPY_zA",
          "types": [
              "beauty_salon",
              "hair_care",
              "point_of_interest",
              "establishment"
          ],
          "rating": 4.7,
          "user_ratings_total": 60,
          "image": "https://maps.googleapis.com/maps/api/place/photo?key=undefined&maxwidth=400&photoreference=AfLeUgP_pCPoHvYS8pC8jH5lXo32BQniyRRxFNOJHlk_WXAIeflfWet0s38Tp-5PlNQYIgAKxp70outTx9gMcsI5-2hxUsFb3uBBMSJxydU5mjsiXQ5W6owxqjacrVOhYJarsbg0YJ7PsxVDmGd996McNyf6pi87aXXV6Xcd1Oa1-DzoV_o"
      }
  ]
}

console.log(fakeResults);

export default function Accomondations() {
  const searchHotelRef = useRef(null)

  const initialValues = {                   // type all the fields you need
    name: '',
      link: '',
      city: '',
      country: '',
      zipcode: '',
      address: '',
      uploadSpeed: null,
      downloadSpeed: null,
      comments: ''
    };

    const [values, setValues] = useState(initialValues);
    
  const [hotelResults, setHotelResults] = useState([])
  const [hotelSearchActive, setHotelSearchActive] = useState(false)
  // const [isLoading, setLoading] = useState(false);

  const changeHandler = async (nextValue) => {
    console.log(nextValue);
    const result = await fetch(
      `/api/googlePlaces?query=${nextValue}`,
      {
        method: 'GET',
      },
    );
    console.log(nextValue, resultJson);
    const resultJson = await result.json();
    if (resultJson.status == "OK") {
      setHotelResults(resultJson.candidates);
    }
  };

  const onClick = useCallback((e) => {
    console.log(searchHotelRef.current, searchHotelRef.current.contains(e.target), e.target.nodeName);
    if (searchHotelRef.current && searchHotelRef.current.contains(e.target) && e.target.nodeName == 'A') {
        setHotelSearchActive(false);
        const data = JSON.parse(e.target.getAttribute("data"));
        const formatted_address = data.formatted_address.split(",")
        setValues({
          ...values,
          link: data.name,
          address: formatted_address[0],
          city: formatted_address[1],
          zipcode: formatted_address[2],
          country: formatted_address[3],
          name: data.name,
        });

        return
    }
    // window.removeEventListener('click', onClick)
  }, [])

  const onFocusSearchHotel = useCallback(() => {
    setHotelSearchActive(true)
    window.addEventListener('click', onClick)
  }, [])


//   formatted_address
// : 
// "750 Swift Blvd #11, Richland, WA 99352, United States"
// icon
// : 
// "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png"
// image
// : 
// ""
// name
// : 
// "Objective Medical Assessments"
// place_id
// : 
// "ChIJAQAAAJBwmFQRTjBFwr0DohI"
// types
// : 
// Array(3)
// 0
// : 
// "health"
// 1
// : 
// "point_of_interest"
// 2
// : 
// "establishment"
// length
// : 
// 3


  const debouncedSave = useCallback(
    debounce( async (nextValue) => await changeHandler(nextValue), 1000),
    [], // will be created only once initially
  );
  const debouncedChangeHandler = (e) => {
    setValues({
      ...values, // spreading the unchanged values
      name: e.target.value,          // changing the state of *changed value*
    });
    debouncedSave(e.target.value);
  };


  useEffect(() => debouncedChangeHandler.cancel, []);

  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6" ref={searchHotelRef}>
        <div className={`${styles.container} w-full px-3`}>
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-name"
          >
            Hotel/B&B Name
          </label>
          <input
            value={values.name}
            name='name'
            onFocus={onFocusSearchHotel}
            onChange={(e) => debouncedChangeHandler(e)}
            className={`${styles.search} appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="grid-password"
            type="text"
            placeholder="Hotel Name"
          />
            { hotelSearchActive && hotelResults.length > 0 && (
              <ul className={styles.results}>
                {hotelResults.map((candidate, _) => (
                  <li className={styles.result} key={candidate.place_id}>
                    {/* <Link href="/posts/[id]" as={`/posts/${id}`}> */}
                      <a data={JSON.stringify(candidate)}>{candidate.name}</a>
                    {/* </Link> */}
                  </li>
                ))}
              </ul>
          ) }
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-address"
          >
            address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-address"
            type="text"
            name='address'
            value={values.address}
            placeholder="Address"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-link"
          >
            Hotel/B&B Link
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            name='link'
            value={values.link}
            placeholder="Website/Link to Accomondation"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            City
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            name='city'
            value={values.city}
            placeholder="City"
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-country"
          >
            Country
          </label>
          <input
            name='country'
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            value={values.country}
            placeholder="Country"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Zip Code
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="text"
            value={values.zipcode}
            name='zipcode'
            placeholder="90210"
          />
        </div>
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-upload-speed"
          >
            Upload Internet Speed
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="number"
            name='uploadSpeed'
            value={values.uploadSpeed}
            placeholder="Upload Speed"
          />
        </div>
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-download-speed"
          >
            Download Internet Speed
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="number"
            name='downloadSpeed'
            value={values.downloadSpeed}
            placeholder="Download Speed"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide  text-xs font-bold mb-2"
            htmlFor="grid-comment"
          >
            Comments
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="text-area"
            value={values.comments}
            name='comments'
            placeholder="What's stellar about this place?"
          />
        </div>
      </div>
    </form>
  );
}

// Fetch data at build time
// export async function getStaticProps() {
//   const posts = (await getPosts()) || [];
//   return {
//     props: { posts },
//   };
// }
