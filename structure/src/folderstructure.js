import React from 'react';
import Folder from './folder';

const FolderStructure = ({ data, addItem, deleteItem, editItem }) => {
  const renderFolders = (folderData, depth = 0) => {
    return Object.entries(folderData).map(([folderName, folderContent], index) => (
      <Folder
        key={index}
        name={folderName}
        children={Array.isArray(folderContent)
          ? folderContent
          : Object.entries(folderContent).map(([subfolder, files]) => ({
              name: subfolder,
              children: files,
            }))}
        depth={depth}
        onAddItem={addItem}
        onDeleteItem={deleteItem}
        onEditItem={editItem}
      />
    ));
  };

  return (
    <div>
      {renderFolders(data)}
    </div>
  );
};

export default FolderStructure;