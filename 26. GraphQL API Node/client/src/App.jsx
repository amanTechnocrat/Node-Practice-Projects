// import { useState } from 'react'
// import './App.css'
// import { gql, useQuery } from '@apollo/client'

// const query = gql`query ExampleQuery {
//   getTodos {
//     id
//   }
// }`

// function App() {
//   const { data, loading } = useQuery(query)

//   if(loading) return <h1>loading...</h1>

//   return (
//     <div>
//       {JSON.stringify(data)}
//     </div>
//   )
// }

// export default App

// WindowSelector.js
// WindowSelector.js
// WindowSelector.js
import React, { useState } from 'react';
import styled from 'styled-components';

const WindowContainer = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  border: 2px solid #333;
  overflow: hidden;
`;

const Selector = styled.div`
  position: absolute;
  border: 2px dashed #555;
  background-color: red;
  pointer-events: none; /* Allows the selector to ignore pointer events and not interfere with mouse events on the container */
`;

const WindowSelector = () => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ top: 0, left: 0 });
  const [currentPosition, setCurrentPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    setIsSelecting(true);
    setInitialPosition({
      top: e.clientY,
      left: e.clientX,
    });
  };

  const handleMouseMove = (e) => {
    if (isSelecting) {
      const top = Math.min(e.clientY, initialPosition.top);
      const left = Math.min(e.clientX, initialPosition.left);
      const height = Math.abs(e.clientY - initialPosition.top);
      const width = Math.abs(e.clientX - initialPosition.left);

      setCurrentPosition({ top, left, height, width });
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  return (
    <WindowContainer onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {isSelecting && (
        <Selector
          style={{
            top: currentPosition.top,
            left: currentPosition.left,
            height: currentPosition.height,
            width: currentPosition.width,
          }}
        />
      )}
    </WindowContainer>
  );
};

export default WindowSelector;






