import React, { useState } from 'react';
import File from './file';

const Folder = ({ name, children, depth, onAddItem, onDeleteItem, onEditItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleEdit = () => {
    onEditItem(name, name, 'folder');
  };

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div>
        <span onClick={toggleFolder} style={{ cursor: 'pointer' }}>
          {isOpen ? '[-]' : '[+]'} {name}
        </span>
        <button onClick={() => onAddItem(name, 'folder')}>+ Add Folder</button>
        <button onClick={() => onAddItem(name, 'file')}>+ Add File</button>
        <button onClick={handleEdit}>Edit Folder</button>
        <button onClick={() => onDeleteItem(name)}>Delete Folder</button>
      </div>
      {isOpen && (
        <div>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div key={index}>
                  {typeof child === 'string' ? (
                    <File
                      name={child}
                      onEdit={() => onEditItem(name, child, 'file')}
                      onDelete={() => onDeleteItem(child)}
                    />
                  ) : (
                    <Folder
                      name={child.name}
                      children={child.children}
                      depth={depth + 1}
                      onAddItem={onAddItem}
                      onDeleteItem={onDeleteItem}
                      onEditItem={onEditItem}
                    />
                  )}
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Folder;