import { SudokuBorders } from "./SudokuBorders"

export function SudokuTable({sudoku, solvedSudoku, onChange, gettingSquare, getCorrectValue, initial}) {
    function sudokuId() {
        if (solvedSudoku !== undefined && !onChange) {
            return "Solved";
        } else if (solvedSudoku !== null && onChange !== undefined) {
            return "SolvedOrig";
        } else if (initial) {
            return  "Initial";
        } else {
            return "";
        }
    }
    if (gettingSquare) {
        return (
            <div className="Sudoku">
            {sudoku.map(square => 
            <div 
                key={square.index} 
                id={square.index} 
                value={square.value}
                className={square.value === 0 ? "HasNoValue" : ""} 
                onClick={square.value === 0 ? () => getCorrectValue(square.index) : null}> {square.value === 0 ? "" : square.value}</div>
            )}
            <SudokuBorders />
            </div>
        )
    } else {
        return (
            <>
            <div className="Sudoku" id={sudokuId()}>
                {!onChange  
                ? solvedSudoku.map(square => <div id={square.index} key={square.index}>{sudoku[square.index].value === 0 ? <b>{square.value}</b> : square.value}</div>) 
                : sudoku.map(square => <div id={square.index} key={square.index}><input type="text" id={square.index} onChange={onChange} value={sudoku[square.index].value === 0 ? "" : sudoku[square.index].value}></input></div>
                )}
                <SudokuBorders />
            </div>
            </>  
        )
    }
}