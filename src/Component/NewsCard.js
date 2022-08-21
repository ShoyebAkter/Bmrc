import React, { useEffect, useState } from 'react'
import './NewsCard.css'
function NewsCard() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/news`)
            .then(res => res.json())
            .then(data => {
                setNews(data)
            })
    }, [])
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/news/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // if (data.deletedCount) {
                //     toast.success(`Order: ${name} is deleted.`)
                //     setDeletingOrder(null);
                //     refetch();
                // }
            })
    }

    console.log(news)
    return (
        <div class="cards-list">
            {
                news.map((singleNews, index) => {
                    return (
                        <div key={index} class="card 1">
                            <div class="card_image"> <img src={singleNews.img} alt="" /> </div>
                            <div class="card_title title-black">
                                <p>{singleNews.news}</p>
                            </div>
                            <button onClick={()=>handleDelete(singleNews._id)} class="btn btn-sm">Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NewsCard