import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function UploadButton({ label, onChange, fileName, accept, required }) {
  return (
    <div>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <label className={`w-full flex items-center px-4 py-2 rounded-lg shadow-lg tracking-wide uppercase border cursor-pointer hover:bg-yellow-500 hover:text-white ${fileName ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 border-yellow-500'}`}>
        <CloudUploadIcon className="mr-2" />
        {fileName || 'Choose File'}
        <input
          type="file"
          onChange={onChange}
          className="hidden"
          accept={accept}
          required={required}
        />
      </label>
    </div>
  );
}

export default UploadButton;
