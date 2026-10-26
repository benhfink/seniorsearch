'use client'
import { useState } from 'react';

export default function Loading({isLoading}: {isLoading: boolean}) {
    return(
        <>
            {isLoading &&
                <>
                    <div className="logo-page">
                        <img src="/icons/searching.gif" alt="loading"/>
                    </div>
                    <div className="loading-p">
                        <p>We're organizing your results, please give us a minute...</p>
                    </div>
                </>
            }
        </>
    )
}