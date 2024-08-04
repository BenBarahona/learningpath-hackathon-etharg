import {
    db,
    collection,
    getDocs,
    setDoc,
    addDoc,
    doc,
    query,
    where,
    writeBatch
 } from '@/src/firebase'
 import { IPrize } from '@/src/interfaces/challenges'

export const setPrize = async(prize: IPrize) => {
    const docRef = await addDoc(collection(db, "prizes"), { ...prize });
    return docRef.id
}