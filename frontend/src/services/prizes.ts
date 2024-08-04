import {
    db,
    collection,
    getDocs,
    setDoc,
    addDoc,
    doc,
    query,
    where,
    writeBatch,
    updateDoc
 } from '@/src/firebase'
 import { IPrize } from '@/src/interfaces/challenges'

export const setPrize = async(prize: IPrize) => {
    const docRef = await addDoc(collection(db, "prizes"), { ...prize });
    return docRef.id
}

export const getPrizes = async(creator: string) => {
   const q = query(collection(db, "prizes"), where("creator", "==", creator));
   const snapshot = await getDocs(q);
   const prizes = snapshot?.docs?.map((item) => ({id: item.id, ...item.data()}))
   return prizes
}

export const updatePrize = async(creator: string, contract_address: string) => {
   const q = query(collection(db, "prizes"), where("creator", "==", creator));
   const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const prizeId = snapshot.docs[0].id;
    await updateDoc(doc(db, "prizes", prizeId), { contract_address });
  }
}