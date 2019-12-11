import React, { Component } from 'react'
import './App.css';

function Box(props){
  return(
    <button className='square' key={props} onClick={props.onClick}>{props.value}</button>
  );
}

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      bigBoard: [],
      players: [
        {
          id: 1,
          name: 'Player One',
          value: 'P1',
          start: 19,
          currPoint: 19,
          points: 0
        },
        {
          id: 2,
          name: 'Player One',
          value: 'P1',
          start: 380,
          currPoint: 380,
          points: 0
        }
      ],
    }
  }

  //bananas = ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']
  //bigBoard = Array(400).fill(null);
  
  filledBoard(){
    let startBoard = this.placeBananas();

    startBoard.splice(19, 1, 'P1')
    startBoard.splice(380, 1, 'P2')

    return startBoard;
  }


  randomizeBananas(){
    let fruitPosition = []
    for(let i=1; fruitPosition.length<=20; i++){
      let randomSpot = Math.round(Math.random() * Math.floor(401));
      if(randomSpot !== 19 || 380){
        fruitPosition.push(randomSpot);
      };
    };

    return fruitPosition;
  }

  placeBananas(){
    let bananaBoard = Array(400).fill(null)
    let readyBananas = this.randomizeBananas();

    for(let i=0; i<=readyBananas.length; i++){
      let position = readyBananas[i];
      bananaBoard.splice(position, 1, 'B')
    }
 
    return bananaBoard;
  }

  

  handleMove(i){
    return console.log('handleMove', i);
  }

  //start new game board setup
  //determine player turn
  //player moves (4 options...off board move teleport)
  //updates player position
  //was there fruit?
  //update player one fruit counter

  //subtract from 100 move shared counter (--turnCounter)
  //calculates winner

  renderBoard(){
    let gameLayout = this.filledBoard();
    let boxes = gameLayout.map( (box, index) =>
      <Box value={box} key={index} onClick={()=> this.handleMove(index)}/>
    );
    return (
      <div className='gamePage'>
        <div className='gameBoard'>
          {boxes}
        </div> 
      </div>
    );
  }




  render() {
    return (
      this.renderBoard()
    )
  }
}

