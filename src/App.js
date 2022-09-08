import './App.css';
import { useEffect, useState } from "react";
import { Buttons } from "./components/Buttons";
import { SudokuTable } from './components/SudokuTable';
import SudokuService from './services/SudokuService';
import { LoadingSudokuTable } from './components/LoadingSudokuTable';


function App() {  

  const emptySudoku = () => {
    var sudokuArr = new Array(81);
    for (let i = 0; i < sudokuArr.length; i++) {
          var square = new Square(0, i)
          sudokuArr[i] = square;
      }
    return sudokuArr;
  }
  const arrayOfZeros = () => {
    var arr = [];
    for (let i = 0; i < 81; i++) {
      arr.push(0)
    }
    return arr;
  }

  const fillSudokuSquares = (sudokuArr) => {
    let sudoku = [];
    for (let i = 0; i < sudokuArr.length; i++) {
      sudoku.push(new Square(sudokuArr[i], i))
    }
    return sudoku
  }
  
  class Square {
    constructor(value, index) {
      this.value = value;
      this.index = index;
    }
  }
  const [index, setIndex] = useState(null)
  const [sudoku, setSudoku] = useState(new Array(81))
  const [solvedSudoku, setSolvedSudoku] = useState(null)
  const [solved, setSolved] = useState(false)
  const [gettingSquare, setGettingSquare] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showDifficulty, setShowDifficulty] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
        setSudoku(emptySudoku)
  },[])

  const onChange = (event) => {
    var eventSquare;
    if (event.target.value === "") {
        eventSquare = new Square(0, parseInt(event.target.id))
        setSudoku(sudoku.map(square => square.index === eventSquare.index ? eventSquare : square))
        return;
    }
    if (isNaN(parseInt(event.target.value)) || parseInt(event.target.value) > 9 || parseInt(event.target.value) < 1) {
        return;
    }
    eventSquare = new Square(parseInt(event.target.value), parseInt(event.target.id))
    setSudoku(sudoku.map(square => square.index === eventSquare.index ? eventSquare : square))
}

const solve = async () => {
  setLoading(true)
  await SudokuService.SolveSudoku(sudoku.map(square => square.value).join(",")).then(response => {
    setLoading(false)
    setSolvedSudoku(fillSudokuSquares(response.sudoku));
    setSolved(true);
  })

}

const clear = () => {
  setSolved(false);
  setSolvedSudoku(null);
  setSudoku(emptySudoku);
}

const clearCheck = () => {
  for (let i = 0; i < 81; i++) {
    document.getElementById(i).removeAttribute("class");
  }
}

const randomSudoku = async (difficulty) => {
  setLoading(true);
  await SudokuService.GetRandomSudoku(difficulty).then(response => {
    setSudoku(fillSudokuSquares(response.sudoku));
    setLoading(false);
  });
  
}

const check = async () => {
  await SudokuService.GetIncorrectSquares(sudoku.map(square => square.value).join(",")).then(response => {
    for (let i = 0; i < response.length; i++) {
      let element = document.getElementById(response[i])
      element.setAttribute("class", "InCorrectSquare")
    }
    setTimeout(clearCheck, 2000)
  })

}

const getCorrectValue = async (index) => {
  setLoading(true)
  setIndex(index)
  await SudokuService.GetCorrectSquare(index, sudoku.map(square => square.value).join(",")).then(response => {
  setShowOptions(false);
  setShowDifficulty(false);
  setGettingSquare(false);
  setSudoku(fillSudokuSquares(response.sudoku))
  setLoading(false)
  setIndex(null)}
);
}


  return (
  <>
  <div className='TopNavBar'>
    <div className='Header'>
      <h1>Sudoku</h1>
    </div>
    <div className='Buttons'>
    </div>
  </div>
  <div className='Content'>
    <div className='SudokuHolder'>
    {loading 
    ? <LoadingSudokuTable originalSudoku={sudoku.map(square => square.value)} squareToLoadIndex={index}/> 
    : gettingSquare 
    ? <SudokuTable 
      sudoku={sudoku}  
      gettingSquare={gettingSquare} 
      setGettingSquare={setGettingSquare} 
      getCorrectValue={getCorrectValue}/> 
    : <SudokuTable sudoku={sudoku} onChange={onChange}/>}

    {solved && <SudokuTable sudoku={solvedSudoku} />}
    </div>
    <Buttons 
    loading={loading}
    solve={solve} 
    solved={solved} 
    clear={clear} 
    randomSudoku={randomSudoku} 
    check={check} 
    setGettingSquare={setGettingSquare}
    showOptions={showOptions}
    setShowOptions={setShowOptions}
    showDifficulty={showDifficulty}
    setShowDifficulty={setShowDifficulty}/>
  </div>
  </>
  );
}

export default App;
