import React from 'react';
import Folder from './folder';

const FolderStructure = ({ data, addItem, deleteItem, editItem }) => {
  return (
    <div>
      {Object.keys(data).map((key) => (
        <Folder
          key={key}
          name={key}
          data={data[key]}
          onAddItem={(path, type, name) => addItem([key, ...path], type, name)}
          onDeleteItem={(path) => deleteItem([key, ...path])}
          onEditItem={(path, oldName, type, newName) => editItem([key, ...path], oldName, type, newName)}
        />
      ))}
    </div>
  );
};

export default FolderStructure;