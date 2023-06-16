/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=${process.env.GOOGLE_PLACES_API_KEY}&query=${req.query.query}&fields=formatted_address,icon,name,photos,place_id,types`;
  const result = await fetch(url);
  const resJson = await result.json();
  console.log(resJson);
  const data = {
    status: resJson.status,
    candidates: resJson.results.map((item) => {
      console.log(item);
      let image = '';
      if ('photos' in item) {
        image = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.API_KEY}&maxwidth=400&photoreference=${item.photos[0].photo_reference}`;
      }
      return {
        formatted_address: item.formatted_address,
        icon: item.icon,
        name: item.name,
        place_id: item.place_id,
        types: item.types,
        rating: item.rating,
        user_ratings_total: item.user_ratings_total,
        image,
      };
    }),
  };
  return res.status(200).send(data);
}
