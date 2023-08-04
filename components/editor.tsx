'use client'
import { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { database } from '../src/firebase'; // Import the Firebase database
import { get, ref, onValue, set } from 'firebase/database';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
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
