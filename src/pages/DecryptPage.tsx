import React, { useState } from 'react';
import {Input, Button} from 'reactstrap';

export const DecryptPage = () =>{
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<String>();
    const [fileUploading, setFileUploading] = useState<boolean>(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const uploadedFile = e.target.files![0]
        setFile(uploadedFile);
    }

    const handleDownloadEncrypt = () => {
        fetch(`http://147.175.121.185/downloadFile/decrypted_${fileName}`)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const name = fileName?.replace('.txt', '');
            link.setAttribute('download', `decrypted_${fileName}`);
            document.body.appendChild(link);
            link.click();
        })
        .catch(() => console.log("oh no!"));
    }

    const handleEncrypt = () => {
        const name = file!.name.replace('encrypted_', '');
        setFileName(name);
        setFileUploading(true);
        const bodyFormData = new FormData();
        bodyFormData.append('file', file!, file!.name);
        const requestOptions = {
            method: 'POST',
            body: bodyFormData,
            mode: 'no-cors' as RequestMode,
          };
          
          fetch("http://147.175.121.185/upload", requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result); setFileUploading(false)})
            .catch(error => console.log('error', error));
    }

    return (
        <div style={{width: '80%', backgroundColor: 'gray', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', padding: '20px'}}>
            <h3>UPLOAD A FILE TO DECRYPT</h3>
            <Input onChange={handleFileSelect} type="file" style={{marginBottom: '15px'}}/>
            <Button style={{marginRight: '10px'}} color='primary' disabled={!file} onClick={handleEncrypt} >Decrypt</Button>
            <Button style={{marginRight: '10px'}} onClick={handleDownloadEncrypt} disabled={!fileName} >Download Decrypted File</Button>
        </div>
    )
}