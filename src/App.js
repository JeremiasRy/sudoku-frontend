import './App.css';
import { SudokuTable } from './SudokuTable';

function App() {
  return (
  <>
  <div className='TopNavBar'>
    <div className='Header'>
      <h1>Sudoku</h1>
    </div>
  </div>
  <div className='Content'>
    <SudokuTable />
  </div>
  </>
  );
}

export default App;
