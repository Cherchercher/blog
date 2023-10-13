import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72" style={ post.featuredImage?.url? { backgroundImage: `url('${post.featuredImage.url}')` }: {backgroundColor: "black"}} />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-2 items-center justify-center absolute w-full h-full">
      {/* <p className=" mb-4 text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p> */}
      <p className="mb-2 text-white font-semibold text-2xl text-center">{post.title}</p>
      {/* <div className="flex items-center absolute bottom-2 w-full justify-center">
        <Image
          unoptimized
          alt={post.author.name}
          height="20"
          width="30"
          className="align-middle drop-shadow-lg rounded-full"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-white ml-2 font-medium">{post.author.name}</p>
      </div> */}
    </div>
    {/* <button>Read</button> adapt depends on type*/}
    { post.slug && 
    <Link href={`/post/${post.slug}`}><span className="cursor-pointer absolute w-full h-full" /></Link> }
      { post.linkTo && 
    <Link href={post.linkTo}><span className="cursor-pointer absolute w-full h-full" /></Link> }
    
  </div>
);

export default FeaturedPostCard;
