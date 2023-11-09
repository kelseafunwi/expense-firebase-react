import './App.css'
import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom'
import Root from './Root';
import { Auth } from './pages/auth/index';
import { ExpenseTracker } from './pages/expense-tracker';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes element={<Root />}>
          <Route path="/" index element={<Root />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

export const NotFound = () => {
  return (
    <div className='text-[red]'> 
      The page was not found 
      <br />
      <Link to='/'>Click to redirect to the homepage</Link>
    </div>
  )
}

