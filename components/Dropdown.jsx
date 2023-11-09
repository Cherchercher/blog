import React, { useRef } from'react';
import { Menu, Transition } from '@headlessui/react';

const Dropdown = ({ name, url, subItems, useHover }) => {
    const buttonRef = useRef(null)
    const dropdownRef = useRef(null)
    const timeoutDuration = 1600
    let timeout
  
    const openMenu = () => buttonRef?.current.click()
    const closeMenu = () =>
      dropdownRef?.current?.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
          cancelable: true,
        })
      )
  
    const onMouseEnter = closed => {
      clearTimeout(timeout)
      closed && openMenu()
    }
    const onMouseLeave = open => {
      open && (timeout = setTimeout(() => closeMenu(), timeoutDuration))
    }
  
    //maybe change background on hover
    //w-full for FAQ items to Menu.Button
    //?  focus:outline-none 
    //? group
    return (
      <Menu>
        {({ open }) => (
          <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <span
              onClick={openMenu}
              onMouseEnter={() => useHover && onMouseEnter(!open)}
              onMouseLeave={() => useHover && onMouseLeave(open)}
            >
              <Menu.Button
               className={`${
                !useHover ? 'w-full' : '' } no-underline inline-flex justify-center rounded-md font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                ref={buttonRef}
                as={useHover ? 'a' : 'button'}
                href={useHover ? url : null}
              >
                <span>{name}</span>
                <svg className="w-2 h-2 ml-1 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d={
                      `M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 ` +
                      `1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z`
                    }
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </span>
  
            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                ref={dropdownRef}
                onMouseEnter={() => useHover && onMouseEnter()}
                onMouseLeave={() => useHover && onMouseLeave(open)}
                static
              >
                <div className="px-1 py-1 ">
                  {subItems.map(item => (
                    <Menu.Item key={item.key}>
                      {({ active }) => (
                        <a
                          href={item.url}
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group no-underline flex w-full items-center rounded-md px-2 py-2 text-sm`}

                        //   css={[
                        //     active ? `bg-gray-100 text-gray-900` : `text-gray-700`,
                        //     `flex justify-beeen w-full px-4 py-2 leading-5 text-left`,
                        //   ]}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    )
  }

  export default Dropdown;