/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import React, { useEffect } from 'react';

const tier = {
  name: "Standard",
  href: "#",
  price: 5,
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  features: [
    // "Private Discord Community",
    // "Access to online ebook",
    // "Access to resources list",
    "Find a niche",
    "Learn the skills",
    "Master the interviews",
    "Build a Portfolio",
    "Find Remote Work",
    "Networking",
  ],
};


export const data = {
  others: [
    {
      name: "How To Be A Remote Sotware Engineer With Zero Background",
      instructor: "Cher Huang",
      instructorCredential:
        "Software Engineer at Amazon and multiple startups, Cher started her career as a Full Stack Web Developer with a bootcamp. 5 years later with 30 countries traveled, she's now spreading the joy of tech as a remote-friendly, fullfilling career.",
      features: [
        "Find a niche",
        "Horn your skills",
        "Nail the interviews",
        "Build a Portfolio",
        "Find Remote Work",
        "Networking",
      ],
      courseBucket: "ebook-howtosoftware",
      courseType: "EBOOK",
      price: "2",
      instructorId: "clj9n6mfz0000ml08m03c0x3k",
      imageRelativeUrl: "/images/booklet.png",
      id: process.env.NEXT_PUBLIC_BOOKLET_PRODUCT_ID,
      priceId: process.env.NEXT_PUBLIC_BOOKLET_PRICE_ID,
      pricingEnds: "2025-01-01  12:00:00 AM",
      pricing: "LIMITED TIME OFFER",
      salesPrice: "2",
      pricingUnit: "$",
      description:
        "All the steps you need to go from zero to a career and lifestyle as a Software Engineer.",
    },
  ],
};

export const Pricing = () => {
  // let { data, error } = useSWR<LessonsResponse>(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons?courseType=EBOOK`,
  //   fetcher
  // );

  

  return (
    <>
      { data?.others?.map((course) => (
        <div className="mt-0 pb-12 sm:mt-12 sm:pb-16 lg:mt-0 lg:pb-24">
          {/* <div className="mt-8 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">*/}
          <div className="relative">
            <div className="absolute inset-0 h-3/4" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto space-y-1 lg:gap-5 lg:space-y-0">
                <div className="rounded-lg shawdow-lg">
                  <div className="float-left lg:w-1/2">
                    {/* <div className="px-6 py-8 sm:p-10 sm:pb-6"> */}
                    <div className="px-1 py-1 sm:p-10 sm:pb-6">
                      <div className="mt-4 items-baseline text-4xl font-extrabold">
                        {course.name} Booklet
                      </div>
                      <div className="mt-4">
                        <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600 mr-1">
                          {course.pricing}
                        </h3>
                        {course.pricing == "SALE" && (
                          <h3 className="ml-3 inline-flex line-through text-lg italic text-red-500 font-semibold tracking-wid">
                            {course.price}
                          </h3>
                        )}
                        <h3 className="ml-1 text-lg inline-flex font-semibold tracking-wid">
                          {course.salesPrice}
                          {course.pricingUnit}
                        </h3>
                      </div>
                      {/* <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                        ${course.salesPrice} {course.pricingUnit}
                      </div> */}
                      <div className="mt-4 text-2xl lg:mt-6">
                        {course.description}
                      </div>
                      <div className="mt-4 text-2xl lg:mt-6">
                        {course.instructorCredential}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                      <ul role="list" className="space-y-1 flex flex-wrap">
                        {course.features?.map((feature) => (
                          <li key={feature} className="w-1/2 flex items-start">
                            <div className="flex-shrink-0">
                              <CheckCircleIcon
                                className="h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base text-gray-700">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <form
                        action={`/api/purchase?productId=${course.id}&priceId=${course.priceId}`}
                        method="POST"
                      >
                          <button
                            className="w-full text-white flex items-center bg-primary justify-center px-5 py-3 cursor-pointer border-transparent text-base font-bold rounded-md  bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            type="submit"
                            role="link"
                          >
                            Buy now
                          </button>
                      </form>
                    </div>
                  </div>
                  <div className="p-6 float-right inline-block lg:w-1/2 h-100 py-14">
                    <img className="mt-3" src="/images/booklet.png" />
                    <div className="m-3 text-2xl font-semibold font-italic">
                      By {course.instructor}
                    </div>
                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="linkedIn mb-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                    >
                      <a href="https://www.linkedin.com/in/cherhuang1031">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

