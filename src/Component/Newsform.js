import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

function Newsform() {
    const [myDate,setMyDate]=useState("")
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    useEffect(()=>{
        setMyDate(dateTime);
    },[])

    // console.log(dateTime)

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imageStorageKey = '0be1a7996af760f4a03a7add137ca496';

    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const review = {
                        name: data.name,
                        news: data.news,
                        date: myDate,
                        img: img
                    }

                    fetch(`http://localhost:5000/news`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            
                        },
                        body: JSON.stringify(review)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                alert('News added successfully')
                                reset();
                            }
                            else {
                                alert('Failed to add the review');
                            }
                        })
                }
            })

    }
    return (
        <div>
            <h2 className="text-2xl">Add Your News</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mx-auto form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="mx-auto form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">News</span>
                    </label>
                    <textarea className="textarea textarea-bordered" placeholder="Description"
                        {...register("news", {
                            required: {
                                value: true,
                                message: 'News is Required'
                            }
                        })}
                    ></textarea>

                    <label className="label">
                        {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                        {errors.description?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                    </label>
                </div>

                <div className="mx-auto form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                    <input className='btn w-full max-w-xs text-white' type="submit" value="Add" />
                </div>

                
            </form>
        </div>
    )
}

export default Newsform