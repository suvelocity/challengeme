import React from 'react'
import { Link } from "react-router-dom";
export default function Footer({ color = 'white' }) {

    const footerLabels = [
        {
            name: 'Contact Us',
            link: ''
        },
        {
            name: '|'
        },

        {
            name: 'FAQ',
            link: ''
        },
        {
            name: '|'
        },
        {
            name: 'Reviews',
            link: ''
        },
        {
            name: '|'
        },
        {
            name: 'Legal Stuff',
            link: ''
        },
    ]


    return (
        <section className='Landing-page-Footer' style={{ color }} >
            <div className='Landing-page-Footer-Labels' style={{ color }} >
                {footerLabels.map((label, index) => {
                    if (label.name !== '|') {
                        return <Link
                            key={label.name}
                            className='Landing-page-Footer-Single-Label'
                            style={{ color }}
                            to={`/${label.link}`}>{label.name}</Link>
                    } else {
                        return <span
                            key={index + label.name}
                            className='Landing-page-Footer-Single-Label'
                            style={{ color }}
                        >{label.name}</span>
                    }

                })}
            </div>
            <p> Copyright © 2020 suvelocity, All rights reserved. </p>
        </section>
    )
}
