import { useEffect, useState } from "react";

export function SudokuTable() {
    class Square {
        constructor(value, index) {
            this.value = value;
            this.index = index;
        }
    }
    const [sudoku, setSudoku] = useState(new Array(81))
    useEffect(() => {
        var newSudoku = new Array(81);
        for (let i = 0; i < sudoku.length; i++) {
            var square = new Square(0, i)
            newSudoku[i] = square;
        }
        setSudoku(newSudoku)
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

    return (
        <div className="Sudoku">

            {sudoku.map(square => 
                <div key={square.index}>
                    <input type="text" autoComplete="off" id={square.index} onChange={onChange} value={sudoku[square.index].value === 0 ? "" : sudoku[square.index].value} />
                </div>)}
            <div className="BorderVerticalFirst"/>
            <div className="BorderVerticalSecond"/>
            <div className="BorderHorizontalFirst"/>
            <div className="BorderHorizontalSecond"/>
        </div>
        
    )
}