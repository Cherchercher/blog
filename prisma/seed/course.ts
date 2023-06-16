import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const featureList = [
  "HTML",
  "CSS",
  "JavaScript",
  "Version Control",
  "Rapid Prototyping",
  "Cloud Deployement",
  "Debugging",
  "Testing",
  "Projects for Portfolio",
  "Access to Nomadic Hacker Community Slack and Facebook channel",
  "Direct support from instructor",
  "Interview Tips",
  "Work Life Balance",
  "Art to Working Remote",
];

async function main() {
  const course = await prisma.course.upsert({
    where: {courseBucket: 'tutorial-spatchcock'},
    // update: {
    //   courseBucket: 'course-nomadichacker',
    //   name: 'Nomadic Hacker',
    //   price: 1999,
    //   salesPrice: 1299,
    //   productId: "prod_NNTSCDGlblRowA",
    //   pricingUnit: "USD",
    //   pricing: "Early Bird",
    //   instructor: "Cher Huang",
    //   instructorCredential: "Full Stack Developer, Software Engineer at Amazon, Founder & Engineer at Multiple Startups",
    //   pricingEnds: new Date("2023-01-01"),
    //   description: "Gain the skills required to work remotely in tech as a Full Stack Web developer. Motivating community and instructor involvement to get you up to speed. No experience required.",
    // },
    update: {
      courseBucket: 'tutorial-spatchcock',
      name: 'Master Spatchcock',
      price: 30,
      salesPrice: 30,
      productId: "prod_O4x2XFGbGOD7oR",
      pricingUnit: "USD",
      pricing: "Early Bird",
      instructor: "Cher Huang",
      instructorCredential: "Xpert Certified, Contortion (since mid-twenties) trained poler",
      pricingEnds: new Date("2024-01-01"),
      description: "Covers the flexibility, strength, and technique required to get in and out of Spatchcock.",
    },
    create: {
      courseBucket: 'tutorial-spatchcock',
      name: 'Master Spatchcock',
      price: 30,
      salesPrice: 30,
      productId: "prod_O4x2XFGbGOD7oR",
      pricingUnit: "USD",
      pricing: "Early Bird",
      instructor: "Cher Huang",
      instructorCredential: "Xpert Certified, Contortion (since mid-twenties) trained poler",
      pricingEnds: new Date("2024-01-01"),
      description: "Covers the flexibility, strength, and technique required to get in and out of Spatchcock.",
      // features: {
      //   create: 
      //   featureList.map((feature) => (
      //       { description: feature }
      //   )
      //   )
      // },
      // description: "Gain the skills required to work remotely in tech as a Full Stack Web developer. Motivating community and instructor involvement to get you up to speed. ",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
