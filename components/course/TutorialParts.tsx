import Link from 'next/link';
import React from 'react';

const TutorialParts = (props) => {
    let { parts, active } = props;
    return (
        <div>
        {active && parts?.map((part)=>(
            <li className="m-0 p-0 block" key={part.name}>
                <Link href={`/tutorial/${part.name}`}>
                    <a
                        className={`flex bg-white p-2 hover:bg-gray-400 cursor-pointer`}
                    >
                        {part.partName} <br/>
                        {part.partType} - {part.duration}
                    </a>
                </Link>
          </li>)
          )}
          </div >
    )
}
export default TutorialParts
