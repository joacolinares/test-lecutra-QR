'use client';

import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

export default function Escanear() {
    const [wallet, setWallet] = useState('');
    const videoRef = useRef(null);
    const [scanQr, setScanQr] = useState(false)
    useEffect(() => {
        const initializeScanner = async () => {
            if (videoRef.current) {
                const cameras = await QrScanner.listCameras(); // List available cameras
                const rearCamera = cameras.find(camera => camera.label.toLowerCase().includes('back') || camera.label.toLowerCase().includes('rear'));

                const qrScanner = new QrScanner(
                    videoRef.current,
                    result => handleScanSuccess(result),
                    {
                        onDecodeError: handleScanError,
                        highlightScanRegion: true,
                        highlightCodeOutline: true,
                        preferredCamera: rearCamera?.id // Use the rear camera if available
                    }
                );
                console.log(rearCamera)
                if (rearCamera) {
                    qrScanner.start();
                } else {
                    console.error("No rear camera found, using default camera");
                    qrScanner.start();
                }

                return () => {
                    qrScanner.stop();
                };
            }
        };

        initializeScanner();
    }, []);

    const handleScanSuccess = (decodedText) => {
        console.log(`Código QR escaneado: ${decodedText.data}`);
        console.log(decodedText.data)
        setWallet(decodedText);
    };

    const handleScanError = (errorMessage) => {
        console.error("Error en el escaneo: ", errorMessage);
    };

    return (
        <div>
             {/*   <button onClick={() => {setScanQr(true)
                    console.log("Abriendo camara...")
                }}>Scanear usuario</button>
            
            {scanQr ?
            <>
                <video ref={videoRef} style={{ width: '100%' }}></video>
                {wallet && <h2>{wallet.data}</h2>}
            </>: <></>}*/}
           
            <video ref={videoRef} style={{ width: '100%' }}></video>
            {wallet && <h2>{wallet.data}</h2>}
 
        </div>
    );
}
