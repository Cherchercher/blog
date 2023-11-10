import { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import ContentLoader from "react-content-loader";
import { fetcher } from "utils/SWRFetcher";
import useSWRImmutable from "swr/immutable";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const LessonsSubItems = [
  {
    key: "codingLessons",
    name: "Coding",
    url: "/tutorial/tutorials?courseType=EBOOK",
  },
  {
    key: "pole",
    name: "Pole Dance/Flexibility",
    url: "/tutorial/tutorials?courseType=SINGLE_VIDEO",
  },
];

const LoadingSkeleton = () => (
  <div className="flex justify-center max-w-screen-md mx-auto my-24">
    <ContentLoader
      speed={2}
      width={"100%"}
      height={"100%"}
      viewBox="0 0 557 305"
      backgroundColor="#f5f5f5"
      foregroundColor="#efefef"
    >
      <rect x="0" y="0" rx="3" ry="3" width="370" height="30" />
      <rect x="0" y="190" rx="4" ry="4" width="72" height="15" />
      <rect x="0" y="90" rx="4" ry="4" width="557" height="15" />
      <rect x="0" y="115" rx="4" ry="4" width="305" height="15" />
      <rect x="0" y="140" rx="4" ry="4" width="557" height="15" />
      <rect x="0" y="165" rx="4" ry="4" width="557" height="15" />
      <rect x="0" y="215" rx="4" ry="4" width="418" height="15" />
      <rect x="0" y="240" rx="4" ry="4" width="557" height="15" />
      <rect x="0" y="265" rx="4" ry="4" width="533" height="15" />
      <rect x="0" y="290" rx="4" ry="4" width="344" height="15" />
      <rect x="0" y="43" rx="3" ry="3" width="431" height="21" />
    </ContentLoader>
  </div>
);

const ErrorComponent = (error, message) => {
  return (
  <div className="prose max-w-screen-md mx-auto my-24">
    <h1> Error: {error ? error.message : message? message: "Couldn&apos;t find this Lesson!"} </h1>
    <p>
      Maybe the Lesson was removed by the author, please contact support
      cherhuang@goplanatrip.com
    </p>
  </div>
)};

function PricingTab(props) {
  return (
    <div className={`h-full ${props.popular ? "dark" : ""}`}>
      <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 shadow shadow-slate-950/5">
        {props.popular && (
          <div className="absolute top-0 right-0 mr-6 -mt-4">
            <div className="inline-flex items-center text-xs  py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">
              Most Popular
            </div>
          </div>
        )}
        <div className="mb-5">
          <div className="text-slate-900 dark:text-slate-200  mb-1">
            {props.planName}
          </div>
          <div className="inline-flex items-baseline mb-2">
            <span className="text-slate-900 dark:text-slate-200 font-bold text-3xl">
              $
            </span>
            <span className="text-slate-900 dark:text-slate-200 font-bold text-4xl">
              {props.yearly ? props.price.yearly : props.price.monthly}
            </span>
            {/* <span className="text-slate-500 font-medium">/mo</span> */}
          </div>
          <div className="text-sm text-slate-500 mb-5">
            {props.planDescription}
          </div>
          <a
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
            href={props.href}
          >
            Schedule A Session
          </a>
        </div>
        <div className="text-slate-900 dark:text-slate-200 font-medium mb-3">
          Includes:
        </div>
        <ul className="text-slate-600 dark:text-slate-400 text-sm space-y-3 grow">
          {props.features.map((feature, index) => {
            return (
              <li key={index} className="flex items-center">
                <svg
                  className="w-3 h-3 fill-emerald-500 mr-3 shrink-0"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                </svg>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function PricingTable() {
  const router = useRouter();
  const [yearly, setYearly] = useState(true);

  const { data, error } = useSWRImmutable(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pitches/coachingPitch.mp4`,
    fetcher
  );

  const [courseUrl, setCourseUrl] = useState(data?.mediaData.url);

  const [videoSrc, setVideoSrc] = useState({
    type: "video",
    sources: [
      {
        src: courseUrl,
        type: "video/mp4",
      },
    ],
  });

  useEffect(() => {
    setCourseUrl(data?.mediaData);
    setVideoSrc({
      type: "video",
      sources: [
        {
          src: data?.mediaData,
          type: "video/mp4",
        },
      ],
    });
  }, [data]);

  if (error) {
    router.push(`error?error=${error.message}`);
  }

  console.log(data, videoSrc);

  return (
    <div>
      {/* 
<>Do you know? It takes on average 100 hours to prep for a FAANG interview. If you fail, you'd have to wait for 6-12 months before re-applying. </>
<>You only get one shot! Maximize your chance of landing your dream job with my 1:1 interview coaching program</>

<>In addition to a in-depth analysis of your personal strength and weakness, in combination with my technical background and skills...Interview preping doesn't have to be overwhelming, I've been there.</>

      <>The only obstable between you and your 6 figure job is U. Act now!</>
      <>Preperation is key. 3 months to get ready for their FAANG interview.</>
      <>Jack messed around with interviews, failed, and waited 6-12 months before applying again...Don't be like Jack! Invest in proper interview prep.</>
      <>How many mock interviews should I prep for? The average FAANG interview has 3 rounds. The first round is an online coding test, the second round is a techical phone interview. The final round is 4 technical + 1 behavior interviews. To maximize your chance at success, I recommend taking the 5 interview package.</>
      <>Should I schedule the interviews in the same day, or can I take them seperatly? You can schedule them one at time at your convenience. To fully emulate a technical interview, I recommend that you take all the interviews in one day. </>
      <>Do I get a referral? I can only refer candidates that I've worked with. If you're interested in building your portofio, consider one of my coding lessons, or shoot me a message to collab on one of my many interesting projects! </>
      <>1 hour coaching:
Have a question about your upcoming interview? 
Want to get start building your resume as a Freshman/Sapphmore? 
Feeling lost about your career 
Position yourself to winning with 1:1 coaching session.
. Private Coaching available.</> */}
      {/* Pricing toggle */}

      <div className="flex flex-row">
        {data && data.mediaData && (
          <div className="flex-1 pl-6 my-0 grow-1">
            <Plyr source={videoSrc} />
          </div>
        )}

        {!data && !error && <LoadingSkeleton />}
        {error && <ErrorComponent error={error} />}
      </div>
      <div className="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-16">
        <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full">
          <span
            className="absolute inset-0 m-1 pointer-events-none"
            aria-hidden="true"
          >
            <span
              className={`absolute inset-0 w-1/2 bg-indigo-500 rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${
                yearly ? "translate-x-0" : "translate-x-full"
              }`}
            ></span>
          </span>
          <button
            className={`relative flex-3 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
              yearly ? "text-white" : "text-slate-500 dark:text-slate-400"
            }`}
            onClick={() => setYearly(true)}
            aria-pressed={false}
          >
            Early Bird{" "}
            <span
              className={`${
                yearly
                  ? "text-indigo-200"
                  : "text-slate-400 dark:text-slate-500"
              }`}
            >
              -30%
            </span>
          </button>
          {/* <button
            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${
              yearly ? "text-slate-500 dark:text-slate-400" : "text-white"
            }`}
            onClick={() => setYearly(false)}
            aria-pressed={true}
          >
            Monthly
          </button> */}
        </div>
      </div>
      <div className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none">
        {/* Pricing tab 1 */}
        <PricingTab
          yearly={yearly}
          planName="Basic Package"
          href={`/meet?programName=Basic%20Interview%20Coaching%20Program&productId=${process.env.NEXT_PUBLIC_BASIC_INTERVIEW_PRODUCT_ID}&priceId=${process.env.NEXT_PUBLIC_BASIC_INTERVIEW_PRICE_ID}`}
          price={{ yearly: 129, monthly: 35 }}
          planDescription="Best for candidates looking for a quick refresher on a specific interview type."
          features={[
            "One-hour mock interview",
            "Choice of coding, system design, or behavioral",
            "Expert FAANG+ interviewer",
            "Personalized feedback",
            "Option for complete anonymity",
          ]}
        />

        {/* Pricing tab 2 */}
        <PricingTab
          yearly={yearly}
          popular={true}
          planName="Complete Package"
          href={`/meet?programName=Complete%20Interview%20Coaching%20Program&productId=${process.env.NEXT_PUBLIC_COMPLETE_INTERVIEW_PRODUCT_ID}&priceId=${process.env.NEXT_PUBLIC_COMPLETE_INTERVIEW_PRICE_ID}`}
          price={{ yearly: 529, monthly: 55 }}
          planDescription="Ideal for candidates wanting to best emulate a full interview loop."
          features={[
            "Personalized prep plans",
            "3 one-hour mock interviews",
            "Choice of coding, system design, or behavioral",
            "Expert FAANG+ interviewer",
            "Personalized feedback",
            "Option for complete anonymity",
            "Discord Channel: find a buddy peers to continue your mock interview, job opportunities, network with professionals",
          ]}
        />

        {/* Pricing tab 3 */}
        <PricingTab
          yearly={yearly}
          planName="Delux Package"
          href={`/meet?programName=Delux%20Interview%20Coaching%20Program&productId=${process.env.NEXT_PUBLIC_DELUX_INTERVIEW_PRODUCT_ID}&priceId=${process.env.NEXT_PUBLIC_DELUX_INTERVIEW_PRICE_ID}`}
          price={{ yearly: 899, monthly: 85 }}
          planDescription="Everything in Complete Package, plus 1:1 technical + behaviour interview tips session"
          features={[
            "Everything in Complete Package",
            "1 The Secret to Nailing the Behavior Inteview Session",
            "1 Technical Interview Tips Session",
            "5 one-hour mock interviews",
            "Contineous support till the day of your interview",
          ]}
        />
      </div>
        
      <h2 className="pt-5 text-2xl">Q&A</h2>
      <Menu as="div" className="z-10 mt-2 align-middle ml-4 ">
        <Dropdown
          name={"I'm not a new grad, is this program for me?"}
          answer={"You don't have to be a new grad to join. If you are looking to land a job in the big five: Amazon, Meta, Google, Netflix, Microsoft, this program is for you! Experienced engineers are more likely to get interviews."}
          useHover={false}
        />
      </Menu>
      <Menu as="div" className="z-10 mt-2 align-middle ml-4">
        <Dropdown
          name={"How long does it take to prep for my tech interview?"}
          answer={"Typcially one would spend 3 months preping for interviews. Program participants typically schedule their sessions one month ahead of their interviews. Ultimately it's up to your own pace and we are here to accelerate your learning."}
          useHover={false}
        />
      </Menu>
      <Menu as="div" className="z-10 mt-2 align-middle ml-4 ">
        <Dropdown
          name={"How many mock interviews should I do?"}
          answer={"3 is typically what people goes for. The final rounds of interviews consists of 5 consecutive interviews, so If you'd like to emulate the full interview scenerio, 5 is recommended."}
          useHover={false}
        />
      </Menu>
      <Menu as="div" className="z-10 mt-2 align-middle ml-4">
        <Dropdown
          name={"Do I get a referral?"}
          answer={"I can recommend candidates based on their skills and ability. I also give strong recommendations for people that I've worked with. Shoot me an email at cherhuang@goplanatrip.com to check on open projects!"}
          useHover={false}
        />
      </Menu>
      <Menu as="div" className="z-10 mt-2 align-middle ml-4 ">
        <Dropdown
          name={"Can you help me revise my resume?"}
          answer={"Yes. It's included in the delux package. It's also available as an add on to any purchased package."}
          useHover={false}
        />
      </Menu>
      <Menu as="div" className="z-10 mt-2 align-middle ml-4 ">
        <Dropdown
          name={
            "I have no previous internship/work experience. Can I get an interview?"
          }
          answer={"Yes it is possible! Many of my colleagues in non Computer Science major got hired with no prior work experience. "}
          useHover={false}
        />
      </Menu>
      {/* <>Does your daughter/neice need a mentor? Look no further:) Cher is the perfect choice for as a mentor for her career in tech.</> */}
    </div>
  );
}
