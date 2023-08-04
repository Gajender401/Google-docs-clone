'use client'
import { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { database } from '../src/firebase'; 
import { get, ref, onValue, set } from 'firebase/database';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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

const Editor = ({ id }: { id: string }) => {
  const [quill, setQuill] = useState<Quill | null>(null);
  const docRef = ref(database, `documents/${id}/content`);

  useEffect(() => {
    const quillServer = new Quill('#container', {
      theme: 'snow',
      modules: { toolbar: toolbarOptions },
    });
    quillServer.disable();
    quillServer.setText('Loading the document...');
    setQuill(quillServer);
  }, []);

  useEffect(() => {
    onValue(docRef, (snapshot) => {
      const document = snapshot.val();
      quill?.setContents(document);
      quill?.enable();
    });
  }, [quill, docRef]);

  useEffect(() => {
    if (quill === null) return;

    const handleChange = (delta: Quill.Delta, oldData: Quill.Delta, source: string) => {
      if (source !== 'user') return;

      set(docRef, quill.getContents());
    };

    quill?.on('text-change', handleChange);

    return () => {
      quill?.off('text-change', handleChange);
    };
  }, [quill, docRef]);

  
  return (
    <div>
      <div className="container" id="container"></div>
    </div>
  );
};

export default Editor;
