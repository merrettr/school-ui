import React from 'react';
import Dropzone from 'react-dropzone';

export default ({ onFileSelect }) =>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <Dropzone
      onDrop={files => onFileSelect(files[0])}
      multiple={false}
      style={{
        width: '80%',
        height: '5em',
        borderWidth: '2px',
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>Drop a file or click here to select a file</div>
    </Dropzone>
</div>;