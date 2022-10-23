import React, { useState } from 'react';
import {Input, Button} from 'reactstrap';

export const EncryptPage = () => {
    const [file, setFile] = useState<{}>();
    const [publicKey, setPublicKey] = useState<string>('');

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFile(e.target.files![0])
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPublicKey(e.target.value)
    }

    return (
        <div style={{width: '80%', backgroundColor: 'gray', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', padding: '20px'}}>
            <h3>UPLOAD A FILE TO ENCRYPT USING PUBLIC KEY</h3>
            <Input onChange={handleFileSelect} type="file" />
            <Input style={{marginTop: '5px'}} onChange={handleTextChange} type='text' placeholder='Enter public key' />
            <Button style={{marginTop: '15px'}} color='primary' disabled={!file || !publicKey}>Encrypt</Button>
        </div>
    )
}