import React from 'react';
const File = ({ name, onEdit, onDelete }) => {
    const handleEdit = () => {
        const newName = window.prompt('Enter new file name:', name);
        if (newName && newName !== name) {
            onEdit([], name, 'file', newName);
        }
    };
    return (
        <div style={{ paddingLeft: '20px' }}>
            <span>{name}</span>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};
export default File;