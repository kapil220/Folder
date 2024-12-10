import React, { useState } from 'react';
import File from './file';

const Folder = ({ name, children, depth, onAddItem, onDeleteItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div>
        <span onClick={toggleFolder} style={{ cursor: 'pointer' }}>
          {isOpen ? '[-]' : '[+]'} {name}
        </span>
        <button onClick={() => onAddItem(name, 'folder')}>+ Add Folder</button>
        <button onClick={() => onAddItem(name, 'file')}>+ Add File</button>
      </div>
      {isOpen && (
        <div>
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div key={index}>
                  {typeof child === 'string' ? (
                    <File name={child} onDeleteItem={onDeleteItem} />
                  ) : (
                    <Folder
                      name={child.name}
                      children={child.children}
                      depth={depth + 1}
                      onAddItem={onAddItem}
                      onDeleteItem={onDeleteItem}
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
