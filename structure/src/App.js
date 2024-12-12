import React, { useState } from 'react';
import FolderStructure from './folderstructure';
const App = () => {
    const [data, setData] = useState({
        Documents: {
            files: ['Document1.jpg', 'Document2.jpg', 'Document3.jpg'],
            folders: {}
        },
        Desktop: {
            files: ['Screenshot1.jpg', 'videopal.mp4'],
            folders: {}
        },
        Downloads: {
            files: [],
            folders: {
                Drivers: {
                    files: ['Printerdriver.dmg', 'cameradriver.dmg'],
                    folders: {}
                }
            }
        },
        Applications: {
            files: ['Webstorm.dmg', 'Pycharm.dmg', 'FileZilla.dmg', 'Mattermost.dmg', 'chromedriver.dmg'],
            folders: {}
        }
    });
    const addItem = (path, type, name) => {
        const updateData = (currentData, currentPath) => {
            const newData = JSON.parse(JSON.stringify(currentData));
            let current = newData;
            for (let i = 0; i < currentPath.length; i++) {
                const segment = currentPath[i];
                if (!current[segment]) {
                    current[segment] = { files: [], folders: {} };
                }
                if (i === currentPath.length - 1) {
                    if (type === 'file') {
                        if (!current[segment].files.includes(name)) {
                            current[segment].files.push(name);
                        }
                    } else if (type === 'folder') {
                        if (!current[segment].folders[name]) {
                            current[segment].folders[name] = { files: [], folders: {} };
                        }
                    }
                    break;
                }
                current = current[segment].folders;
            }
            return newData;
        };
        setData(prevData => updateData(prevData, path));
    };
    const deleteItem = (path) => {
        const updateData = (currentData, currentPath) => {
            const newData = JSON.parse(JSON.stringify(currentData));
            let current = newData;
            if (currentPath.length === 0) return newData;
            for (let i = 0; i < currentPath.length - 1; i++) {
                if (!current[currentPath[i]]) return newData;
                current = current[currentPath[i]].folders;
            }
            const itemToDelete = currentPath[currentPath.length - 1];
            if (currentPath.length === 1) {
                delete newData[itemToDelete];
                return newData;
            }
            const parentFolder = current;
            if (parentFolder.files) {
                const fileIndex = parentFolder.files.indexOf(itemToDelete);
                if (fileIndex !== -1) {
                    parentFolder.files.splice(fileIndex, 1);
                    return newData;
                }
            }
            if (parentFolder.folders && parentFolder.folders[itemToDelete]) {
                delete parentFolder.folders[itemToDelete];
            }
            return newData;
        };
        setData(prevData => updateData(prevData, path));
    };
    const editItem = (path, oldName, type, newName) => {
        const updateData = (currentData, currentPath) => {
            const newData = JSON.parse(JSON.stringify(currentData));
            let current = newData;
            for (let i = 0; i < currentPath.length - 1; i++) {
                current = current[currentPath[i]].folders;
            }
            const lastSegment = currentPath[currentPath.length - 1];
            if (type === 'file') {
                const fileIndex = current[lastSegment].files.indexOf(oldName);
                if (fileIndex !== -1) {
                    current[lastSegment].files[fileIndex] = newName;
                }
            } else if (type === 'folder') {
                current[newName] = current[lastSegment];
                delete current[lastSegment];
            }
            return newData;
        };
        setData(prevData => updateData(prevData, path));
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