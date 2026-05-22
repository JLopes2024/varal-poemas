import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import PoemaCard from "./PoemaCard";

export default function Varal() {
  const [poemas, setPoemas] = useState([]);

  useEffect(() => {
    async function buscar() {
      const snapshot = await getDocs(collection(db, "posts"));

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPoemas(lista);
    }

    buscar();
    const i = setInterval(buscar, 10000);
    return () => clearInterval(i);
  }, []);


  return (
  <div className="varal">
    {poemas.map((poema) => (
      <PoemaCard key={poema.id} poema={poema} />
    ))}
  </div>
);
 
}