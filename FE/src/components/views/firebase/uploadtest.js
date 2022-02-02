import React, { useState } from 'react';
import { uploadFile, deleteFile } from './db'

function Upload() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')

  const onFileChange = (event) => {
    setFile(event.target.files[0])
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    console.log('file', file)
    try {
      const id = await add(title, content)
      console.log(id)
      await uploadFile(file, id)
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <form onSubmit={onSubmit}>
      <input
        type='text'
        name='title'
        placeholder='title'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        />
      <textarea 
        type='text'
        name='content'
        placeholder='content'
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <input 
        type='file'
        name='image'
        onChange={onFileChange}
      />
      <button type='submit'>제출</button>
    </form>
    <button onClick={deleteFile}>delete</button>
  </>
  );
}

export default Upload;