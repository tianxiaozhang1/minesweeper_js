//Javascript version of the classic Minesweeper game with mid-click functionality
//At least one of opening all non-mines or flagging all 99 mines will be considered a win

var gameOver = false;
var gameWon = false;
var minesNum = 99;
var timeElapsed = 0;
var gameOn = false;
const digits = [[1,1,1,1,1,1,-1,0,-1,1,1,1,1,1,1], [0,0,0,0,0,0,-1,0,-1,0,1,1,1,1,1], [1,0,1,1,1,1,-1,1,-1,1,1,1,1,0,1], [1,0,1,0,1,1,-1,1,-1,1,1,1,1,1,1], [1,1,1,0,0,0,-1,1,-1,0,1,1,1,1,1],
          [1,1,1,0,1,1,-1,1,-1,1,1,0,1,1,1], [1,1,1,1,1,1,-1,1,-1,1,1,0,1,1,1], [1,0,0,0,0,1,-1,0,-1,0,1,1,1,1,1], [1,1,1,1,1,1,-1,1,-1,1,1,1,1,1,1], [1,1,1,0,1,1,-1,1,-1,1,1,1,1,1,1]]
var mines = [];
var numbers = [];
var clickMap = [];
var click_pair = [];
var click_pos = [];
var flaggedSq = [];
var staticMinesNum = 99;

window.onload = function() {
    startGame();
}

function drawNumber(number, sqx, sqy){
    //Square graphics
    if (number === -1) {
        var ctx1 = canvas.getContext('2d');
        var ctx2 = canvas.getContext('2d');
        ctx1.fillStyle = 'rgb(152, 152, 146)';
        ctx1.fillRect(20+sqx*58, 124+sqy*58, 56, 56)
        ctx2.fillStyle = 'rgb(202, 202, 192)';
        ctx2.fillRect(20+sqx*58, 124+sqy*58, 54, 54);
    }
    else {
        //Background
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(212,212,202)'; //SQUARECOLOUR
        ctx.fillRect(20+sqx*58, 124+sqy*58, 56, 56);

        if (number === 1) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(50,112,172)' //C1
            sq.fillRect(20+17+sqx*58, 124+15+sqy*58, 17, 8);
            sq.fillRect(20+26+sqx*58, 124+9+sqy*58, 8, 30);
            sq.fillRect(20+23+sqx*58, 124+21+sqy*58, 3, 17);
            sq.fillRect(20+13+sqx*58, 124+38+sqy*58, 30, 8);
        }
        else if (number === 2) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(76,128,68)' //C2
            sq.fillRect(20+13+sqx*58, 124+9+sqy*58, 30, 8)
            sq.fillRect(20+35+sqx*58, 124+16+sqy*58, 8, 8)
            sq.fillRect(20+13+sqx*58, 124+23+sqy*58, 30, 8)
            sq.fillRect(20+13+sqx*58, 124+31+sqy*58, 8, 8)
            sq.fillRect(20+13+sqx*58, 124+38+sqy*58, 30, 8)
        }
        else if (number === 3) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(200,22,28)' //C3
            sq.fillRect(20+13+sqx*58, 124+9+sqy*58, 30, 8)
            sq.fillRect(20+35+sqx*58, 124+16+sqy*58, 8, 22)
            sq.fillRect(20+19+sqx*58, 124+23+sqy*58, 24, 8)
            sq.fillRect(20+13+sqx*58, 124+38+sqy*58, 30, 8)
        }
        else if (number === 4) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(0,62,116)' //C4
            sq.fillRect(20+32+sqx*58, 124+9+sqy*58, 10, 37)
            sq.fillRect(20+14+sqx*58, 124+23+sqy*58, 28, 8)
            sq.fillRect(20+18+sqx*58, 124+9+sqy*58, 8, 16)
        }
        else if (number === 5) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(126,68,58)' //C5
            sq.fillRect(20+13+sqx*58, 124+9+sqy*58, 30, 8)
            sq.fillRect(20+13+sqx*58, 124+16+sqy*58, 8, 8)
            sq.fillRect(20+13+sqx*58, 124+23+sqy*58, 30, 8)
            sq.fillRect(20+35+sqx*58, 124+31+sqy*58, 8, 8)
            sq.fillRect(20+13+sqx*58, 124+38+sqy*58, 30, 8)
        }
        else if (number === 6) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(80,146,150)' //C6
            sq.fillRect(20+13+sqx*58, 124+9+sqy*58, 30, 8)
            sq.fillRect(20+13+sqx*58, 124+16+sqy*58, 8, 22)
            sq.fillRect(20+13+sqx*58, 124+23+sqy*58, 30, 8)
            sq.fillRect(20+35+sqx*58, 124+31+sqy*58, 8, 8)
            sq.fillRect(20+13+sqx*58, 124+38+sqy*58, 30, 8)
        }
        else if (number === 7) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(56,56,52)' //C7
            sq.fillRect(20+13+sqx*58, 124+9+sqy*58, 30, 8)
            sq.fillRect(20+35+sqx*58, 124+16+sqy*58, 8, 30)
        }
        else if (number === 8) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(132,132,128)' //C8
            sq.fillRect(20+13+sqx*58, 124+9+sqy*58, 30, 8)
            sq.fillRect(20+13+sqx*58, 124+16+sqy*58, 8, 22)
            sq.fillRect(20+13+sqx*58, 124+23+sqy*58, 30, 8)
            sq.fillRect(20+35+sqx*58, 124+16+sqy*58, 8, 22)
            sq.fillRect(20+13+sqx*58, 124+38+sqy*58, 30, 8)
        }
        else if (number === "M" || number === 9) {
            sq = canvas.getContext('2d');
            sq.fillStyle = 'rgb(26,36,46)' //BLACK
            sq.fillRect(20+15+sqx*58, 124+15+sqy*58, 26, 26)
            sq.fillRect(20+11+sqx*58, 124+19+sqy*58, 34, 18)
            sq.fillRect(20+19+sqx*58, 124+11+sqy*58, 18, 34)
            sq.fillRect(20+26+sqx*58, 124+7+sqy*58, 4, 42)
            sq.fillRect(20+7+sqx*58, 124+26+sqy*58, 42, 4)
            bd = canvas.getContext('2d');
            bd.fillStyle = 'rgb(232,232,222)' //BOARD
            bd.fillRect(20+22+sqx*58, 124+18+sqy*58, 4, 4)
        }
        else if (number === "F") {
            p1 = canvas.getContext('2d');
            p1.fillStyle = 'rgb(162,162,152)'
            p1.fillRect(20+sqx*58, 124+sqy*58, 56, 56)
            p2 = canvas.getContext('2d');
            p2.fillStyle = 'rgb(202, 202, 192)'
            p2.fillRect(20+sqx*58, 124+sqy*58, 54, 54)
            p3 = canvas.getContext('2d');
            p3.fillStyle = 'rgb(200,22,28)'
            p3.fillRect(20+10+sqx*58, 124+15+sqy*58, 6, 6)
            p3.fillRect(20+16+sqx*58, 124+12+sqy*58, 12, 12)
            p3.fillRect(20+22+sqx*58, 124+8+sqy*58, 12, 22)
            p4 = canvas.getContext('2d');
            p4.fillStyle = 'rgb(26, 36, 46)' //BLACK
            p4.fillRect(20+28+sqx*58, 124+30+sqy*58, 6, 6)
            p4.fillRect(20+18+sqx*58, 124+36+sqy*58, 20, 6)
            p4.fillRect(20+13+sqx*58, 124+40+sqy*58, 30, 8)
        }
        else if (number === "E") {
            p1 = canvas.getContext('2d');
            p1.fillStyle = 'rgb(210, 56, 24)'
            p1.fillRect(20+sqx*58, 124+sqy*58, 56, 56)
            p2 = canvas.getContext('2d');
            p2.fillStyle = 'rgb(26, 36, 46)'
            p2.fillRect(20+15+sqx*58, 124+15+sqy*58, 26, 26)
            p2.fillRect(20+11+sqx*58, 124+19+sqy*58, 34, 18)
            p2.fillRect(20+19+sqx*58, 124+11+sqy*58, 18, 34)
            p2.fillRect(20+26+sqx*58, 124+7+sqy*58, 4, 42)
            p2.fillRect(20+7+sqx*58, 124+26+sqy*58, 42, 4)
            p3 = canvas.getContext('2d');
            p3.fillStyle = 'rgb(232, 232, 222)'
            p3.fillRect(20+22+sqx*58, 124+18+sqy*58, 4, 4)
        }
        else if (number === "X") {
            p1 = canvas.getContext('2d');
            p1.fillStyle = 'rgb(26, 36, 46)' //BLACK
            p1.fillRect(20+15+sqx*58, 124+15+sqy*58, 26, 26)
            p1.fillRect(20+11+sqx*58, 124+19+sqy*58, 34, 18)
            p1.fillRect(20+19+sqx*58, 124+11+sqy*58, 18, 34)
            p1.fillRect(20+26+sqx*58, 124+7+sqy*58, 4, 42)
            p1.fillRect(20+7+sqx*58, 124+26+sqy*58, 42, 4)
            
            p2 = canvas.getContext('2d');
            p2.fillStyle = 'rgb(232, 232, 222)' //BOARD
            p2.fillRect(20+22+sqx*58, 124+18+sqy*58, 4, 4)

            p3 = canvas.getContext('2d');
            p3.fillStyle = 'rgb(200, 22, 28)' //RED

            for (let s1=0; s1<11; s1++) {
                p3.fillRect(20+6+sqx*58+s1*4, 124+6+sqy*58+s1*4, 4, 4)
            }
            for (let s2=0; s2<11; s2++) {
                p3.fillRect(20+6+sqx*58-s2*4+40, 124+6+sqy*58+s2*4, 4, 4)
            }
        }
    }
}

//Prevent the default action for the clickwheel
document.addEventListener("mousewheel", {passive: false});
//Right click - preventing the context menu from popping up
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})

//Releasing mouse
document.addEventListener("mouseup", mouseUp)
function mouseUp() {
    if (gameWon === false && gameOver === false) {
        if (click_pair.length === 1) {
            if (click_pair[0] === 1) {
                //Left click
                leftClick(click_pos)
            } else {
                //Right click
                rightClick(click_pos)
            }
        } else if (click_pair.length === 2) {
            //Mid click
            midClick(click_pos)
        } 
        click_pair = []
        click_pos = []
        
        //Redraw all unopened & unflagged squares
        //"Back to normal" after a failed mid-click; removing all the darkened squares
        if (gameOn === true) {
            for (let cx=0; cx<16; cx++) {
                for (let cy=0; cy<30; cy++) {
                    if (clickMap[cx][cy] === 0) {
                        var wrongSq1 = canvas.getContext('2d');
                        var wrongSq2 = canvas.getContext('2d');
                        wrongSq1.fillStyle = 'rgb(162, 162, 152)';
                        wrongSq1.fillRect(20+cy*58, 124+cx*58, 56, 56);
                        wrongSq2.fillStyle = 'rgb(202, 202, 192)';      //COVEREDSQCOLOUR
                        wrongSq2.fillRect(20+cy*58, 124+cx*58, 54, 54);
                    }
                }
            }
        }
    }
}

document.addEventListener('mousedown', (e) => {  
    if (e.clientX >= 850 && e.clientX <= 944 && e.clientY >= 18 && e.clientY <= 112) {
        switch (e.button) {
            //Smiley clicked
            case 0:
                startGame();
                break;
        }
    }
    else if (e.clientX >= 28 && e.clientX <= 1766 && e.clientY >= 132 && e.clientY <= 1058) {            
        if (gameOver == false && gameWon == false) {
            click_pos.push(Math.floor((e.clientY-132)/58), Math.floor((e.clientX-28)/58))
            switch (e.button) {

                //Left mouse button clicked
                case 0:
                    click_pair.push(1) 
                    if (click_pair.length === 2) {
                    
                        midClick(click_pos)
                    }
                    break;

                //Click wheel clicked
                case 1:
                    click_pos = [click_pos[0], click_pos[1]]
                    midClick(click_pos)
                    break;
                
                //Right mouse button clicked
                case 2:
                    click_pair.push(3) //Right mouse button clicked
                    //console.log("Right down", click_pair)
                    if (click_pair.length === 2) {
                        midClick(click_pos)
                    }
                    break;
            }   
        }
    }
});

function leftClick(pair){

    //If unopened
    if (clickMap[pair[0]][pair[1]] === 0) {
        //If not a mine
        if (numbers[pair[0]][pair[1]] !== 9) {
            if (gameOn === false) {
                gameOn = true
            }
            //Empty square => open up area
            if (numbers[pair[0]][pair[1]] === 0) {
                showSquares(pair[0], pair[1])
            }
            //Singular square to open
            else {
                drawNumber(numbers[pair[0]][pair[1]], pair[1], pair[0])
                clickMap[pair[0]][pair[1]] = 1

                count_of_1 = 0
                for (let xx1 = 0; xx1 < 16; xx1++) {
                    for (let yy1 = 0; yy1 < 30; yy1++) {
                        if (clickMap[xx1][yy1] === 1) {
                            count_of_1 = count_of_1 + 1
                        }
                    }
                }
                if (count_of_1 + staticMinesNum === 480) {
                    gameWon = true
                    gameOn = false
                    gameWonSmiley()
                }
            }
        }
        //Clicked mine - game over
        else{ 
            //Show all mines
            for (let ir2 = 0; ir2 < 16; ir2++) {
                for (let ic2 = 0; ic2 < 30; ic2++) {
                    if (numbers[ir2][ic2] === 9) {
                        if (clickMap[ir2][ic2] === 0) {
                            drawNumber("M", ic2, ir2) //Show all mines, the correctly flagged ones won't change
                        }
                    }
                    if (clickMap[ir2][ic2] === 2 && numbers[ir2][ic2] !== 9) {
                        drawNumber("X", ic2, ir2)
                    }
                }
            }
            drawNumber("E", pair[1], pair[0])
            gameOver = true
            gameOn = false
            gameOverSmiley()
        }
    }
}

function rightClick(pair){
    //console.log(click_pos)
    //If square is hidden and there are potentially mines left to flag
    if (clickMap[pair[0]][pair[1]] === 0 && minesNum > 0) {
        drawNumber("F", pair[1], pair[0])
        minesNum--
        clickMap[pair[0]][pair[1]] = 2
        flaggedSq.push(pair)
        bigRedNumber(minesNum, 10, 10)

        //Possibly flagged all mines
        if (minesNum === 0) {
            exceptionNum = 0
            for (let fl1 = 0; fl1 < flaggedSq.length; fl1 ++) {
                if (numbers[flaggedSq[fl1][0]][flaggedSq[fl1][1]] !== 9) {
                    exceptionNum = exceptionNum + 1
                }
            }
            if (exceptionNum === 0) {
                gameWon = true
                gameOn = false
                gameWonSmiley()
            }
        }
    }
    //If square is flagged - remove it
    else if (clickMap[pair[0]][pair[1]] === 2) {
        drawNumber(-1, pair[1], pair[0])
        minesNum++
        clickMap[pair[0]][pair[1]] = 0
        bigRedNumber(minesNum, 10, 10)

        flaggedSq = flaggedSq.filter(function(value, index, arr){
            return value !== pair
        })
    }
}

function resetClickmap() {
    for (let i=0; i<480; i++) {
        row_i = Math.floor(i/30)
        col_i = i%30
        clickMap[row_i][col_i] = 0

        return clickMap
    }
}

function showSquares(sqx, sqy){
    //When opening up an empty square
    var displayArea = [];
    var displayPoints = [];
    displayPoints.push(sqx*30+sqy)
    var fourWays = [[0,-1],[0,1],[-1,0],[1,0]];
    var allNeighbours = [];

    //Find all connecting empty squares
    //This part converts all square co-ordinates ([0,0] to [15, 29]) into serial numbers (0 to 479)
    //And then back because it's easier to check the list
    roundsLeft = 16
    while (roundsLeft > 0) {

        for (var i1 in displayPoints) {
            for (var x1 in fourWays) {
                var sqax = Math.floor(displayPoints[i1]/30)
                var sqay = displayPoints[i1]%30
                if (sqax+fourWays[x1][0] >= 0 && sqax+fourWays[x1][0] <= 15 && sqay+fourWays[x1][1] >= 0 && sqay+fourWays[x1][1] <= 29) {
                    if (numbers[sqax+fourWays[x1][0]][sqay+fourWays[x1][1]] === 0) {
                        if (((sqax+fourWays[x1][0])*30 + (sqay+fourWays[x1][1])) in displayPoints) {
                        }
                        else {
                            displayPoints.push((sqax+fourWays[x1][0])*30 + (sqay+fourWays[x1][1]))
                        }
                    }
                }
            }
        }

        var displayPoints = displayPoints.filter((v, i, a) => a.indexOf(v) === i);
        roundsLeft -= 1
    }

    for (i1 in displayPoints) {
        displayArea.push([Math.floor(displayPoints[i1]/30), displayPoints[i1]%30])
    }

    //Find all neighbours of those empty squares
    for (var i2 in displayArea) {
        allNeighbours.push(displayArea[i2])
        if (displayArea[i2][0] >= 0 && displayArea[i2][0] <= 15 && displayArea[i2][1]-1 > 0 && displayArea[i2][1]-1 <= 29) {
            allNeighbours.push([displayArea[i2][0], displayArea[i2][1]-1])
        }
        if (displayArea[i2][0] >= 0 && displayArea[i2][0] <= 15 && displayArea[i2][1]+1 > 0 && displayArea[i2][1]+1 <= 29) {
            allNeighbours.push([displayArea[i2][0], displayArea[i2][1]+1])
        }
        if (displayArea[i2][0]-1 >= 0 && displayArea[i2][0]-1 <= 15 && displayArea[i2][1] > 0 && displayArea[i2][1] <= 29) {
            allNeighbours.push([displayArea[i2][0]-1, displayArea[i2][1]])
        }
        if (displayArea[i2][0]+1 >= 0 && displayArea[i2][0]+1 <= 15 && displayArea[i2][1] > 0 && displayArea[i2][1] <= 29) {
            allNeighbours.push([displayArea[i2][0]+1, displayArea[i2][1]])
        }
        if (displayArea[i2][0]-1 >= 0 && displayArea[i2][0]-1 <= 15 && displayArea[i2][1]-1 > 0 && displayArea[i2][1]-1 <= 29) {
            allNeighbours.push([displayArea[i2][0]-1, displayArea[i2][1]-1])
        }
        if (displayArea[i2][0]-1 >= 0 && displayArea[i2][0]-1 <= 15 && displayArea[i2][1]+1 > 0 && displayArea[i2][1]+1 <= 29) {
            allNeighbours.push([displayArea[i2][0]-1, displayArea[i2][1]+1])
        }
        if (displayArea[i2][0]+1 >= 0 && displayArea[i2][0]+1 <= 15 && displayArea[i2][1]-1 > 0 && displayArea[i2][1]-1 <= 29) {
            allNeighbours.push([displayArea[i2][0]+1, displayArea[i2][1]-1])
        }
        if (displayArea[i2][0]+1 >= 0 && displayArea[i2][0]+1 <= 15 && displayArea[i2][1]+1 > 0 && displayArea[i2][1]+1 <= 29) {
            allNeighbours.push([displayArea[i2][0]+1, displayArea[i2][1]+1])
        }
    }

    //Add unique neighbours (the "shell")
    for (var i3 in allNeighbours) {
        if (numbers[allNeighbours[i3][0]][allNeighbours[i3][1]] > 0 && numbers[allNeighbours[i3][0]][allNeighbours[i3][1]] < 9 && !(allNeighbours[i3] in displayArea)) {
            displayArea.push(allNeighbours[i3])
        }
    }

    var displayArea = [ ...new Set(displayArea) ];

    //Display entire blank area + "shell"
    for (var i4 in displayArea) {
        if (clickMap[displayArea[i4][0]][displayArea[i4][1]] === 2 && !(numbers[displayArea[i4][0]][displayArea[i4][1]] === 9)) {
        }
        else {
            clickMap[displayArea[i4][0]][displayArea[i4][1]] = 1
            drawNumber(numbers[displayArea[i4][0]][displayArea[i4][1]], displayArea[i4][1], displayArea[i4][0])
        }
    }

    //Display the wrongly flagged non mines if lost
    if (gameOver === true) {
        for (let ir2 = 0; ir2 < 16; ir2++) {
            for (let ic2 = 0; ic2 < 30; ic2++) {
                if (numbers[ir2][ic2] === 0 && clickMap[ir2][ic2] === 2) {
                    drawNumber("X", ic2, ir2)
                }
            }
        }
    }
}

function midClick(pair) {
    if (clickMap[pair[0]][pair[1]] === 1) {

        //Try to open up all neighbours when middle-clicking an opened number
        midNum = numbers[pair[0]][pair[1]]
        flagNum = 0
        flagged = []

        //Check the number of flagged squares around
        for (let xx=pair[0]-1; xx<pair[0]+2; xx++) {
            for (let yy=pair[1]-1; yy<pair[1]+2; yy++) {
                if (xx >= 0 && xx <= 15 && yy >= 0 && yy <= 29) {
                    if (xx === pair[0] && yy === pair[1]) {
                    } else {
                        if (clickMap[xx][yy] === 2) {
                            flagged.push([xx, yy])
                            flagNum = flagNum + 1
                        }
                    }
                }
            }
        }

        //Flags match the number of the square in question
        if (flagNum === midNum) {
            for (let xx=pair[0]-1; xx<pair[0]+2; xx++) {
                for (let yy=pair[1]-1; yy<pair[1]+2; yy++) {
                    if (xx >= 0 && xx <= 15 && yy >= 0 && yy <= 29) {
                        if (xx === pair[0] && yy === pair[1]) {
                        } else {
                            //Try to open up unopened squares
                            if (clickMap[xx][yy] === 0) {
                                //Not a mine and not empty
                                if (numbers[xx][yy] > 0 && numbers[xx][yy] < 9) {
                                    drawNumber(numbers[xx][yy], yy, xx)
                                    clickMap[xx][yy]=1
                                    
                                    //Won?
                                    count_of_1 = 0
                                    for (let xx1 = 0; xx1 < 16; xx1++) {
                                        for (let yy1 = 0; yy1 < 30; yy1++) {
                                            if (clickMap[xx1][yy1] === 1) {
                                                count_of_1 = count_of_1 + 1
                                            }
                                        }
                                    }
                                    if (count_of_1 + staticMinesNum === 480) {
                                        gameWon = true
                                        gameOn = false
                                        gameWonSmiley()
                                    }
                                }
                                //One of the neighbours is empty - need to check if there's more to open
                                else if (numbers[xx][yy] === 0) {
                                    ////console.log("Show squares from mid click")
                                    showSquares(xx, yy)
                                }
                                //One of the neighbours is a mine - game over
                                else if (numbers[xx][yy] === 9) {
                                    gameOver = true
                                    gameOn = false

                                    for (let ir2 = 0; ir2 < 16; ir2++) {
                                        for (let ic2 = 0; ic2 < 30; ic2++) {
                                            if (numbers[ir2][ic2] === 9) {
                                                drawNumber("M", ic2, ir2)
                                            }
                                        }
                                    }
                                    //Show the wrongly flagged squares
                                    for (var irx in flagged) {
                                        //Moved [0] and [1] out
                                        if (numbers[flagged[irx][0]][flagged[irx][1]] !== 9) {
                                            drawNumber("X", irx[1], irx[0])
                                        }
                                    }
                                    //Wrongly flagged
                                    for (let ir2 = 0; ir2 < 16; ir2++) {
                                        for (let ic2 = 0; ic2 <30; ic2++) {
                                            if (numbers[ir2][ic2] === 0 && clickMap[ir2][ic2] === 2) {
                                                drawNumber("X", ic2, ir2)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //Flag number doesn't match number of square in question - light up the unopened as a reminder
        else {
            for (let xx=pair[0]-1; xx<pair[0]+2; xx++) {
                for (let yy=pair[1]-1; yy<pair[1]+2; yy++) {
                    if (xx >= 0 && xx <= 15 && yy >= 0 && yy <= 29) {
                        if (xx === pair[0] && yy === pair[1]) {
                        } else {
                            if (clickMap[xx][yy] === 0) {
                                var wrongSq1 = canvas.getContext('2d');
                                var wrongSq2 = canvas.getContext('2d');
                                wrongSq1.fillStyle = 'rgb(162, 162, 152)';
                                wrongSq1.fillRect(20+yy*58, 124+xx*58, 56, 56);
                                wrongSq2.fillStyle = 'rgb(182, 182, 172)';
                                wrongSq2.fillRect(20+yy*58, 124+xx*58, 54, 54);
                            }
                        }
                    }
                }
            }
        }
    }
}

setInterval(function() {
    if (gameOn === true) {
        timeElapsed = timeElapsed + (1/35)
        bigRedNumber(parseInt(timeElapsed), 10, 1626)
    }
}, 35); // update about every second

document.addEventListener('mousemove', (event) => {
    //Whenever mouse moves
    if (event.clientX >= 848 && event.clientX <= 942 && event.clientY >= 20 && event.clientY <= 114) {
        mouseHovering()
    } else {
        mouseOut()
    }
});

function bigRedNumber(num, top, left){
    //Both red clocks at top
    let first_d = Math.floor(num/100)
    let second_d_mid = Math.floor(num/100)
    let second_d = Math.floor((num - (second_d_mid*100))/10)
    const three_d = [first_d, second_d, num%10]

    for (let d = 0; d < 3; d++) {
        for (let i = 0; i < 15; i++) {
            d_row = i%5
            d_col = Math.floor(i/5)

            if (digits[three_d[d]][i] >= 0) {
                if (digits[three_d[d]][i] === 1) {
                    d_colour = 'rgb(200, 22, 28)' // RED
                } else if (digits[three_d[d]][i] === 0) {
                    d_colour = 'rgb(66, 22, 26)' // RED_DARK
                }
                var red_sq = canvas.getContext('2d');
                red_sq.fillStyle = d_colour;
                red_sq.fillRect(left + 8+ 44*d + d_col*13, top + 8 + d_row * 16, 12, 15);
            }
        }
    }
}

function mouseHovering(){
    var smiley = canvas.getContext('2d');
    smiley.fillStyle = 'rgb(232, 232, 222)';
    smiley.fillRect(848, 16, 88, 88);
    smiley.fillStyle = 'rgb(132, 132, 128)';
    smiley.fillRect(842, 10, 88, 88);

    if (gameOver == false && gameWon == false) {
        normalSmiley()
    }
    else if (gameOver == true) {
        gameOverSmiley()
    }
    else if (gameWon == true) {
        gameWonSmiley()
    }
}

function mouseOut(){
    var smiley = canvas.getContext('2d');
    smiley.fillStyle = 'rgb(232, 232, 222)';
    smiley.fillRect(842, 10, 88, 88);
    smiley.fillStyle = 'rgb(132, 132, 128)';
    smiley.fillRect(848, 16, 88, 88);

    if (gameOver == false && gameWon == false) {
        normalSmiley()
    }
    else if (gameOver == true) {
        gameOverSmiley()
    }
    else if (gameWon == true) {
        gameWonSmiley()
    }
}

function gameWonSmiley() {
    //Game Won icon
    var smiley = canvas.getContext('2d');
    smiley.fillStyle = "rgb(202, 202, 196)"; //BACKGROUND
    smiley.fillRect(848, 16, 82, 82);
    smiley.fillStyle = "rgb(236, 212, 82)"; //YELLOW 
    smiley.fillRect(864, 32, 50, 50);
    smiley.fillStyle = "rgb(26, 36, 46)"; //BLACK 

    smiley.fillRect(864, 24, 50, 8); 
    smiley.fillRect(864, 82, 50, 8); 
    smiley.fillRect(856, 32, 8, 50); 
    smiley.fillRect(914, 32, 8, 50); 

    smiley.fillRect(869, 40, 16, 12); 
    smiley.fillRect(893, 40, 16, 12); 
    smiley.fillRect(864, 44, 50, 4); 

    smiley.fillRect(877, 66, 24, 8); 
    smiley.fillRect(869, 58, 8, 8); 
    smiley.fillRect(901, 58, 8, 8); 
}

function gameOverSmiley() {
    //Game over icon
    var smiley = canvas.getContext('2d');
    smiley.fillStyle = "rgb(202, 202, 196)"; //BACKGROUND
    smiley.fillRect(848, 16, 82, 82);
    smiley.fillStyle = "rgb(236, 212, 82)"; //YELLOW 
    smiley.fillRect(864, 32, 50, 50);
    smiley.fillStyle = "rgb(26, 36, 46)"; //BLACK 

    smiley.fillRect(864, 24, 50, 8); 
    smiley.fillRect(864, 82, 50, 8); 
    smiley.fillRect(856, 32, 8, 50); 
    smiley.fillRect(914, 32, 8, 50); 

    smiley.fillRect(879, 46, 4, 4); 
    smiley.fillRect(883, 50, 4, 4); 
    smiley.fillRect(875, 42, 4, 4);
    smiley.fillRect(875, 50, 4, 4);
    smiley.fillRect(883, 42, 4, 4);

    smiley.fillRect(895, 46, 4, 4); 
    smiley.fillRect(899, 50, 4, 4); 
    smiley.fillRect(891, 42, 4, 4);
    smiley.fillRect(891, 50, 4, 4);
    smiley.fillRect(899, 42, 4, 4);

    smiley.fillRect(877, 66, 24, 8); 
}

function normalSmiley(){
    //Standard icon
    var smiley = canvas.getContext('2d');
    smiley.fillStyle = 'rgb(202, 202, 196)'; //Smiley background
    smiley.fillRect(848, 16, 82, 82);
    smiley.fillStyle = 'rgb(236, 212, 82)';
    smiley.fillRect(864, 32, 50, 50);

    smiley.fillStyle = 'rgb(236, 212, 82)';
    smiley.fillRect(864, 32, 50, 50);
    
    smiley.fillStyle = 'rgb(26, 36, 46)';
    smiley.fillRect(864, 24, 50, 8);
    smiley.fillRect(864, 82, 50, 8);
    smiley.fillRect(856, 32, 8, 50);
    smiley.fillRect(914, 32, 8, 50);

    smiley.fillRect(877, 42, 8, 8);
    smiley.fillRect(893, 42, 8, 8);
    smiley.fillRect(877, 66, 24, 8);
    smiley.fillRect(869, 58, 8, 8);
    smiley.fillRect(901, 58, 8, 8);
}

function neighbours(row1, col1, mines){
    //Check number of mine neighbours
    nbCount = 0

    for (let xx=row1-1; xx<row1+2; xx++) {
        for (let yy=col1-1; yy<col1+2; yy++) {
            if (xx >= 0 && xx <= 15 && yy >= 0 && yy <= 29) {
                if (xx === row1 && yy === col1) {
                } else {
                    if (mines[xx][yy] === 1) {
                        nbCount++
                    }
                }
            }
        }
    }
    return nbCount
}

function startGame() {
    //Initial setup
    timeElapsed = 0;
    gameOver = false;
    gameWon = false;
    gameOn = false;
    minesNum = 99;
    flaggedSq = [];
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        //Background
        ctx.fillStyle = 'rgb(202,202,196)';
        ctx.fillRect(0, 0, 1778, 1070);
        //Board
        ctx.fillStyle = 'rgb(232, 232, 222)';
        ctx.fillRect(10, 114, 1758, 946);
        
        ctx.fillStyle = 'rgb(26, 36, 46)';
        ctx.fillRect(10, 10, 142, 94);   //Left Big Red - mines left
        ctx.fillRect(1626, 10, 142, 94); //Right Big Red - time left      

        bigRedNumber(minesNum, 10, 10)
        bigRedNumber(timeElapsed, 10, 1626)
        mouseOut()

        var ctx1 = canvas.getContext('2d');
        var ctx2 = canvas.getContext('2d');
        ctx1.fillStyle = 'rgb(152, 152, 146)';
        for (let i = 0; i < 480; i++) {
            row_i = Math.floor(i/30)
            col_i = i%30
            ctx1.fillRect(20+col_i*58, 124+row_i*58, 56, 56);
        }
        ctx2.fillStyle = 'rgb(202, 202, 192)';
        for (let i = 0; i < 480; i++) {
            row_i = Math.floor(i/30)
            col_i = i%30
            ctx2.fillRect(20+col_i*58, 124+row_i*58, 54, 54);
        }
        
        //Creating 30*16 all-0 matrix
        for (let i = 0; i < 16; i++) {
            mines[i] = new Array(30).fill(0);
            mines[i][i] = 0;
        }

        //Generates random field with 99 mines in 480 squares
        while (mines.flat().reduce((a , b) => a + b) !== minesNum) {
            rand_row = Math.floor(Math.random() * 16);
            rand_col = Math.floor(Math.random() * 30);
            if (mines[rand_row][rand_col] === 0) {
                mines[rand_row][rand_col] = 1
            }
        }

        //Generate numbers to display
        for (let i = 0; i < 16; i++) {
            numbers[i] = new Array(30).fill(0);
            numbers[i][i] = 0;
        }
        for (let ir2 = 0; ir2 < 16; ir2++) {
            for (let ic2 = 0; ic2 < 30; ic2++) {
                if (mines[ir2][ic2] === 1) {
                    numbers[ir2][ic2] = 9
                } else {
                    numbers[ir2][ic2] = neighbours(ir2, ic2, mines)
                }
            }
        }

        //Generate clickMap - 0 is hidden, 1 is open, 2 is flagged
        for (let i = 0; i < 16; i++) {
            clickMap[i] = new Array(30).fill(0);
            clickMap[i][i] = 0;
        }

        //For testing purpose - display the entire grid
        for (let row1 = 0; row1 < 16; row1++) {
            //console.log(numbers[row1])
        }
}}
