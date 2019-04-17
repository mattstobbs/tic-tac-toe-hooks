import React, { useState } from 'react';

const Square = () => {
  const [value, setValue] = useState(null);

  return (
    <button
      className="square"
      onClick={() => setValue('X')}
    >
      {value}
    </button>
  );
};

export default Square;
