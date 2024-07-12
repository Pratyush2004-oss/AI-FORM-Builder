import React, { useState } from 'react'
import Themes from '../../_Data/Themes'
import Gradient from '../../_Data/Gradient'
import Style from '../../_Data/Style'

const Controller = ({ selectedTheme, selectedBackground, selectedStyle, setSigninEnable  }) => {
    const [showMore, setShowMore] = useState(6);

    return (
        <div>

            {/* Theme controller Section */}
            <h2 className='text-xl font-bold font-serif'>Selected Theme</h2>
            <div className="m-4">
                <select
                    onChange={(e) => selectedTheme(e.target.value)}
                    className="select sm:w-full">
                    <option disabled selected
                        className="btn btn-sm btn-block btn-ghost justify-start"
                    >Select Theme</option>
                    {Themes.map((theme, idx) => (
                        <option
                            key={idx}
                            value={theme}
                            data-theme={theme}
                            onSelect={(e) => selectedTheme(e.target.value)}
                            className="btn btn-sm btn-block btn-ghost justify-start"
                        >{theme.charAt(0).toUpperCase() + theme.slice(1)}</option>
                    ))}
                </select>
            </div>
            {/* Background controller Section */}
            <h2 className='mt-8 my-1 text-xl font-bold font-serif'> Background </h2>
            <div className='grid grid-cols-3 gap-5'>
                {Gradient.map((bg, idx) => (idx < showMore) && (
                    <div
                        key={idx}
                        onClick={() => selectedBackground(bg.gradient)}
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

            {/* Border style controller */}
            <h2 className='mt-8 my-1 text-xl font-bold font-serif'> Border Style </h2>
            <div className='grid grid-cols-3 gap-3'>
                {Style.map((style, idx) => (
                    <div>
                        <div
                            key={idx}
                            onClick={() => selectedStyle(style)}
                            className='rounded-md hover:scale-110 hover:border-black hover:border-2 flex items-center justify-center cursor-pointer'
                        >
                            <img src={style.img} width={600} height={80} className='rounded-lg' />
                        </div>
                        <h2 className='text-center'>{style.name}</h2>
                    </div>
                ))}
            </div>

            {/* User have to sign in to fill the form */}
            <div className='flex gap-3 my-10 items-center'>
                            <input
                            onChange={(e) => setSigninEnable(e.target.checked)}
                              name='checkbox'
                              type='checkbox'
                              value={true}
                              className="checkbox checkbox-sm" />
                            <label><h2>Enable Social Authentication before submit the form</h2></label>
                          </div>

        </div>
    )
}

export default Controller