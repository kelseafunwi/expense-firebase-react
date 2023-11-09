import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo  } from './useGetUserInfo';

export const useAddTransaction = () => {
    const { userId  } =  useGetUserInfo();
    const transactionCollectionRef = collection(db, "transactions"); 
    const addTransaction = async (
        description,
        transactionAmount,
        transactionType
    ) => {
        try {
            await addDoc(transactionCollectionRef, {
                userId,
                description,
                transactionAmount,
                transactionType,
                createdAt: serverTimestamp()
            });
            console.log('Transaction added');
        } catch (err) {
            console.log('There was an error adding transaction')
        }
    }

    return { addTransaction }
}