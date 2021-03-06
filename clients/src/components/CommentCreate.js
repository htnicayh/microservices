/** @format */

import axios from 'axios'
import { useRef, useState } from 'react'

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('')
    const inputRef = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        await axios.post(
            `http://micro-service.dev.vn/posts/${postId}/comments`,
            {
                content
            }
        )

        setContent('')
        inputRef.current.focus()
    }

    return (
        <div>
            <form
                onSubmit={(event) => {
                    handleSubmit(event)
                }}
            >
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        style={{ marginBottom: '1rem' }}
                        ref={inputRef}
                        value={content}
                        onChange={(event) => {
                            setContent(event.target.value)
                        }}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default CommentCreate
