// gameBoard = [["x","o","o"],
//              ["o","x","x"],
//              ["o","x","x"]
//             ];

// function display(currentState = gameBoard){
//     for(let r = 0; r < currentState[0].length; r++){
//         for(let c = 0 ; c < currentState[r].length; c++){
//             process.stdout.write(currentState[r][c] + " ");
//         }
//         console.log("");
//     }
// }

// function checkWinner(player){
//     let winner = "";

//     if (checkColumn(player) !== " ")
//         winner = checkColumn(player);
   

//     else if (checkRow(player) !== " "){
//         winner = checkRow(player);
        
//     }

//     else if (checkDiagonal(gameBoard) !==" "){
//         winner = checkDiagonal(gameBoard);
//     }
//     else if (checkTie(gameBoard) === true){
//         return console.log("This game is a tie");
//     }
//     if(winner === "x"){
//         return console.log("X is the winner");
//     }
//     else if(winner === "o") {
//         return console.log("O is the winner");
//     }
    
// }

// function checkRow(player){
//     for(let r = 0; r < gameBoard[0].length; r++){
//         let score = 0;
//         for(let c = 0; c < gameBoard[r].length; c++){
//             if(gameBoard[r][c] === player){
//                 score++;
//             }
//         }
  
//         if(score === 3)
//             return player;
//     }
//     return " ";
// }

// function checkColumn(player){
//     for(let c = 0 ; c < gameBoard.length; c++){
//         let score = 0;
        
//         for(let r = 0; r < gameBoard.length; r++){
//             if(gameBoard[r][c] === player){
//                 score++;
//             }
//             if(score === 3){
//                 return player;
//             }
//         }
//     }
//     return  " ";
// }

// function checkDiagonal(current){
//     let boardState = [];
//     let boardState2 = [];
//     boardState.push(current[0][0]);
//     boardState.push(current[1][1]);
//     boardState.push(current[2][2]);
//     boardState2.push(current[0][2]);
//     boardState2.push(current[1][1]);
//     boardState2.push(current[2][0]);
//     function checkX(value){
//         return value === "x";
//     }
//     function checkO(value){
//         return value === "o";
//     }

//     if( boardState.every(checkX) === true){
//         return "x";
//     }
//     else if(boardState.every(checkO) === true){
//         return "o";
//     }
//     else if(boardState2.every(checkX) === true){
//         return "o";
//     }
//     else if(boardState2.every(checkO) === true){
//         return "o";
//     }
//     else {
//         return " ";
//     }
// }
// function checkTie(current){
    
//     function checkState(value){
//         return value === "x"||value === "o";
//     }

//     if (current.every(row => row.every(checkState)) === true){
        
//         return true;
//     }
// }
const gameBoard = (()=>{
    let board = new Array(9);
    board.fill(null);
    console.log(board);

    const fill = (player,index)=>{
        board[index] = player;
    }

    const display = ()=>{
        console.log(board);
    }

    const checkRow = (player)=>{

        if(board[0] === player && board[1] === player && board[2] === player){
            return true;
        }
        else if(board[3] === player && board[4] === player && board[5] === player){
            return true;
        }
        else if(board[6] === player && board[7] === player && board[8] === player){
            return true;
        }
        else{
            return false;
        }
    }

    const checkColumn = (player) =>{

        if(board[0] === player && board[3] === player && board[6] === player){
            return true;
        }
        else if(board[1] === player && board[4] === player && board[7] === player){
            return true;
        }
        else if(board[2] === player && board[5] === player && board[8] === player){
            return true;
        }
        else{ 
            return false;
        }
    }

    const checkDiagonal = (player)=>{
        if(board[0] === player && board[4] === player && board[8] === player){
            return true;
        }
        else if (board[2] === player && board[4] === player && board[6] === player){
            return true;
        }
        else{
            return false;
        }
    }

    const checkWinner = (player)=>{
        if(checkDiagonal(player)){
            reset();
            return true;
        }
        else if(checkColumn(player)){
            reset();
            return true;
        }
        else if(checkRow(player)){
            reset();
            return true;
        }
        else{
            return false;
        }
    }
    const checkTie = ()=>{
        if(board.includes(null) === false){
            reset();
            return true;
        }
        else{
            return false;
        }
    }

    const reset = ()=>{
        board.fill(null);
        const fieldBox = document.querySelectorAll('.field');
        fieldBox.forEach((field)=>
            field.innerHTML = ""
        );
    }

    return{ fill, display, checkWinner,checkTie,reset};
})();


const displayController = (()=>{
    const fieldBox = document.querySelectorAll('.field');
    const playerOne = document.querySelector(".p1");
    const playerTwo = document.querySelector(".p2");
    const forms = document.getElementById('players');
    const submit = document.querySelector('button');
    const scores = document.querySelectorAll("score");
    let gameTurn = true;
    let scorePlayerOne = 0;
    let scorePlayerTwo = 0;

    fieldBox.forEach((field)=>
        field.addEventListener('click',(e)=>{
            index = field.getAttribute("id");
            if(field.innerHTML === ""){
                if(gameTurn === true){
                    console.log("its not empty!");
                    field.innerHTML = "X";
                    gameTurn = false;
                    gameBoard.fill("X", index);
                    gameBoard.display();

                    if(gameBoard.checkWinner("X")){
                        console.log("X is the winner");
                        scorePlayerOne++;
                        scores[0].innerText = scorePlayerOne;
                        gameTurn = true;
                    }
                    else if(gameBoard.checkTie() === true){
                        console.log("It was a tie!");
                        gameTurn = true;
                    }
                }
                else{
                    console.log("its not empty!");
                    field.innerHTML = "O";
                    gameTurn = true;
                    gameBoard.fill("O", index);
                    gameBoard.display();
                    if(gameBoard.checkWinner("O")){
                        console.log("O is the winner")
                        scorePlayerTwo++;
                        scores[1].innerText = scorePlayerTwo;
                        gameTurn = true;
                    }
                    else if(gameBoard.checkTie() === true){
                        console.log("It was a tie!");
                        gameTurn = true;
                    }
                }
            }
            else
                console.log("Its been marked!");
        })
    );

    submit.addEventListener('click',(e)=>{
        if(forms[0].value !== "" && forms[1].value !==""){
            gameBoard.reset();
            scores[0].innerText = 0;
            scores[1].innerText = 0;
            playerOne.innerText = forms[0].value;
            playerTwo.innerText = forms[1].value;
        }
    })
})();


