import { initializeApp } from 'firebase/app';



const firebaseConfig = {
  apiKey: "AIzaSyCZDfvVM9VIatRLZW_PESK2tb9ytPGyp0s",
  authDomain: "bottakv2-c30da.firebaseapp.com",    
  databaseURL: "https://bottakv2-c30da-default-rtdb.firebaseio.com",
  projectId: "bottakv2-c30da",
  storageBucket: "bottakv2-c30da.appspot.com",
  messagingSenderId: "294024541160",
  appId: "1:294024541160:web:57d7bcb4cd1a6c18c9ea5d"
};

//  const firebaseConfig = {
//   apiKey: "AIzaSyDzhyvhnnRl0FP3x9vCg66lXwYud0cDSJI",
//   authDomain: "bottak-15afa.firebaseapp.com",
//   databaseURL: "https://bottak-15afa-default-rtdb.firebaseio.com",
//   projectId: "bottak-15afa",
//   storageBucket: "bottak-15afa.appspot.com",
//   messagingSenderId: "408389195712",
//   appId: "1:408389195712:web:84a5bf3459b766bb3d9a25",
//   measurementId: "G-NJXYTNE72D"
// };


const app = initializeApp(firebaseConfig)

export { app }