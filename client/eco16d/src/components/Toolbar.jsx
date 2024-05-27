import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

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

function Toolbar() {
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (wrapperRef.current == null) return;

        wrapperRef.current.innerHTML = "";

        const editor = document.createElement('div');
        wrapperRef.current.appendChild(editor);

        new Quill(editor, { 
            modules: {
                toolbar: toolbarOptions
            },
            theme: "bubble",
         });
    }, []);

    return (
        <div id="container" ref={wrapperRef}></div>
    );
}

export default Toolbar;
