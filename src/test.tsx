import React, { useState } from 'react';

interface Layout {
  id?: string | number;
  test: string;
}

function saveLayout(a: Layout): void { throw new Error('this should post layout to db')};

const LayoutWidget = () => {
  const [layout, setLayout]= useState<Layout>({ id: 1 ,test: '' });

  return (
    <button onClick={() => saveLayout(layout)}> Submit </button>
  )
}

