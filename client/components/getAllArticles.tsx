'use client'
import { useEffect, useState } from "react";

const GetAllArticles = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/articles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setArticles(data)
                return articles;
            } catch (error) {
                console.log(error);
            }
        })()
    }, [articles])

    console.log('EBANNIE articles', articles)

    return (<>
    </>);
}

export default GetAllArticles;