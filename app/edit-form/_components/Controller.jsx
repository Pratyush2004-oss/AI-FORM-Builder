import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'
import Themes from '../../_Data/Themes'
import Gradient from '../../_Data/Gradient'

const Controller = ({ selectedTheme,selectedBackground }) => {
    const [showMore, setShowMore] = useState(6);

    return (
        <div>

            {/* Theme controller Section */}
            <h2 className='text-xl font-bold font-serif'>Selected Theme</h2>
            <div className="my-4 dropdown w-full">
                <div tabIndex={0} role="button" className="btn font-bold w-full m-1">
                    Select Theme
                    <ChevronDown />
                </div>
                <ul tabIndex={0} className={`dropdown-content w-full bg-base-300 max-h-96 overflow-y-auto rounded-box z-[1] p-4 shadow-2xl`}>
                    {Themes.map((theme, idx) => (
                        <li key={idx}
                            className='p-1'
                            value={theme}
                            onClick={(e) => selectedTheme(e.target.value)}>
                            <input
                                data-theme={theme}
                                type="radio"
                                name="dropdown"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                                value={theme}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            {/* Background controller Section */}
            <h2 className='mt-8 my-1'> Background </h2>
            <div className='grid grid-cols-3 gap-5'>
                {Gradient.map((bg, idx) => (idx < showMore) && (
                    <div 
                    key={idx}
                    onClick={()=>selectedBackground(bg.gradient)}
                    className='w-full h-[70px] rounded-md hover:scale-110 hover:border-black hover:border-2 flex items-center justify-center cursor-pointer'
                        style={{ background: bg.gradient }}
                    >
                        {idx == 0 && "None"}
                    </div>
                ))}
            </div>
            <button className='btn my-4 btn-sm w-full btn-ghost' onClick={() => setShowMore(showMore > 6 ? 6 : 100)}>
                {showMore > 6 ? "Show Less ..." : "Show More ..."}
            </button>

        </div>
    )
}

export default Controller