import type { AppointmentProps } from "../types"
import getAccessToken from "lib/availability/getAccessToken"

// Helper function to build the description
function buildDescription(location: string) {
  if (!process.env.OWNER_EMAIL) {
    throw new Error(`OWNER_EMAIL is not set.`)
  }

  const baseDescription = `Hello, thanks for setting up time!\n\n`
  const phoneDetails = `My email is ${process.env.OWNER_EMAIL}. Please let me know if you have any questions!`
  const meetDetails = `Details for Google Meet are attached; please let me know if that works or if you’d like to meet using a different provider.`
  const closing = `\n\nSee you then!`

  return (
    baseDescription +
    (location === `phone` ? phoneDetails : meetDetails) +
    closing
  )
}

// Helper function to build the event body
function buildEventBody({
  start,
  end,
  summary,
  email,
  location,
  requestId,
  name,
}: AppointmentProps) {
  const description = buildDescription(location)

  return {
    start: {
      dateTime: start,
    },
    end: {
      dateTime: end,
    },
    summary,
    description,
    attendees: [
      {
        email,
        displayName: name,
      },
    ],
    ...(location === `phone`
      ? { location: process.env.OWNER_PHONE_NUMBER ?? `TBD` }
      : {
          conferenceData: {
            createRequest: {
              requestId,
              conferenceSolutionKey: {
                type: `hangoutsMeet`,
              },
            },
          },
        }),
  }
}

export default async function createCalendarAppointment(
  props: AppointmentProps
) {
  const body = buildEventBody(props)

  const apiUrl = new URL(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  )

  apiUrl.searchParams.set("sendNotifications", "true")
  apiUrl.searchParams.set("conferenceDataVersion", "1")

  return fetch(apiUrl, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    body: JSON.stringify(body),
  })
}
