import axios from "axios";

const baseUrl = 'https://localhost:7283/'

const SudokuService = {
    SolveSudoku: async (sudoku) => {
        const result = await axios.get(`${baseUrl}solve/${sudoku}`)
        return result.data
    },
    GetIncorrectSquares: async (sudoku) => {
        const result = await axios.get(`${baseUrl}IncorrectSquares/${sudoku}`)
        return result.data
    },
    GetRandomSudoku: async (difficulty) => {
        const result = await axios.get(`${baseUrl}randomsudoku/${difficulty}`)
        return result.data
    },
    GetCorrectSquare: async (index, sudoku) => {
        const result = await axios.get(`${baseUrl}solveSquare/${index}/${sudoku}`)
        return result.data
    }
}

export default SudokuService;
