import React from 'react'
import Select from 'react-select'

import { CgCloseO } from 'react-icons/cg'

import { useState, useContext, useRef } from "react"
import { GlobalStates } from '../../App'
import async_http_request from './AsyncRequest'

const CountryPanel = ({ set_country_required }) => {
    const { SelectStyles, set_user_data } = useContext(GlobalStates)
    const [selected_country, set_selected_country] = useState()
    const [result_msg, set_result_msg] = useState()
    const [loading, set_loading] = useState()
    const country_select = useRef(null)

    const countries = [
        { value: "ad", label: "Andorra" },
        { value: "ae", label: "United Arab Emirates" },
        { value: "af", label: "Afghanistan" },
        { value: "ag", label: "Antigua and Barbuda" },
        { value: "ai", label: "Anguilla" },
        { value: "al", label: "Albania" },
        { value: "am", label: "Armenia" },
        { value: "ao", label: "Angola" },
        { value: "aq", label: "Antarctica" },
        { value: "ar", label: "Argentina" },
        { value: "as", label: "American Samoa" },
        { value: "at", label: "Austria" },
        { value: "au", label: "Australia" },
        { value: "aw", label: "Aruba" },
        { value: "ax", label: "Åland Islands" },
        { value: "az", label: "Azerbaijan" },
        { value: "ba", label: "Bosnia and Herzegovina" },
        { value: "bb", label: "Barbados" },
        { value: "bd", label: "Bangladesh" },
        { value: "be", label: "Belgium" },
        { value: "bf", label: "Burkina Faso" },
        { value: "bg", label: "Bulgaria" },
        { value: "bh", label: "Bahrain" },
        { value: "bi", label: "Burundi" },
        { value: "bj", label: "Benin" },
        { value: "bl", label: "Saint Barthélemy" },
        { value: "bm", label: "Bermuda" },
        { value: "bn", label: "Brunei" },
        { value: "bo", label: "Bolivia" },
        { value: "bq", label: "Caribbean Netherlands" },
        { value: "br", label: "Brazil" },
        { value: "bs", label: "Bahamas" },
        { value: "bt", label: "Bhutan" },
        { value: "bv", label: "Bouvet Island" },
        { value: "bw", label: "Botswana" },
        { value: "by", label: "Belarus" },
        { value: "bz", label: "Belize" },
        { value: "ca", label: "Canada" },
        { value: "cc", label: "Cocos (Keeling) Islands" },
        { value: "cd", label: "DR Congo" },
        { value: "cf", label: "Central African Republic" },
        { value: "cg", label: "Republic of the Congo" },
        { value: "ch", label: "Switzerland" },
        { value: "ci", label: "Côte d'Ivoire (Ivory Coast)" },
        { value: "ck", label: "Cook Islands" },
        { value: "cl", label: "Chile" },
        { value: "cm", label: "Cameroon" },
        { value: "cn", label: "China" },
        { value: "co", label: "Colombia" },
        { value: "cr", label: "Costa Rica" },
        { value: "cu", label: "Cuba" },
        { value: "cv", label: "Cape Verde" },
        { value: "cw", label: "Curaçao" },
        { value: "cx", label: "Christmas Island" },
        { value: "cy", label: "Cyprus" },
        { value: "cz", label: "Czechia" },
        { value: "de", label: "Germany" },
        { value: "dj", label: "Djibouti" },
        { value: "dk", label: "Denmark" },
        { value: "dm", label: "Dominica" },
        { value: "do", label: "Dominican Republic" },
        { value: "dz", label: "Algeria" },
        { value: "ec", label: "Ecuador" },
        { value: "ee", label: "Estonia" },
        { value: "eg", label: "Egypt" },
        { value: "eh", label: "Western Sahara" },
        { value: "er", label: "Eritrea" },
        { value: "es", label: "Spain" },
        { value: "et", label: "Ethiopia" },
        { value: "eu", label: "European Union" },
        { value: "fi", label: "Finland" },
        { value: "fj", label: "Fiji" },
        { value: "fk", label: "Falkland Islands" },
        { value: "fm", label: "Micronesia" },
        { value: "fo", label: "Faroe Islands" },
        { value: "fr", label: "France" },
        { value: "ga", label: "Gabon" },
        { value: "gb", label: "United Kingdom" },
        { value: "gb-eng", label: "England" },
        { value: "gb-nir", label: "Northern Ireland" },
        { value: "gb-sct", label: "Scotland" },
        { value: "gb-wls", label: "Wales" },
        { value: "gd", label: "Grenada" },
        { value: "ge", label: "Georgia" },
        { value: "gf", label: "French Guiana" },
        { value: "gg", label: "Guernsey" },
        { value: "gh", label: "Ghana" },
        { value: "gi", label: "Gibraltar" },
        { value: "gl", label: "Greenland" },
        { value: "gm", label: "Gambia" },
        { value: "gn", label: "Guinea" },
        { value: "gp", label: "Guadeloupe" },
        { value: "gq", label: "Equatorial Guinea" },
        { value: "gr", label: "Greece" },
        { value: "gs", label: "South Georgia" },
        { value: "gt", label: "Guatemala" },
        { value: "gu", label: "Guam" },
        { value: "gw", label: "Guinea-Bissau" },
        { value: "gy", label: "Guyana" },
        { value: "hk", label: "Hong Kong" },
        { value: "hm", label: "Heard Island and McDonald Islands" },
        { value: "hn", label: "Honduras" },
        { value: "hr", label: "Croatia" },
        { value: "ht", label: "Haiti" },
        { value: "hu", label: "Hungary" },
        { value: "id", label: "Indonesia" },
        { value: "ie", label: "Ireland" },
        { value: "il", label: "Israel" },
        { value: "im", label: "Isle of Man" },
        { value: "in", label: "India" },
        { value: "io", label: "British Indian Ocean Territory" },
        { value: "iq", label: "Iraq" },
        { value: "ir", label: "Iran" },
        { value: "is", label: "Iceland" },
        { value: "it", label: "Italy" },
        { value: "je", label: "Jersey" },
        { value: "jm", label: "Jamaica" },
        { value: "jo", label: "Jordan" },
        { value: "jp", label: "Japan" },
        { value: "ke", label: "Kenya" },
        { value: "kg", label: "Kyrgyzstan" },
        { value: "kh", label: "Cambodia" },
        { value: "ki", label: "Kiribati" },
        { value: "km", label: "Comoros" },
        { value: "kn", label: "Saint Kitts and Nevis" },
        { value: "kp", label: "North Korea" },
        { value: "kr", label: "South Korea" },
        { value: "kw", label: "Kuwait" },
        { value: "ky", label: "Cayman Islands" },
        { value: "kz", label: "Kazakhstan" },
        { value: "la", label: "Laos" },
        { value: "lb", label: "Lebanon" },
        { value: "lc", label: "Saint Lucia" },
        { value: "li", label: "Liechtenstein" },
        { value: "lk", label: "Sri Lanka" },
        { value: "lr", label: "Liberia" },
        { value: "ls", label: "Lesotho" },
        { value: "lt", label: "Lithuania" },
        { value: "lu", label: "Luxembourg" },
        { value: "lv", label: "Latvia" },
        { value: "ly", label: "Libya" },
        { value: "ma", label: "Morocco" },
        { value: "mc", label: "Monaco" },
        { value: "md", label: "Moldova" },
        { value: "me", label: "Montenegro" },
        { value: "mf", label: "Saint Martin" },
        { value: "mg", label: "Madagascar" },
        { value: "mh", label: "Marshall Islands" },
        { value: "mk", label: "North Macedonia" },
        { value: "ml", label: "Mali" },
        { value: "mm", label: "Myanmar" },
        { value: "mn", label: "Mongolia" },
        { value: "mo", label: "Macau" },
        { value: "mp", label: "Northern Mariana Islands" },
        { value: "mq", label: "Martinique" },
        { value: "mr", label: "Mauritania" },
        { value: "ms", label: "Montserrat" },
        { value: "mt", label: "Malta" },
        { value: "mu", label: "Mauritius" },
        { value: "mv", label: "Maldives" },
        { value: "mw", label: "Malawi" },
        { value: "mx", label: "Mexico" },
        { value: "my", label: "Malaysia" },
        { value: "mz", label: "Mozambique" },
        { value: "na", label: "Namibia" },
        { value: "nc", label: "New Caledonia" },
        { value: "ne", label: "Niger" },
        { value: "nf", label: "Norfolk Island" },
        { value: "ng", label: "Nigeria" },
        { value: "ni", label: "Nicaragua" },
        { value: "nl", label: "Netherlands" },
        { value: "no", label: "Norway" },
        { value: "np", label: "Nepal" },
        { value: "nr", label: "Nauru" },
        { value: "nu", label: "Niue" },
        { value: "nz", label: "New Zealand" },
        { value: "om", label: "Oman" },
        { value: "pa", label: "Panama" },
        { value: "pe", label: "Peru" },
        { value: "pf", label: "French Polynesia" },
        { value: "pg", label: "Papua New Guinea" },
        { value: "ph", label: "Philippines" },
        { value: "pk", label: "Pakistan" },
        { value: "pl", label: "Poland" },
        { value: "pm", label: "Saint Pierre and Miquelon" },
        { value: "pn", label: "Pitcairn Islands" },
        { value: "pr", label: "Puerto Rico" },
        { value: "ps", label: "Palestine" },
        { value: "pt", label: "Portugal" },
        { value: "pw", label: "Palau" },
        { value: "py", label: "Paraguay" },
        { value: "qa", label: "Qatar" },
        { value: "re", label: "Réunion" },
        { value: "ro", label: "Romania" },
        { value: "rs", label: "Serbia" },
        { value: "ru", label: "Russia" },
        { value: "rw", label: "Rwanda" },
        { value: "sa", label: "Saudi Arabia" },
        { value: "sb", label: "Solomon Islands" },
        { value: "sc", label: "Seychelles" },
        { value: "sd", label: "Sudan" },
        { value: "se", label: "Sweden" },
        { value: "sg", label: "Singapore" },
        { value: "sh", label: "Saint Helena, Ascension and Tristan da Cunha" },
        { value: "si", label: "Slovenia" },
        { value: "sj", label: "Svalbard and Jan Mayen" },
        { value: "sk", label: "Slovakia" },
        { value: "sl", label: "Sierra Leone" },
        { value: "sm", label: "San Marino" },
        { value: "sn", label: "Senegal" },
        { value: "so", label: "Somalia" },
        { value: "sr", label: "Suriname" },
        { value: "ss", label: "South Sudan" },
        { value: "st", label: "São Tomé and Príncipe" },
        { value: "sv", label: "El Salvador" },
        { value: "sx", label: "Sint Maarten" },
        { value: "sy", label: "Syria" },
        { value: "sz", label: "Eswatini (Swaziland)" },
        { value: "tc", label: "Turks and Caicos Islands" },
        { value: "td", label: "Chad" },
        { value: "tf", label: "French Southern and Antarctic Lands" },
        { value: "tg", label: "Togo" },
        { value: "th", label: "Thailand" },
        { value: "tj", label: "Tajikistan" },
        { value: "tk", label: "Tokelau" },
        { value: "tl", label: "Timor-Leste" },
        { value: "tm", label: "Turkmenistan" },
        { value: "tn", label: "Tunisia" },
        { value: "to", label: "Tonga" },
        { value: "tr", label: "Turkey" },
        { value: "tt", label: "Trinidad and Tobago" },
        { value: "tv", label: "Tuvalu" },
        { value: "tw", label: "Taiwan" },
        { value: "tz", label: "Tanzania" },
        { value: "ua", label: "Ukraine" },
        { value: "ug", label: "Uganda" },
        { value: "um", label: "United States Minor Outlying Islands" },
        { value: "un", label: "United Nations" },
        { value: "us", label: "United States" },
        { value: "uy", label: "Uruguay" },
        { value: "uz", label: "Uzbekistan" },
        { value: "va", label: "Vatican City (Holy See)" },
        { value: "vc", label: "Saint Vincent and the Grenadines" },
        { value: "ve", label: "Venezuela" },
        { value: "vg", label: "British Virgin Islands" },
        { value: "vi", label: "United States Virgin Islands" },
        { value: "vn", label: "Vietnam" },
        { value: "vu", label: "Vanuatu" },
        { value: "wf", label: "Wallis and Futuna" },
        { value: "ws", label: "Samoa" },
        { value: "xk", label: "Kosovo" },
        { value: "ye", label: "Yemen" },
        { value: "yt", label: "Mayotte" },
        { value: "za", label: "South Africa" },
        { value: "zm", label: "Zambia" },
        { value: "zw", label: "Zimbabwe" }
    ]

    const on_country_selection = (selected) => {
        set_selected_country(selected)
    }

    const handle_form_submission = (e) => {

        e.preventDefault()

        async function submit_selected_country() {

            set_loading(true)

            const saving_country_response = await async_http_request({
                path: "post_country",
                method: "POST",
                data: { "country": selected_country.value }
            })

            set_loading(false)

            if (saving_country_response === null) {
                set_result_msg("error saving country, please try again")
                return
            }

            // after country gets saved successfully, we close current panel and set the user country with the value selected 
            set_user_data(prev => ({
                ...prev,
                country: selected_country.value
            }))

            set_country_required(false)
            set_result_msg("country saved")
        }

        if (!selected_country) {
            country_select.current.focus()
            return
        }

        submit_selected_country()
    }

    return (

        <div className="country_selection_panel">

            <CgCloseO className="icon close_icon" onClick={() => set_country_required(false)} />

            <h1>Welcome to Real Otakus !</h1>

            <form onSubmit={handle_form_submission}>
                <Select
                    styles={SelectStyles}
                    className="react_select"
                    placeholder="choose your country"
                    isClearable={false}
                    isLoading={!countries}
                    options={countries}
                    onChange={on_country_selection}
                    value={selected_country}
                    ref={country_select}

                />

                <div className="lower_div">
                    {!loading ?
                        <button type="submit" className="submit_btn"> submit</button>
                        :
                        <div className="info_message">
                            loading
                        </div>
                    }
                </div>

                <div className="info_message">
                    {result_msg}
                </div>

            </form>

        </div>
    )
}

export default CountryPanel