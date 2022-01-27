import React, { useState, useEffect, useRef } from 'react'
import { submitComment } from "../../services"

const CommentForm = ({slug}) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();

    useEffect(() => {
       nameEl.current.value = window.localStorage.getItem("name")
       emailEl.current.value = window.localStorage.getItem("email")
    }, [])

    const handleSubmission = () => {
        setError(false);

        const { value: comment } = commentEl.current;
        const { value: name } = nameEl.current;
        const { value: email } = emailEl.current;
        const { value: storeData } = storeDataEl.current;

        if( !comment || !name || !email ) {
            setError(true)
            return;
        }

        const commentObj = { name, comment, email, slug };

        if(storeData) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        } else {
            window.localStorage.removeItem('name', name)
            window.localStorage.removeItem('email', email)
        }

        submitComment(commentObj).then(res => {
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4"> 
               Leave A Reply
            </h3>
            <div className="grid grid-cols-1 mb-4 gap-4">
                <textarea 
                    ref={commentEl} 
                    className="p-4 border-gray-400 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comments..."
                    name="comment"
                 />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 mb-4 gap-4">
                <input 
                    ref={nameEl} 
                    className="py-2 px-4 border-gray-400 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name..."
                    name="name" 
                    />
                <input 
                    ref={emailEl} 
                    className="py-2 px-4 border-gray-400 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Email..."
                    name="email" 
                    />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input 
                    ref={storeDataEl} type="checkbox" id='storeData' name="storeData" value="true"
                    />
                    <label className="ml-1 text-gray-400 cursor-pointer text-xs" htmlFor="storeData"> save my name and email for next time i comment </label>
                </div>
            </div>
            { error && <p className="text-xs text-red-500 mt-4 ml-4"> All Fields Are Required </p> }
            <div className="mt-8 ml-4">
                <button type="button" className=" block lg:inline-block bg-pink-600 transition duration-500 ease hover:bg-opacity-75 text-white py-2 px-4 rounded-full" onClick={handleSubmission} > Post Comment 
                </button>
                { showSuccessMessage && <span className="mt-3 text-green-500 text-xs font-semibold"> Comment Submitted For Review </span> }
            </div>
        </div>
    )
}

export default CommentForm
