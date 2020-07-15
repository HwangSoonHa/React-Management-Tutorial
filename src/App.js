import React from 'react';
import Customer from './components/Customer'
import './App.css';

const customers = [
  {
    id:1,
    image:'https://placeimg.com/64/64/any',
    name:'홍길동',
    birthday:'920202',
    gender:'남자',
    job:'대학생'
  },
  {
    id:2,
    image:'https://placeimg.com/64/64/any',
    name:'서예지',
    birthday:'985874',
    gender:'여자',
    job:'프로그래머'
  },
  {
    id:3,
    image:'https://placeimg.com/64/64/any',
    name:'유재석',
    birthday:'201010',
    gender:'남자',
    job:'의사'
  }
]

function App() {
  return (
    <div>
      {customers.map(c => {
        return (
          <Customer 
            key = {c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            birthday = {c.birthday}
            gender = {c.gender}
            job={c.job}
          />
        );
      })}
    </div>
    
  );
}

export default App;
