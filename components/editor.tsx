'use client'

import { useState } from 'react';
import { ChromePicker } from 'react-color';
import Select from 'react-select';

const fontStyles = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  // Add more fonts as needed
];

const TextEditor = () => {
  const [text, setText] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedFontStyle, setSelectedFontStyle] = useState(fontStyles[0]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
  };

  const handleTextColorChange = (color: any) => {
    setTextColor(color.hex);
  };

  const handleColorPickerClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleFontStyleChange = (selectedOption: any) => {
    setSelectedFontStyle(selectedOption);
  };

  return (
    <div className="p-4">
      <div className="space-x-2 bg-white mb-2 flex flex-row sticky top-0">
        <button
          className={`font-bold ${isBold ? 'bg-gray-300' : ''}`}
          onClick={handleBoldClick}
        >
          B
        </button>
        <button
          className={`italic ${isItalic ? 'bg-gray-300' : ''}`}
          onClick={handleItalicClick}
        >
          I
        </button>
        <button
          className={`underline ${isUnderline ? 'bg-gray-300' : ''}`}
          onClick={handleUnderlineClick}
        >
          U
        </button>
        <button onClick={handleColorPickerClick}>Color</button>
        {showColorPicker && (
          <ChromePicker color={textColor} onChange={handleTextColorChange} />
        )}

        <Select
          value={selectedFontStyle}
          options={fontStyles}
          onChange={handleFontStyleChange}
          styles={{
            control: (provided) => ({
              ...provided,
              minWidth: '100px',
              maxWidth : '150px'
            }),
          }}
        />
      </div>
      <textarea
        className={`w-full p-2 border h-screen border-gray-300 rounded-lg focus:outline-none resize-none ${
          isBold ? 'font-bold' : ''
        } ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
        style={{
          color: textColor,
          fontFamily: selectedFontStyle.value,
        }}
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextEditor;
