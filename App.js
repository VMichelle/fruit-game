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
    const cols = 7;
    const rows = 7;
    
    this.state = {
      col: cols,
      row: rows,
      fruitNum: 12,
      bananas: [],
      player1:
        {
          id: 1,
          name: 'P1',
          currPoint: cols-1,
          points: 0
        },
      player2:
        {
          id: 2,
          name: 'P2',
          currPoint: (cols*rows)-cols,
          points: 0
        },
      playerOneTurn: true,
      turnsLeft: 25
    };
  }

  componentDidMount(){
    let fruit = this.randomizeBananas();
    this.setState({
      bananas: fruit
    })

    window.addEventListener('keyup', (e) => {
      this.arrowKey(e)
    })
  }

  randomizeBananas(){
    let fruitPosition = []
    const {fruitNum, row, col} = this.state

    for(let i=1; fruitPosition.length < fruitNum; i++){
      let randomSpot = Math.round(Math.random() * Math.floor(row*col-1));
      
      if(randomSpot !== (col-1 || (col*row)-col) && numExist(randomSpot) !== true){
        fruitPosition.push(randomSpot);
        };
      };

    function numExist(num){
      if(fruitPosition.includes(num)){
        return true;
      } else {
        return false
      }
    }
    
    return fruitPosition;
  }

  handleMove(i){
    const {playerOneTurn, player1, player2, bananas} = this.state;

    let player
    
    if(playerOneTurn){
      player = player1
    } else {
      player = player2
    }

    if(matchFruit(i)){
      let fruit = bananas.slice();
      let bIndex = fruit.indexOf(i)
      fruit.splice(bIndex, 1);

      this.increaseScore(player.id) 
 
      this.setState({
        bananas: fruit
      });
 
    }

    if(playerOneTurn){
      this.setState({
        player1:{
          ...player1,
          currPoint: i
        }
      })
    } else {
      this.setState({
        player2:{
          ...player2,
          currPoint: i
        }
      })
    }
    this.updateTurnsLeft()
    this.checkGame()
    this.changeTurns(playerOneTurn)

    function matchFruit(index){
      if(bananas.includes(index)){
        return true;
      }
      return false;
    };
  }

  checkGame(){
    const {player1, player2, turnsLeft, bananas} = this.state

    let p1 = player1.points
    let p2 = player2.points

    if(turnsLeft <= 0 || bananas.length <= 0){

      if(p1 === p2){
        alert('Tie Game')
        return true
      }
      if(p1 > p2){
        alert('Player 1 Wins')
        return true
      }
      if(p1 < p2){
        alert('Player 2 Wins')
        return true
      }
    }
    return false;
  }

  updateTurnsLeft(){
    const {turnsLeft} = this.state
    let decreaseTurn = turnsLeft - 1

    this.setState({
      turnsLeft: decreaseTurn
    })
  }

  increaseScore(player){
    const {player1, player2} = this.state

    if(player === 1){
      let oneScore = player1.points++
      this.setState({
        player1:{
          ...player1,
          points: oneScore
        }
      })
    }

    if(player === 2){
      let secondScore = player2.points++
      this.setState({
        player2:{
          ...player2,
          points: secondScore
        }
      })
    }   
  }

  changeTurns(i){
    let turn
    if(i === true){
      turn = false
    } else {
      turn = true
    }
    this.setState({
      playerOneTurn: turn
    })
  }

  renderRow(r){
    const {player1, player2, col, bananas} = this.state
    let eachCol = []

    function matchFruit(index){
      if(bananas.includes(index)){
        return true;
      }
      return false;
    };

    for(let j=0; j<col; j++){
      const index = j+ (r*col);
      let val

      if(index === player1.currPoint){
        val = player1.name
      } 
      else if(index === player2.currPoint){
        val = player2.name
      }
      else if(matchFruit(index)){
        val = 'B'
      }
      else {
        val = null
      }
      eachCol.push(<Box value={val} id={j} key={index} />);
    }

    return eachCol;
  }


  renderBoard(){
    const { row } = this.state
    let boxes = []

    for(let i=0; i<row; i++){
      boxes.push((
        <div className='row' key={i}>
          {this.renderRow(i)}
        </div>
      ))  
    }

    return (
      <div className='gameBoard'> {boxes} </div> 
    );
  }

  arrowKey(e){
    if(this.checkGame() === true){
      return
    }

    const {player1, player2, col, row, playerOneTurn} = this.state;
    
      let newSpot
      let player

      if(playerOneTurn){
        player = player1
      } else {
        player = player2
      }

      if(player.currPoint === ((row*col)-1) && (e.keyCode === 39 || e.keyCode === 40)){
        return}
      if(player.currPoint === (col-1) && (e.keyCode === 38 || e.keyCode === 39)){
        return}
      if(player.currPoint === ((col*row)-col) && (e.keyCode === 37 || e.keyCode === 40)){
        return}
      if(player.currPoint%col === 0 && e.keyCode === 37){
        return}
      if((player.currPoint+1)%col === 0 && e.keyCode === 39){
        return}
      if(player.currPoint < col && e.keyCode === 38){
        return}
      if(player.currPoint > ((col*row)-col) && e.keyCode === 40){
        return}

      switch(e.keyCode){
        case 37:
          newSpot = player.currPoint - 1
          break;
        case 39:
          newSpot = player.currPoint + 1
          break;
        case 38:
          newSpot = player.currPoint - col
          break;
        case 40:
          newSpot = player.currPoint + col
          break;
        default:
          return;
      }

      this.handleMove(newSpot)
  }

  turns(){
    const {playerOneTurn} = this.state
    if(playerOneTurn){
      return 'Player1'
    } else {
      return 'Player2'
    }
  }

  render() {
    const {player1, player2, turnsLeft} = this.state
    
    return (
      <div className='gamePage'>
        <div className='score'>
          <div className='score'>Player1: {player1.points}</div>
          <div className='score'>Player2: {player2.points}</div>
        </div>
        <div className='score'>
          <div className='score'>Turn: {this.turns()}</div>
          <div className='score'>Moves left: {turnsLeft}</div>
        </div>
        <div>
          <button onClick={()=> window.location.reload()}>New Game</button>
        </div>
          {this.renderBoard()}
        </div>
    )
  }
}

