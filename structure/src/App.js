import React, { useState } from 'react';
import FolderStructure from './folderstructure';

const App = () => {
  const [data, setData] = useState({
    Documents: ['Document1.jpg', 'Document2.jpg', 'Document3.jpg'],
    Desktop: ['Screenshot1.jpg', 'videopal.mp4'],
    Downloads: {
      Drivers: ['Printerdriver.dmg', 'cameradriver.dmg'],
    },
    Applications: ['Webstorm.dmg', 'Pycharm.dmg', 'FileZilla.dmg', 'Mattermost.dmg', 'chromedriver.dmg'],
  });

  // Function to add a folder or file
  const addItem = (parent, type) => {
    const newItem = prompt(`Enter new ${type} name:`);
    if (!newItem) return;

    const newData = { ...data };

    if (type === 'file') {
      if (Array.isArray(newData[parent])) {
        newData[parent].push(newItem);
      } else {
        newData[parent] = [newItem];
      }
    } else if (type === 'folder') {
      if (Array.isArray(newData[parent])) {
        newData[parent].push({ name: newItem, children: [] });
      } else {
        newData[parent] = { name: newItem, children: [] };
      }
    }

    setData(newData);
  };

  // Function to delete a file or folder
  const deleteItem = (item) => {
    const newData = { ...data };
    const deleteRecursively = (data, key) => {
      for (let [folder, content] of Object.entries(data)) {
        if (folder === key) {
          return null;
        }
        if (Array.isArray(content)) {
          data[folder] = content.filter(file => file !== key);
        }
        if (typeof content === 'object') {
          deleteRecursively(content, key);
        }
      }
    };
    deleteRecursively(newData, item);
    setData(newData);
  };

  return (
    <div>
      <FolderStructure 
        data={data} 
        addItem={addItem} 
        deleteItem={deleteItem} 
      />
    </div>
  );
};

export default App;
