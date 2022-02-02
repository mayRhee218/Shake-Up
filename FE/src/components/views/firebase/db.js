import { storage } from './firebase'
import { ref, uploadBytesResumable, getDownloadURL,
  deleteObject } from "firebase/storage";

// Create 업로드
export async function uploadFile(file, fileName) {
  const imagesRef = ref(storage, 'images/'+fileName);
  const uploadTask = uploadBytesResumable(imagesRef, file);

  uploadTask.on('state_changed',
  null,
  (error) => {
    // Handle unsuccessful uploads
    console.error('실패사유는', error);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      });
    }
  );
}

// Read 읽어오기
export async function getFile(pk) {
  const dataRef = ref(storage, 'videos/'+pk)
  getDownloadURL(dataRef).then(res => {
    console.log(res)
  })
}

// Delete 삭제
export async function deleteFile(pk) {
  const deleteRef = ref(storage, 'videos/'+ pk)

  deleteObject(deleteRef).then(() => {
    console.log(pk, '삭제완료')
  }).catch((err) => {
    console.log(err)
  })
}