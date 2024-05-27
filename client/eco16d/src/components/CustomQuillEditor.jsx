import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const CustomQuillEditor = (props) => {
    const [quill, setQuill] = useState(null);
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (!quill) {
            const editor = new Quill(textAreaRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                }
            });
            editor.on('text-change', () => {
                props.onValueChange(editor.root.innerHTML);
            });
            setQuill(editor);
        }
    }, [quill, props]);

    useEffect(() => {
        if (quill) {
            quill.root.innerHTML = props.value;
        }
    }, [props.value, quill]);

    return (
        <div ref={textAreaRef} style={{ display: props.isEditing ? 'block' : 'none', width: '100%', height: '100%' }} />
    );
};

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }], 
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']
];

export default CustomQuillEditor;
