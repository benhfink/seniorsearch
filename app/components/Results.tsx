'use client'
import { useState } from "react";

export default function Results({searchedQuery, results, onSearch}: {searchedQuery: string, results: any[], onSearch: (query: string) => void}) {
    const [query, setQuery] = useState(searchedQuery)
    return(
        <>
            {results.some((service) => service.emergency === true) &&
                <div className="emergency-banner">
                    <h2>This sounds like an emergency.</h2>
                    <p>If you or someone else is in danger, call 911 right now.</p>
                </div>}
            <div className="logo-page">
                <img src="/icons/logo.png" alt="logo" width={100} height={100} />
            </div>
            <div className="input">
                <input className="query" type="text" placeholder="Type your question here..." onChange={(e) => {setQuery(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter" && query.trim()) onSearch(query)}} />
                <img src="/icons/search.svg" alt="search"  />
            </div>
            {query &&
                <p className="small-p">Press the RETURN key to search.</p>}
            <div className="results-container">
                <h2 className="results-header">
                    Results
                </h2>
                <div className="results-card">
                {Object.keys(results).length !== 0 && results.slice(0, 6).map((service, index) => (
                    <div className="result-card" key={service.id}>
                        <h3>{index + 1}. {service.name}</h3>
                        <p className="result-subtitle">{service.how_to_use}</p>
                        <div className="result-info">
                            {[
                                ["Organization", service.organization],
                                ["Category", service.category],
                                ["About", service.description],
                                ["Who can use it", service.eligibility],
                                ["Cost", service.cost],
                                ["Hours", service.hours],
                                ["Address", service.address],
                                ["Phone", service.phone],
                            ].map(([label, value]) => value && (
                                <p key={label}><span>{label}:</span> {value}</p>
                            ))}
                            {service.website && <p><span>Website:</span> <a href={service.website} target="_blank">{service.website}</a></p>}
                        </div>
                    </div>
                ))}
                    {Object.keys(results).length === 0 && <><img src="/icons/no-results.png" alt="no-results" className="no-results-image" width={250} height={250} /><p className="no-results">Sorry, we didn't find anything for that question. Please try rephrasing your question or asking something else.</p></>}
                </div>
            </div>

        </>
    )
}