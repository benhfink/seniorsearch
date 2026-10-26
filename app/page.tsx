'use client'
import {useState} from "react";
import SearchPage from "@/app/components/SearchPage";
import Loading from "@/app/components/Loading";
import Results from "@/app/components/Results";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[] | null>(null)

  async function search(newQuery: string) {
    setQuery(newQuery)
    setIsLoading(true)
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: newQuery}),
      })
      const data = await response.json()
      setResults(data.results ?? [])
    } catch {
      setResults([])
    }
    setIsLoading(false)
  }

  return(
      <>
        {!isLoading && !results && <SearchPage onSearch={search} />}
        <Loading isLoading={isLoading}/>
        {!isLoading && results && <Results key={query} searchedQuery={query} results={results} onSearch={search} />}
      </>
  )
}
