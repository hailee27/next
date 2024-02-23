/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';

// handle them correctly

export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'color',
  'code-block',
];

// Quill Toolbar component
const QuillToolbar = () => (
  <div id="toolbar">
    <div className="w-full overflow-x-auto overflow-y-hidden flex">
      <span className="ql-formats">
        <button className="ql-undo" />
      </span>
      <span className="ql-formats">
        <button className="ql-redo" />
      </span>
      <span className="ql-formats">
        <select className="ql-header" defaultValue="4">
          <option value="1">Heading L</option>
          <option value="2">Heading M</option>
          <option value="3">Heading S</option>
          <option value="4">Normal Text</option>
        </select>
      </span>
      <span className="ql-formats !flex !items-center !justify-center">
        <select className="ql-align" />
        {/* <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 11.0008L3 6.00078L3.7 5.30078L8 9.60078L12.3 5.30078L13 6.00078L8 11.0008Z" fill="#212529" />
      </svg> */}
      </span>
      <span className="ql-formats !flex !items-center !justify-center">
        <select className="ql-color  " />
        <div className="ql-color">
          {/* <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11.0008L3 6.00078L3.7 5.30078L8 9.60078L12.3 5.30078L13 6.00078L8 11.0008Z" fill="#212529" />
        </svg> */}
        </div>
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="bullet" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
      </span>
      <span className="ql-formats">
        <button className="ql-italic" />
      </span>
      <span className="ql-formats">
        <button className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
      </span>
      <span className="ql-formats">
        <button className="ql-image" />
      </span>
      <span className="ql-formats">
        <button className="ql-blockquote" />
      </span>
    </div>
  </div>
);
export default QuillToolbar;
