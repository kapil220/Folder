import React from 'react';

const File = ({ name, onDeleteItem }) => {
  return (
    <div>
      <span>{name}</span>
      <button onClick={() => onDeleteItem(name)}>Delete File</button>
    </div>
  );
};

export default File;