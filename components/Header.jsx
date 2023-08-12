import React, { useState, useEffect } from'react';

import Link from'next/link';
import { useSession, signOut } from'next-auth/react';
import { getCategories } from'../services';

const Header = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='border-b w-full inline-block border-secondaryShadow py-8'>
        <div className='md:float-left block'>
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl'>
              <img src='/icon-transparent.png' className='icon mr-2 mb-1' />
              Nomadic Hacker
            </span>
          </Link>
        </div>
        <div className='md:float-left md:contents'>
          {status ==='authenticated' ? (
            <Link href='/'>
              <span
                onClick={() =>
                  signOut({
                    callbackUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
                  })
                }
                className='md:float-right mt-2 align-middle  ml-14 font-semibold cursor-pointer'
              >
                {''}
                Logout{''}
              </span>
            </Link>
          ) : (
            <Link href='/login'>
              <span className='md:float-right mt-2 align-middle  ml-14 font-semibold cursor-pointer'>
                {''}
                Login{''}
              </span>
            </Link>
          )}

          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                Blog
              </span>
            </Link>
          ))}
          {/* <Link
            key='in-my-bag'
            href='/in-my-bag'
          >
            <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
              In My Bag
            </span>
          </Link> */}
          {/* <Link
            key='remote-friendly-accomondations'
            href='/remote-friendly-accomondations'
          >
            <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
              Hacker Homes
            </span>
          </Link> */}

          {status ==='authenticated' ? (
            // <Link key='lessons' href='/course/lessons'>
            //   <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
            //     Lessons
            //   </span>
            // </Link>
            <Link key='lessons' href='/tutorial/tutorials'>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                Tutorials
              </span>
            </Link>
          ) : (
            <Link key='tutorials' href='/tutorials'>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                Tutorials
              </span>
            </Link>
            // <Link key='nomadic-hacker-academy' href='/course'>
            //   <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
            //     Hacker Academy
            //   </span>
            // </Link>
          )}
            <Link key='inMyBag' href='/inMyBag'>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                In My Bag
              </span>
            </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Header;
