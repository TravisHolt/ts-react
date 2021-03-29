import React, { useState } from 'react';

interface HeaderProps {
  buttonText?: string;
};

interface Movie {
  title: string;
  date: string;
  rating: string;
  description: string;
}

type AddCount = (x: number) => void;

type Test = (x: string[], y: string) => string[];

const Header = ({ buttonText }: HeaderProps) => {
  const [count, setCount] = useState<number>(0);
  const [movies, moviesSet] = useState<Movie | null>(null);

  const strings: string[] = ['this', 'is', 'a', 'test'];
  const newString: string = 'test';

  const test: Test = (a, b) => {
    const x = a.map(s => s + ' ' + b);
    return x;
  }

  console.log(test(strings, newString));

  const addCount: AddCount = (x) => {
    setCount(count + x);
  }

  return (
    <div>
      <h1> Header </h1>
      <button onClick={() => setCount(c => c + 1)}>{buttonText}</button>
      <div>{count}</div>
    </div>
  );
};

export default Header;


interface TSObj {
  first_name: string;
}


const tsObj: TSObj = {
  first_name: 'Travis'
};

console.log(tsObj.first_name);



function Testicle(a: number) {};