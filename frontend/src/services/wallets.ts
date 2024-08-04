import {
    db,
    collection,
    getDocs,
    setDoc,
    doc,
    query,
    where
 } from '@/src/firebase'

 export const searchWallet = async(wallet: string) => {
    const q = query(collection(db, "wallets"), where("wallet", "==", wallet));
    const snapshot = await getDocs(q);

    return snapshot?.docs?.[0]?.data()?.wallet;
 }

 export const setWallet = async(wallet: string) => {
   const ref = doc(collection(db, "wallets"));
   await setDoc(ref, { wallet });
 }

 export const processWallet = async(wallet: string) => {
   const exist = await searchWallet(wallet);
   if (!exist) {
      await setWallet(wallet)
   }
 }