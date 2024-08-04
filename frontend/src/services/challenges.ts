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
 import { IChallenge, IQuestion } from '@/src/interfaces/challenges'

 export const getChallenges = async() => {
    const snapshot = await getDocs(collection(db, "challenge"));
    const challenges = snapshot?.docs?.map((item) => ({id: item.id, ...item.data()}))
    return challenges
 }

 export const getChallengesByWallet = async(creator: string) => {
   const q = query(collection(db, "challenge"), where("creator", "==", creator));
   const snapshot = await getDocs(q);
   const challenges = snapshot?.docs?.map((item) => ({id: item.id, ...item.data()}))
   return challenges
}


 export const getQuestionsChallenges = async (challengeId: string) => {
    const q = query(collection(db, "questions"), where("challengeId", "==", challengeId));
    const snapshot = await getDocs(q);
    const questions = snapshot?.docs?.map((item) => ({id: item.id, ...item.data()}))
    return questions  
 }

 export const setChallenge = async (challenge:IChallenge, questions: IQuestion[] ) => {
    const docRef = await addDoc(collection(db, "challenge"), {
        challengeType: challenge.challengeType,
        description: challenge.description,
        endTime: challenge.endTime,
        startTime: challenge.startTime,
        title: challenge.title,
        creator: challenge.creator
      });
      
    const batch = writeBatch(db);
    questions.forEach(question => {
        const ref = doc(collection(db, "questions"));
        batch.set(ref, {
            challengeId: docRef.id,
            content: question.content,
            options: question.options

        });
    })
    await batch.commit();
    return docRef.id
 }