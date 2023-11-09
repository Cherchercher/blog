const LINE_PREFIX = `<div class="gmail_default" style="font-family:arial,sans-serif">`
const LINE_SUFFIX = `</div>`

const SUBJECT = `Your meeting request`

export default function ConfirmationEmail({
  dateSummary,
  comments,
  programName,
}: {
  dateSummary: string
  comments: string
  programName: string
}) {
  let body = `<div dir="ltr">`
  body += [
    `Hi there`,
    `<br>`,
    `Just confirming that your request on <b>${programName}</b> for <b>${dateSummary}</b> has been received. 
I'll review it as soon as I can and get back to you with a confirmation.`,
    `<br>`,
    'message: ',
    `<br>${comments}<br>`,
    `Thanks!`,
  ]
    .map((line) => `${LINE_PREFIX}${line}${LINE_SUFFIX}`)
    .join("")

  body += `</div>`

  return { subject: SUBJECT, body }
}
