import {
    db,
    collection,
    getDocs,
    setDoc,
    doc,
    query,
    where
 } from '@/src/firebase'

 export const getEvent = async(chainId: string) => {
    const q = query(collection(db, "events"), where("chain_id", "==", chainId));
    const snapshot = await getDocs(q);

    return snapshot?.docs?.[0]?.data();
 }
