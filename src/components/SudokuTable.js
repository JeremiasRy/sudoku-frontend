
export function SudokuTable({sudoku, solvedSudoku, onChange, gettingSquare, getCorrectValue}) {
    console.log(sudoku);
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
            <div className="BorderVerticalFirst"/>
            <div className="BorderVerticalSecond"/>
            <div className="BorderHorizontalFirst"/>
            <div className="BorderHorizontalSecond"/>
            </div>
        )
    } else {
        return (
            <>
            <div className="Sudoku" id={solvedSudoku !== undefined ? "Solved" : ""}>
                {solvedSudoku !== undefined  
                ? solvedSudoku.map(square => <div id={square.index} key={square.index}>{sudoku[square.index].value === 0 ? <b>{square.value}</b> : square.value}</div>) 
                : sudoku.map(square => <div id={square.index} key={square.index}><input type="text" id={square.index} onChange={onChange} value={sudoku[square.index].value === 0 ? "" : sudoku[square.index].value}></input></div>)}
                <div className="BorderVerticalFirst"/>
                <div className="BorderVerticalSecond"/>
                <div className="BorderHorizontalFirst"/>
                <div className="BorderHorizontalSecond"/>
            </div>
            </>  
        )
    }
}