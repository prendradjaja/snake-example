import { useState } from 'react'

const height = 10;
const width = 20;

type CellState = 'empty' | 'snake' | 'fruit';
interface Position {
  r: number;
  c: number;
}
interface Direction {
  r: number;
  c: number;
}
type Snake = Position[];

function App() {
  const [count, setCount] = useState(0)
  const [snake, setSnake] = useState<Snake>(
    [
      { r: 3, c: 3 },
      { r: 4, c: 3 },
      { r: 5, c: 3 },
      { r: 6, c: 3 },
      { r: 7, c: 3 },
      { r: 8, c: 3 },
    ]
  );

  // state - snake - Position[] <-- last element is head
  // state - fruit - Position

  const board = makeBoard(
    snake,
    { r: 5, c: 8 },
  );

  function handleUp() {
    move({ r: -1, c: 0 });
  }

  function handleDown() {
    move({ r: 1, c: 0 });
  }

  function handleLeft() {
    move({ r: 0, c: -1 });
  }

  function handleRight() {
    move({ r: 0, c: 1 });
  }

  function move(direction: Direction) {
    const head = snake.at(-1)!;
    const newHead = addVectors(head, direction);

    const prev = snake.at(-2)!;
    if (vectorEquals(prev, newHead)) {
      return; // Can't go backwards
    }

    if (snake.find(snakePos => vectorEquals(snakePos, newHead))) {
      console.log('you lose');
      return;
    }

    setSnake([...snake.slice(1), newHead]);
  }

  // function snakeHas

  return (
    <>
      <div className="board">
        {
          board.map((row, r) =>
            <div key={r} className="row">
              {
                row.map((cell, c) =>
                  <div
                    key={c}
                    className={'cell ' + cell}
                  >
                  </div>
                )
              }
            </div>
          )
        }
      </div>
      <div>
        <button onClick={handleUp}>Up</button>
        <button onClick={handleDown}>Down</button>
        <button onClick={handleLeft}>Left</button>
        <button onClick={handleRight}>Right</button>
      </div>
    </>
  )
}

function makeBoard(snake: Position[], fruit: Position): CellState[][] {
  const result: CellState[][] = [];
  for (let r = 0; r < height; r++) {
    const row: CellState[] = [];
    result.push(row);
    for (let c = 0; c < width; c++) {
      row.push('empty');
    }
  }

  for (const pos of snake) {
    result[pos.r][pos.c] = 'snake';
  }

  result[fruit.r][fruit.c] = 'fruit';

  return result;
}

function addVectors(position: Position, direction: Direction): Position {
  return {
    r: position.r + direction.r,
    c: position.c + direction.c,
  };
}

function vectorEquals(v1: Position, v2: Position): boolean {
  return v1.r === v2.r && v1.c === v2.c;
}

export default App
