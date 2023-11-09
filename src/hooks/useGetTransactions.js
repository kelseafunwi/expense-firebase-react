import { useEffect, useState } from "react"
import { useGetUserInfo } from "./useGetUserInfo";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useGetTransactions  = () => {

    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions"); 
    const { userId } = useGetUserInfo();
    const [transactionTotals, setTransactionTotals ] = useState({
        balance: 0.0,
        totalIncome: 0.0,
        totalExpenses: 0.0
    })

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransaction = query(
                transactionCollectionRef,
                where('userId', "==", userId),
                orderBy('createdAt'));
            // 'snapshot refers to whatever data we will get back from the snapshot
                unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
                    let docs = [];
                    let totalExpenses = 0;
                    let totalIncome = 0;
                    let balance = 0;

                    snapshot.forEach((doc) => {
                        // return the data of each individual document
                        // snapshot provides us with a lot of data, so our aim is to filter which
                        // of the elements we are going to be needing for each data.
                        // A function called 'data' is used to receive the data from firebase
                        const data = doc.data();
                        const id = doc.id;
                        docs.push({...data, id});

                        if (data.transactionType === "expense") {
                            totalExpenses += Number(data.transactionAmount);
                        } else {
                            totalIncome += Number(data.transactionAmount);
                        }
                        balance = totalIncome - totalExpenses;
                    })  
                    // after the transactions is done, docs will now contain of all of the data existent
                    // in the database.
                    setTransactions(docs);
                    setTransactionTotals({balance, totalExpenses, totalIncome})
                }
            );

            return () => unsubscribe();
        } catch(error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        // we cannot directly have an async function inside of the use effect.
        getTransactions();
    }, []);
    
    return { transactions, transactionTotals}
}