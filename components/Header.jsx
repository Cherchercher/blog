import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { getCategories } from "../services";
import Dropdown from "./Dropdown";

const Header = () => {
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  // const coachingSubItems = [
  //   {
  //     key: "techInterview",
  //     name: "Tech Interview",
  //     url: "someUrl",
  //   },
  //   {
  //     key: "workout",
  //     name: "Workout",
  //     url: "someUrlOne",
  //   },
  // ];

  // , {
  //   key: "lifestyle",
  //   name: "Travel & Lifestyle",
  //   url: "someUrlTwo"
  // }, {
  //   key: "ecommerce",
  //   name: "ECommerce",
  //   url: "someUrlThree"
  // }

  // const LessonsSubItems = [
  //   {
  //     key: "codingLessons",
  //     name: "Coding",
  //     url: "/tutorial/tutorials?courseType=EBOOK",
  //   },
  //   {
  //     key: "pole",
  //     name: "Pole Dance/Flexibility",
  //     url: "/tutorial/tutorials?courseType=SINGLE_VIDEO",
  //   },
  // ];


  const PoleSubItems = [
    {
      key: "poleFitness",
      name: "Pole Fitness",
      url: "/tutorials?courseType=SINGLE_VIDEO",
    },
  ];

  const TechSubItems = [
    {
      key: "remoteWork",
      name: "Guide to Remote Work",
      url: "/tutorials?courseType=EBOOK",
    },
    {
      key: "interviewCoaching",
      name: "Interview Coaching",
      url: "/coaching",
    },
  ];

  // const AuthSubItems = [
  //   {
  //     key: "poleFitness",
  //     name: "Pole Fitness",
  //     url: "/tutorials?courseType=SINGLE_VIDEO",
  //   },
  // ];
  const AuthTechSubItems = [
    {
      key: "remoteWork",
      name: "Guide to Remote Work",
      url: "/tutorials?courseType=EBOOK",
    },
    {
      key: "interviewCoaching",
      name: "Interview Coaching",
      url: "/coaching",
      //go to calendar schedule page to schedule more sessions if user has purchased and has credits left
      // can also add additional sessions on top of existing package (upsell)
    },
  ];

  // url: "tutorials?courseType=SINGLE_VIDEO",
  // , {
  //   key: "flexibility",
  //   name: "Flexibility/Contortion",
  //   url: "someUrlTwo"
  // }

  // , {
  //   key: "ecommerce",
  //   name: "ECommerce",
  //   url: "someUrlThree"
  // }
  const readSubItems = [
    {
      key: "travelBlog",
      name: "Travel",
      url: "someUrl",
    },
    {
      key: "pole",
      name: "Break Into Tech",
      url: "someUrlOne",
    },
    {
      key: "Remote Work",
      name: "Flexibility/Contortion",
      url: "someUrlTwo",
    },
  ];

  // , {
  //   key: "ecommerce",
  //   name: "ECommerce",
  //   url: "someUrlThree"
  // }
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-secondaryShadow py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl">
              <img src="/icon-transparent.png" className="icon mr-2 mb-1" />
              Nomadic Hacker
            </span>
          </Link>
        </div>
        <div className="md:float-left md:contents">
          {status === "authenticated" ? (
            <Link href="/">
              <span
                onClick={() =>
                  signOut({
                    callbackUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
                  })
                }
                className="md:float-right mt-2 align-middle  ml-14 font-semibold cursor-pointer"
              >
                {""}
                Logout{""}
              </span>
            </Link>
          ) : (
            <Link href="/login">
              <span className="md:float-right mt-2 align-middle  ml-14 font-semibold cursor-pointer">
                {""}
                Login{""}
              </span>
            </Link>
          )}
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
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer">
                Travel Blog
              </span>
            </Link>
          ))}

          {status === "authenticated" ? (
             <>
            <Link key='lessons' href='/tutorial/tutorials'>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                Purchased Lessons
              </span>
            </Link>
              <Menu
                as="div"
                className="z-10 md:float-right mt-2 align-middle ml-4 font-semibold"
              >
                <Dropdown
                  name={"Software Engineering"}
                  url={"someURL"}
                  subItems={AuthTechSubItems}
                  useHover={true}
                />
              </Menu>
            </>
          ) : (
            <>
              <Menu
                as="div"
                className="z-10 md:float-right mt-2 align-middle ml-4 font-semibold"
              >
                <Dropdown
                  name={"Pole Fitness"}
                  url={"/tutorials?courseType=SINGLE_VIDEO"}
                  subItems={PoleSubItems}
                  useHover={true}
                />
              </Menu>

              <Menu
                as="div"
                className="z-10 md:float-right mt-2 align-middle ml-4 font-semibold"
              >
                <Dropdown
                name={"Software Engineering"}
                url={"/tutorials?courseType=EBOOK"}
                subItems={TechSubItems}
                useHover={true}
                />
              </Menu>
              {/* <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Options
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Duplicate
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
              {/* </Menu> */}
              {/* <Link key='tutorials-pole' href='/tutorials?courseType=SINGLE_VIDEO'>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                Pole Tutorials
              </span>
            </Link>
            
            <Link key='tutorials-software' href='/tutorials?courseType=EBOOK'>
            <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
            Learn Coding
            </span>
          </Link> */}
            </>
            // <Link key='nomadic-hacker-academy' href='/course'>
            //   <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
            //     Hacker Academy
            //   </span>
            // </Link>
          )}

          {/* <Link key='inMyBag' href='/inMyBag'>
              <span className='md:float-right mt-2 align-middle  ml-4 font-semibold cursor-pointer'>
                In My Bag
              </span>
            </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
