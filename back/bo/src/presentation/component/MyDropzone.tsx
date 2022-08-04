/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import Carousel from './Carousel/index.web';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export const MyDropzone = ({ setFile, file, name, keyName }: any) => {
  const onDrop = (acceptedFiles) => setFile(acceptedFiles, keyName);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: 'image/*', onDrop });

  const style = React.useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
  ]);

  console.log(Array.isArray(file));

  return (
    <div className="container">
      {/* @ts-ignore */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {
          Array.isArray(file) ? (
            <Carousel listItem={file.map((url) => ({
              imageUrl: url,
              nom: 'nom',
              description: 'description',
            }))}
            />
          ) : file && file.length > 10
            // eslint-disable-next-line jsx-a11y/alt-text
            ? (
              <Carousel listItem={[{
                imageUrl: file,
                nom: 'nom',
                description: 'description',
              }]}
              />
            )
            // eslint-disable-next-line react/no-unescaped-entities
            : <p>{name || "Drag 'n' drop some files here, or click to select files"}</p>
}
      </div>
    </div>
  );
};
