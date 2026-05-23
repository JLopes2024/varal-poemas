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

    const unsub = onSnapshot(q, (snap) => {
      setPoemas(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data()
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="varal">
      {poemas.map((p) => (
        <PoemaCard key={p.id} poema={p} />
      ))}
    </div>
  );
}