import { useState } from "react";
import { useEffect } from "react";
import { SudokuBorders } from "./SudokuBorders";

export function LoadingSudokuTable({originalSudoku, squareToLoadIndex}) {

    const [sudoku, setSudoku] = useState(originalSudoku);
    const [index, setIndex] = useState(0);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    useEffect(() => {
        const newSudoku = [...originalSudoku]
        sleep(100).then(() => {
            if (squareToLoadIndex !== null) {
                newSudoku[squareToLoadIndex] = Math.floor(Math.random() * 8) + 1 
            } else {
                setIndex(index + 1)
                if (index > 79) {
                    setIndex(0)
                }
                newSudoku[index] = Math.floor(Math.random() * 8) + 1 
                newSudoku[newSudoku.length - index - 1] = Math.floor(Math.random() * 8) + 1
            }
            setSudoku(newSudoku)
        })
    })
    return (
        <>
        <div className="Sudoku" id="LoadingTable">
            {sudoku.map(square => 
            <div>
                {square === 0 ? " " : square}
            </div>
            )} 
            <SudokuBorders />
        </div>
        </>  
    )

}



