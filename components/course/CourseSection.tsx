import Link from 'next/link'
import React from 'react'
const CourseSection = (props) => {
let { href, children, active, ...rest } = props
return (
<Link href={href} id={href}>
<button {...rest}
className={`${active && 'bg-blue-500'} w-full rounded-md p-2`}
href="{course}/section-n"
>
{children}
</button>
</Link>
)
}
export default CourseSection