import './App.css';
import { useEffect, useState } from "react";
import { Buttons } from "./components/Buttons";
import { SudokuTable } from './components/SudokuTable';
import SudokuService from './services/SudokuService';


function App() {  

  const emptySudoku = () => {
    var sudokuArr = new Array(81);
    for (let i = 0; i < sudokuArr.length; i++) {
          var square = new Square(0, i)
          sudokuArr[i] = square;
      }
    return sudokuArr;
  }

  const fillSudokuSquares = (sudokuArr) => {
    let sudoku = [];
    for (let i = 0; i < sudokuArr.length; i++) {
      sudoku.push(new Square(sudokuArr[i], i))
    }
    return sudoku
  }
  
  class Square {
    constructor(value, index, isCorrect) {
      this.value = value;
      this.index = index;
    }
  }

  const [sudoku, setSudoku] = useState(new Array(81))
  const [solvedSudoku, setSolvedSudoku] = useState(null)
  const [solved, setSolved] = useState(false)
  const [gettingCoordinates, setGettingCoordinates] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showDifficulty, setShowDifficulty] = useState(true)

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
  let response = await SudokuService.SolveSudoku(sudoku.map(square => square.value).join(","))
  setSolvedSudoku(fillSudokuSquares(response.sudoku));
  setSolved(true);
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
  let response = await SudokuService.GetRandomSudoku(difficulty);
  setSudoku(fillSudokuSquares(response.sudoku));
}

const check = async () => {
  let response = await SudokuService.GetIncorrectSquares(sudoku.map(square => square.value).join(","))
  for (let i = 0; i < response.length; i++) {
    let element = document.getElementById(response[i])
    element.setAttribute("class", "InCorrectSquare")
  }
  setTimeout(clearCheck, 2000)
}

const getCorrectValue = async (index) => {
  let response = await SudokuService.GetCorrectSquare(index, sudoku.map(square => square.value).join(","))
  setShowOptions(false);
  setShowDifficulty(false);
  setGettingCoordinates(false);
  setSudoku(fillSudokuSquares(response.sudoku));
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
    {gettingCoordinates ? <SudokuTable sudoku={sudoku} lookingForCoordinates={true} setLookingForCoordinates={setGettingCoordinates} getCorrectValue={getCorrectValue}/>: <SudokuTable sudoku={sudoku} onChange={onChange}/>}
    {solved === true && <><SudokuTable sudoku={solvedSudoku} /></>}
    </div>
    <Buttons 
    solve={solve} 
    solved={solved} 
    clear={clear} 
    randomSudoku={randomSudoku} 
    check={check} 
    setGettingCoordinates={setGettingCoordinates}
    showOptions={showOptions}
    setShowOptions={setShowOptions}
    showDifficulty={showDifficulty}
    setShowDifficulty={setShowDifficulty}/>
  </div>
  </>
  );
}

export default App;
