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
    <span className="ql-formats flex space-x-[14px] pl-[14px]">
      <button className="ql-undo" />
      <button className="ql-redo" />
      <select className="ql-header" defaultValue="4">
        <option value="1">Heading L</option>
        <option value="2">Heading M</option>
        <option value="3">Heading S</option>
        <option value="4">Normal Text</option>
      </select>
      <select className="ql-align" />
      <select className="ql-color" />
      <button className="ql-list" value="bullet" />
      <button className="ql-list" value="ordered" />
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-clean" />
    </span>
  </div>
);
export default QuillToolbar;
