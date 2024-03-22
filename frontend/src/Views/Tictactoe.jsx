import React, { useState } from 'react'

const Tictactoe = () => {
  const [data,setdata]=useState(Array(9).fill(""));
  const [player,setplayer]=useState("X");
  const draw=(index)=>{
  //  console.log(index)
    if(data[index]===''){
      const board=[...data];
      board[index]=player;
      setdata(board);
      setplayer(player ==='X' ? '0' : 'X');
      checkwincondition(board);
    }
  }
  const checkwincondition=(board)=>{
    const winconditions=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ]
    for(let condition of winconditions){
      const [a,b,c]=condition;
      if(data[a] && data[a] === data[b] && data[a] === data[c]){
        alert(`${board[a]}wins`)
        restartGame();
        return;
      }
    }
    if(!board.includes('')){
      alert('match draw');
      restartGame();
      return;
    }
  }
  const restartGame=()=>{
    setdata(Array(9).fill(""));
    setplayer("X")
    // alert("1")
  }
  
  return (
    <div>
      <h4>
        <span style={{ color: 'red' }}>T</span>
        <span style={{ color: 'orange' }}>I</span>
        <span style={{ color: 'yellow' }}>C</span>
        <span style={{ color: 'green' }}>T</span>
        <span style={{ color: 'blue' }}>A</span>
        <span style={{ color: 'indigo' }}>C</span>
        <span style={{ color: 'violet' }}>T</span>
        <span style={{ color: 'pink' }}>O</span>
        <span style={{ color: 'gray' }}>E</span>
      </h4>
  
      <div id='board'>
        <div className="square" id='square0' onClick={()=>draw(0)}>{data[0]}</div>
        <div className="square" id='square1' onClick={()=>draw(1)}>{data[1]}</div>
        <div className="square" id='square2' onClick={()=>draw(2)}>{data[2]}</div>
        <div className="square" id='square3' onClick={()=>draw(3)}>{data[3]}</div>
        <div className="square" id='square4' onClick={()=>draw(4)}>{data[4]}</div>
        <div className="square" id='square5' onClick={()=>draw(5)}>{data[5]}</div>
        <div className="square" id='square6' onClick={()=>draw(6)}>{data[6]}</div>
        <div className="square" id='square7' onClick={()=>draw(7)}>{data[7]}</div>
        <div className="square" id='square8' onClick={()=>draw(8)}>{data[8]}</div>
      </div>
      <div id='endgame'>
        <input type="button" value={"Restart"} onClick={restartGame} id='restartbutton' />
      </div>
    </div>
  )
}

export default Tictactoe
