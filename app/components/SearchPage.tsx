'use client'
import {useState} from "react";
import Link from "next/link";

export default function SearchPage({onSearch}: {onSearch: (query: string) => void}) {
    const [query, setQuery] = useState("")

    return(
        <>
            <div className="logo-page">
                <img src="/icons/logo.png" alt="logo" width={250} height={250} />
            </div>
            <div className="page-header">
                <h1 className="pg-title">SeniorSearch</h1>
                <p className="pg-subtitle">Describe what you need.</p>
            </div>
            <div className="input">
                <input className="query" type="text" placeholder="Type your question here..." onChange={(e) => {setQuery(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter" && query.trim()) onSearch(query)}} />
                <img src="/icons/search.svg" alt="search"  />
            </div>
            {query &&
                <p className="small-p">Press the RETURN key to search.</p>}
            <Link href="/categories" className="browse-button">Browse by category</Link>
            <div className="results-container">
                <h2 className="results-header">
                    Most Popular Services
                </h2>
                <div className="results-card">
                    {[
                        ["Health Care", "Doctors, clinics, and hospitals near you."],
                        ["Older Adult Centers & Social Activities", "Meals, classes, and activities with other older adults."],
                        ["Food & Nutrition", "Home-delivered meals, food pantries, and food benefits."],
                        ["Caregiving, Home Care & Adult Day", "Help at home and support for caregivers."],
                        ["Libraries, Learning & Technology", "Free classes and help with phones and computers."],
                        ["Legal Help & Elder Abuse", "Free legal advice and protection from abuse or scams."],
                    ].map(([category, subtitle]) => (
                        <div className="result-card" key={category} onClick={() => onSearch(`I need help with ${category}`)}>
                            <h3>{category}</h3>
                            <p className="result-subtitle">{subtitle}</p>
                            <p><i>Click here to search this category...</i></p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}