import { app } from './config'
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, getBlob } from "firebase/storage";
import { writeUserData } from './database'

import imageCompression from 'browser-image-compression';

const storage = getStorage(app)

//--------------------------- Firebase Storage ---------------------------
// FUNCION PARA ESCRIBIR Y CAPTURAR URL DE FIREBASE

async function uploadStorage(ruteDB, file, db, callback, name) {

    const imagesRef = ref(storage, `${ruteDB}${name ? name : ''}`);

    const options = {
        maxWidthOrHeight: 500,
        maxSizeMB: 0.07,
        alwaysKeepResolution: true,
        useWebWorker: true,
        maxIteration: 300,
        fileType: 'image/webp'
    }

    const compressedFile = file.type != 'image/gif' ? await imageCompression(file, options) : file
    uploadBytes(imagesRef, compressedFile).then(async (snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath))
            .then((url) => {
                let obj = {
                    [name ? name : 'url']: url
                }
                return writeUserData(ruteDB, { ...db, ...obj, }, null, callback)
            })
            .catch((error) => {
            });
    });
}





// FUNCION PARA DESCARGAR DE FIREBASE

function downloadFile(path) {
console.log('getIMG')

    getDownloadURL(ref(storage, path))
    .then((url) => {
      // `url` is the download URL for 'images/stars.jpg'
  
      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
        console.log(blob)
      };
      xhr.open('GET', url);
      xhr.send();
  
    })
    .catch((error) => {
      // Handle any errors
    });




    // getBlob(ref(storage, path))
    //     .then((blob) => {
    //        return console.log(blob)
    //     })
    //     .catch((err) => {
    //        return console.log(err)
    //     })
}




export { uploadStorage, downloadFile }