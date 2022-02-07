import React, { useState } from 'react';
import { uploadFile, deleteFile } from './db'

function Upload() {
  const [file, setFile] = useState('')
  const [now, setNow] = useState(Date.now())
  
  const onFileChange = (event) => {
    setFile(event.target.files[0])
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log(now)
      await setNow(Date.now())
      console.log(now)
      await uploadFile(file, now)
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <form onSubmit={onSubmit}>
      <input 
        type='file'
        name='image'
        onChange={onFileChange}
      />
      <button type='submit'>제출</button>
    </form>
  </>
  );
}

export default Upload;