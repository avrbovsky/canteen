import React, { useState } from 'react';
import {Input, Button} from 'reactstrap';

export const HomePage = () =>{
    const [file, setFile] = useState<string | undefined>('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target!.result)
            setFile(text?.toString());
        };
        reader.readAsText(e.target.files![0])
    }

    const handleEncrypt = () => {
        const encodedFile = Buffer.from(file!).toString('base64');
        console.log(encodedFile)
    }

    return (
        <div style={{width: '80%', backgroundColor: 'gray', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', padding: '20px'}}>
            <h3>UPLOAD A FILE TO ENCRYPT</h3>
            <Input onChange={handleFileSelect} type="file" />
            <Button style={{marginTop: '15px'}} color='primary' disabled={!file} onClick={handleEncrypt} >Encrypt</Button>
        </div>
    )
}