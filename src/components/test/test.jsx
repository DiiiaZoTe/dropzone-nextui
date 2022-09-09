import React, { useEffect, useState } from 'react';
import { styled } from '@nextui-org/react'
import { useDropzone } from 'react-dropzone';

const ThumbsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px'
});

const Thumb = styled('div', {
  display: 'flex',
  borderRadius: '16px',
  marginBottom: '8px',
  marginRight: '8px',
  width: '100px',
  height: '100px',
  shadow: '$md',
  backgroundColor: '$background',
});


const Img = styled('img', {
  display: 'block',
  borderRadius: '16px',
  width: '100%',
  height: '100%',
  objectPosition: 'center',
  objectFit: 'cover',
});


export default function Previews(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <Img
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
      />
    </Thumb>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <ThumbsContainer>
        {thumbs}
      </ThumbsContainer>
    </section>
  );
}

<Previews />