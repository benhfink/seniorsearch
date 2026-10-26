import Link from "next/link";
import services from "@/public/data/master_senior_services.json";

export default function Categories() {
    const categories = [...new Set(services.map((service) => service.category))]

    return(
        <>
            <div className="logo-page">
                <Link href="/">
                    <img src="/icons/logo.png" alt="logo" width={100} height={100} />
                </Link>
            </div>
            <div className="results-container">
                <h2 className="results-header">
                    Browse by Category
                </h2>
                {categories.map((category) => (
                    <details key={category}>
                        <summary className="result-subtitle">{category}</summary>
                        <div className="results-card">
                            {services.filter((service) => service.category === category).map((service) => (
                                <div className="result-card" key={service.id}>
                                    <h3>{service.name}</h3>
                                    <div className="result-info">
                                        {[
                                            ["Organization", service.organization],
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
                        </div>
                    </details>
                ))}
            </div>
        </>
    )
}
