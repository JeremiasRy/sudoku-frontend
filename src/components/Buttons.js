export function Buttons({solve, solved, clear, randomSudoku, check, setGettingCoordinates, showDifficulty, setShowDifficulty, showOptions, setShowOptions}) {
    const handleClick = (event) => {
        randomSudoku(event.target.value)
        setShowOptions(!showOptions)
        if (solved) {
            clear();
        }
    }
    const handleRandomClick = () => {
        setShowOptions(true);
        setShowDifficulty(true);
    }
    const handleSolveSquareClick = () => {
        setGettingCoordinates(true)
        setShowOptions(true);
        setShowDifficulty(false);
    }
    const handleBackClick = () => {
        setShowOptions(false);
        setGettingCoordinates(false);
    }

    return (
        <div className="Buttons">
            {showOptions === false ? 
            <>
            <button onClick={solve}>Solve</button>
            <button onClick={check}>Check</button>
            <button onClick={handleSolveSquareClick}>Give one correct value</button>
            <button onClick={handleRandomClick}>Get A Random Sudoku</button>
            <button onClick={clear}>Clear</button>
            </> : 
            showDifficulty === true ?
            <>
            <h3 style={{textAlign: "center"}}>How difficult?</h3>
            <button onClick={handleClick} value={0}>Easy</button>
            <button onClick={handleClick} value={1}>Medium</button>
            <button onClick={handleClick} value={2}>Hard</button>
            </> 
            :
            <>
            <h3>Click on the square you want to know</h3>
            <button onClick={handleBackClick}>back</button>
            </>}
            
        </div>
    )
}