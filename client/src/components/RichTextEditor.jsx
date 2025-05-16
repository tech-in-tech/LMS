import React, { useRef } from 'react';

const RichTextEditor = ({ input, setInput }) => {
  const editorRef = useRef(null);

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleInput = (e) => {
    const html = e.currentTarget.innerHTML;
    setInput({ ...input, description: html });
  };

  const handleHeadingChange = (e) => {
    const tag = e.target.value;
    handleFormat('formatBlock', tag === 'normal' ? 'div' : tag);
  };


  return (
    <div className="w-full border border-gray-300 rounded">
      {/* Toolbar */}
      <div className="flex items-center p-1 bg-gray-100 border-b border-gray-300">
        {/* Format dropdown */}
        <select 
          className="mr-2 py-1 px-2 border border-gray-300 rounded bg-white text-sm"
          onChange={handleHeadingChange}
          defaultValue="normal"
        >
          <option value="normal">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="pre">Code</option>
          <option value="blockquote">Quote</option>
        </select>
        
        {/* Formatting buttons */}
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('bold')}
          title="Bold"
        >
          <span className="font-bold">B</span>
        </button>
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('italic')}
          title="Italic"
        >
          <span className="italic">I</span>
        </button>
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('underline')}
          title="Underline"
        >
          <span className="underline">U</span>
        </button>
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('strikethrough')}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>
        
        {/* Divider */}
        <div className="mx-2 h-6 border-l border-gray-300"></div>
        
        {/* List buttons */}
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('insertUnorderedList')}
          title="Bullet List"
        >
          <span className="text-lg">•</span>
        </button>
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('insertOrderedList')}
          title="Numbered List"
        >
          <span className="text-sm">1.</span>
        </button>
        
        {/* Alignment buttons */}
        <div className="mx-2 h-6 border-l border-gray-300"></div>
        <button 
          className="p-1 mx-1 border border-gray-300 rounded hover:bg-gray-200" 
          onClick={() => handleFormat('justifyLeft')}
          title="Align Left"
        >
          <span className="text-sm">⫶</span>
        </button>
      </div>
      
      {/* Editor area */}
      <div
        ref={editorRef}
        className="w-full p-2 min-h-32 focus:outline-none"
        contentEditable
        onInput={handleInput}
        placeholder="Start typing..."
      />
    </div>
  );
};

export default RichTextEditor;