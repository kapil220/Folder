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

  const editItem = (parent, item, type) => {
    const newName = prompt(`Enter new ${type} name:`, item);
    if (!newName) return;

    const newData = { ...data };
    if (type === 'file') {
      if (Array.isArray(newData[parent])) {
        const index = newData[parent].indexOf(item);
        newData[parent][index] = newName;
      }
    } else if (type === 'folder') {
      if (typeof newData[parent] === 'object') {
        const index = newData[parent].findIndex(folder => folder.name === item);
        newData[parent][index].name = newName;
      } else {
        newData[parent] = { name: newName, children: [] };
      }
    }

    setData(newData);
  };

  return (
    <div>
      <FolderStructure
        data={data}
        addItem={addItem}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
};

export default App;