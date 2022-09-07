
export function SudokuTable({sudoku, onChange, lookingForCoordinates, getCorrectValue}) {
    if (lookingForCoordinates) {
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
            <div className="Sudoku">
                {sudoku.map(square => 
                <div key={square.index} id={square.index}>
                {!onChange 
                ? <>{square.value}</>
                : <input type="text" autoComplete="off" id={square.index} onChange={onChange} value={sudoku[square.index].value === 0 ? "" : sudoku[square.index].value} />}
                </div>
                )}
                    
                <div className="BorderVerticalFirst"/>
                <div className="BorderVerticalSecond"/>
                <div className="BorderHorizontalFirst"/>
                <div className="BorderHorizontalSecond"/>
            </div>
            </>  
        )
    }
}