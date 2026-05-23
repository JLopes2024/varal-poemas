import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./firebase";

const poemasRef = collection(db, "poemas");

export const adicionarPoema = async (poema) => {
  await addDoc(poemasRef, {
    ...poema,
    createdAt: serverTimestamp()
  });
};

export const ouvirPoemas = (callback) => {
  const q = query(
    poemasRef,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const poemas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    callback(poemas);
  });
};