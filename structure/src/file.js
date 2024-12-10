import React from 'react';

const File = ({ name, onEdit, onDelete }) => {
  return (
    <div>
      <span>{name}</span>
      <button onClick={onEdit}>Edit File</button>
      <button onClick={onDelete}>Delete File</button>
    </div>
  );
};

export default File;