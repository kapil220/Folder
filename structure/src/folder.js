import React, { useState } from 'react';
import File from './file';
const Folder = ({ name, data, onAddItem, onDeleteItem, onEditItem }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFolder = () => {
        setIsOpen((prevState) => !prevState);
    };
    const handleAddClick = (type) => {
        const itemName = window.prompt(`Enter ${type} name:`);
        if (itemName) {
            onAddItem([], type, itemName);
        }
    };
    const handleEditClick = () => {
        const newName = window.prompt('Enter new folder name:', name);
        if (newName && newName !== name) {
            onEditItem([], name, 'folder', newName);
        }
    };
    return (
        <div>
            <div>
                <span onClick={toggleFolder} style={{ cursor: 'pointer' }}>
                    {isOpen ? '[-]' : '[+]'} {name}
                </span>
                <button onClick={() => handleAddClick('folder')}>+ Add Folder</button>
                <button onClick={() => handleAddClick('file')}>+ Add File</button>
                <button onClick={handleEditClick}>Edit Folder</button>
                <button onClick={() => onDeleteItem([])}>Delete Folder</button>
            </div>
            {isOpen && (
                <div style={{ paddingLeft: '20px' }}>
                    {Object.keys(data.folders)
                        .sort()
                        .map((folderName) => (
                            <Folder
                                key={folderName}
                                name={folderName}
                                data={data.folders[folderName]}
                                onAddItem={(path, type, name) => onAddItem([folderName, ...path], type, name)}
                                onDeleteItem={(path) => onDeleteItem([folderName, ...path])}
                                onEditItem={(path, oldName, type, newName) => onEditItem([folderName, ...path], oldName, type, newName)}
                            />
                        ))}
                    {data.files
                        .sort()
                        .map((file) => (
                            <File
                                key={file}
                                name={file}
                                onEdit={(path, oldName, type, newName) => onEditItem([...path], file, 'file', newName)}
                                onDelete={() => onDeleteItem([file])}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};
export default Folder;
