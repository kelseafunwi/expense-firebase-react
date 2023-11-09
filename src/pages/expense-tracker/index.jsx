import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransactions();
  const { transactionTotals } = useGetTransactions();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('expense');
  const { name, photoURL } = useGetUserInfo();
  const navigate = useNavigate();

  // redirect the user if not logged in.

  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      console.log("the auth item does not exist");
    }
  }, [])

  const onSubmit = (e) => { 
    e.preventDefault();
    addTransaction(
      description,
      transactionAmount, 
      transactionType,
    );

    setDescription("");
    setTransactionAmount("");
  }

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch(error) {
      console.error(error.message);
    }
  }


  return (
    <>
    {/* Always learn to seperate the login of your code with the ui, it also makes the different components very resuable */}
      <div className="expense-tracker text-center">
        {
          photoURL &&
          <div className='text-center mx-auto flex items-center justify-center'>
            <img className='h-[100px] w-[100px] rounded text-center mx-auto' src={photoURL} alt='No Photo found' />
            <button onClick={signUserOut} className='p-5 bg-blue-500 text-dark font-semibold'>Signout button</button>
          </div>
        }
        <div className="container text-center">
          <h1 className="font-bold"> {name}  Expense Tracker.</h1>
        </div>
        <div className="balance"> 
          <h1 className="font-bold">Your Balance</h1>
          <h2> {transactionTotals.balance} </h2>
        </div>
        <div className="summary">
          <div className="income">
            <h4 className="font-bold">Income</h4>
            <p > {transactionTotals.totalIncome} </p>
          </div>
          <div className="expenses">
          <h4 className="font-bold">Expenses</h4>
            <p > {transactionTotals.totalExpenses} </p>
          </div>
        </div>

        <form className="addTransactions" onSubmit={onSubmit}>
          <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          <input type="number"  onChange={(e) => setTransactionAmount(e.target.value)} placeholder="Amount" required />
          <input type="radio" checked={transactionType === 'expense'} onChange={(e) => setTransactionType(e.target.value)}  id="expense" value='expense' />
          <label htmlFor="expense">Expense</label>
          <input type="radio" className='mx-5'  checked={transactionType === 'income'} onChange={(e) => setTransactionType(e.target.value)} id="income" value='income' />
          <label htmlFor="#income">Income</label>
           <button type="submit" className='border-y-black block text-center my-5 mx-auto bg-[blue] text-white'>Add Transaction</button>
        </form>
      </div>
      <div className="transaction">
        <h1 className="font-bold text-center text-dark bg-white">Stored Transactions.</h1>
        <ul className=''>
          {
            transactions.map((transaction) => {
              const { description, transactionAmount, transactionType } = transaction;
              return (
                <li key={transaction.id} className={transactionType === 'expense' ? 'text-[red]' : 'text-[blue]'}>
                    <h4 className="font-bold">{description}</h4>
                    <p className="font-bold">$ {transactionAmount} . <label>{}</label></p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}
