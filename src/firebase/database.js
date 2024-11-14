import { app } from './config'
import { getDatabase, ref, onValue, set, child, get, remove, update, query, orderByChild, equalTo } from "firebase/database";

const db = getDatabase(app);
const dbRef = ref(getDatabase());

// -------------------------------Firebase Realtime Database------------------------------------

function getData(setUserData) {
  onValue(ref(db, '/'), (snapshot) => {
    if (snapshot.exists()) {
      setUserData(snapshot.val());
    }
  });
}

async function getSpecificData(query, setUserSpecificData, callback) {
  try {

    onValue(ref(db, query), (snapshot) => {
      if (snapshot.exists()) {
        setUserSpecificData(snapshot.val())
        callback && callback !== undefined ? callback() : ''
        return snapshot.val()
      }else{
        callback && callback !== undefined ? callback() : ''
        setUserSpecificData(null)
        return null
      }
    });

    // const snapshot = await get(child(dbRef, `${query}`))
    // console.log(query, snapshot.exists())
    // if (snapshot.exists()) {
    //   setUserSpecificData(snapshot.val())
    //   callback && callback !== undefined ? callback() : ''
    //   return snapshot.val()
    // } else {
    //   callback && callback !== undefined ? callback() : ''
    //   setUserSpecificData(null)
    //   return null
    // }
  } catch (error) {
    console.error(error);
  }
}




async function getSpecificData2(query, setUserSpecificData, callback, ) {
  try {

    onValue(ref(db, query), (snapshot) => {
      if (snapshot.exists()) {
        setUserSpecificData(snapshot.val())
        callback && callback !== undefined ? callback() : ''
        return snapshot.val()
      }else{
        callback && callback !== undefined ? callback() : ''
        setUserSpecificData(null)
        return null
      }
    });

    // const snapshot = await get(child(dbRef, `${query}`))
    // console.log(query, snapshot.exists())
    // if (snapshot.exists()) {
    //   setUserSpecificData(snapshot.val())
    //   callback && callback !== undefined ? callback() : ''
    //   return snapshot.val()
    // } else {
    //   callback && callback !== undefined ? callback() : ''
    //   setUserSpecificData(null)
    //   return null
    // }
  } catch (error) {
    console.error(error);
  }
}




// async function getSpecificData(query, setUserSpecificData, callback) {
//   try {
//     const snapshot = await get(child(dbRef, `${query}`))
//     console.log(query, snapshot.exists())
//     if (snapshot.exists()) {
//       setUserSpecificData(snapshot.val())
//       callback && callback !== undefined ? callback() : ''
//       return snapshot.val()
//     } else {
//       callback && callback !== undefined ? callback() : ''
//       setUserSpecificData(null)
//       return null
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

function getSpecificDataEq(route, children, eq, setUserData, callback) {
  get(query(ref(db, route), orderByChild(children), equalTo(eq)))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        let snap = snapshot.val()
        console.log(snap)
        setUserData(snap)
        callback && callback()
      }
    })
}


function listenToSpecificDataEq(route, children, eq, setUserData, callback) {
  // Crear una consulta para escuchar datos de la base de datos Firebase
  const dataQuery = query(
    ref(db, route),
    orderByChild(children),
    equalTo(eq)
  );

  // Configurar el listener para los cambios en los datos
  const unsubscribe = onValue(dataQuery, (snapshot) => {
    if (snapshot.exists()) {
      // Convertir el snapshot a un objeto de JavaScript
      let snap = snapshot.val();      
      // Actualizar los datos del usuario con los datos recuperados
      setUserData(snap);
      
      // Ejecutar el callback si está proporcionado
      if (callback) {
        callback();
      }
    } else {
      // Si no existen datos, puedes manejar esto si es necesario
      // console.log('No se encontraron datos');
    }
  }, (error) => {
    // Manejar errores si la escucha falla
    console.error('Error al escuchar los datos:', error);
  });

  // Devolver la función de desuscripción para que puedas dejar de escuchar cuando sea necesario
  return unsubscribe;
}

function writeUserData(rute, object, setUserSuccess, callback) {
  console.log(rute)
  // console.log(object)
  update(ref(db, rute), object)
    .then(() => {
      console.log('Success')
      setUserSuccess !== null ? setUserSuccess('save') : ''
      callback !== null ? callback(object) : ''
    })
    .catch((err) => {
      console.log('error')
      console.log(err)
    })
}

async function removeData(rute, setUserSuccess, callback) {
  await remove(ref(db, rute))
    .then(() => {
      console.log('delete')
      console.log(rute)

      setUserSuccess !== null ? setUserSuccess('save') : ''
      callback !== null ? callback() : ''
    })
    .catch(() =>
      setUserSuccess('repeat'));
}

export { getData, writeUserData, removeData, getSpecificData, getSpecificDataEq, getSpecificData2, listenToSpecificDataEq}