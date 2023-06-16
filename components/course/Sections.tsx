import Link from 'next/link'
import React from 'react'
const items = [
    {
        name: "sectionOne",
        disabled: false,
        active
    }
]
const Sections = (props) => {
let { href, children, active, ...rest } = props
return (

    {items.map(item=>(
        <Menu.Item disabled={item.disabled} key={item.name}>
        {({ active }) => (
        <MyLink href={`${item.name}`} active={active}
        >
        {item.name}
        </MyLink>
        )}
        </Menu.Item>
        ))}
)
}
export default CourseSection