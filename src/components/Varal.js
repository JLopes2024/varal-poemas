import { useEffect, useState } from "react";
import { db } from "../services/firebase";

import {
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import PoemaCard from "./PoemaCard";

export default function Varal() {
  const [poemas, setPoemas] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setPoemas(lista);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="varal">
      {poemas.map((poema) => (
        <PoemaCard
          key={poema.id}
          poema={poema}
        />
      ))}
    </div>
  );
}