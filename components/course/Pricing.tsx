/* This example requires Tailwind CSS v2.0+ */
import { CheckCircleIcon } from "@heroicons/react/outline";

import React from "react";
import { fetcher } from "utils/SWRFetcher";
import { LessonsResponse } from "pages/api/lessons";
import useSWR from "swr";

const tier = {
  name: "Standard",
  href: "#",
  price: 5,
  description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  features: [
    "Private Discord Community",
    "Access to online ebook",
    "Access to resources list",
  ],
};

export const Pricing = () => {
  const { data, error } = useSWR<LessonsResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons`,
    fetcher
  );

  console.log(data);

  return (
    <>
      {data?.others?.map((course) => (
        <div className="mt-8 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
          <div className="relative">
            <div className="absolute inset-0 h-3/4" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto space-y-1 lg:gap-5 lg:space-y-0">
                <div className="rounded-lg shawdow-lg">
                  <div className="float-left lg:w-1/2">
                    <div className="px-6 py-8 sm:p-10 sm:pb-6">
                      <div className="mt-4 items-baseline text-6xl font-extrabold">
                        {course.name} Course
                      </div>
                      <div>
                        <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                          {course.pricing}
                        </h3>
                        <h3 className="ml-3 inline-flex line-through text-lg italic text-red-500 font-semibold tracking-wid">
                          {course.price}
                        </h3>
                        <h3 className="ml-1 text-lg inline-flex font-semibold tracking-wid">
                          {course.salesPrice} {course.pricingUnit}
                        </h3>
                      </div>
                      {/* <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                        ${course.salesPrice} {course.pricingUnit}
                      </div> */}
                      <div className="mt-3 text-2xl">{course.description}</div>
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
                        action="/api/checkout?productId=prod_NNTSCDGlblRowA"
                        method="POST"
                      >
                        <section>
                          <button
                            className="w-full text-white flex items-center bg-primary justify-center px-5 py-3 cursor-pointer border-transparent text-base font-bold rounded-md  bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            type="submit"
                            role="link"
                          >
                            Buy now
                          </button>
                        </section>
                      </form>
                    </div>
                  </div>
                  <div className="p-6 float-right inline-block lg:w-1/2 h-100 py-14">
                    <img className="mt-3" src="/images/nomadicCourse.png" />
                    <div className="mt-3 text-2xl font-semibold font-italic">
                      Taught By {course.instructor}
                    </div>
                    <div className="mt-3 text-2xl">
                      {course.instructorCredential}
                    </div>

                    <>
                      <button
                        className="btn-icon-only"
                        color="linkedin"
                        type="button"
                      >
                        <span className="btn-inner--icon">
                          <i className="fab fa-linkedin"></i>
                        </span>
                      </button>
                      <button
                        className="btn-icon-only"
                        color="facebook"
                        type="button"
                      >
                        <span className="btn-inner--icon">
                          <i className="fab fa-facebook"></i>
                        </span>
                      </button>
                      <button
                        className="btn-icon-only"
                        color="instagram"
                        type="button"
                      >
                        {" "}
                        <span className="btn-inner--icon">
                          <i className="fab fa-instagram"></i>
                        </span>
                      </button>
                    </>
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
