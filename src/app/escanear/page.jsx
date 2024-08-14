'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Escanear() {
    const [ wallet, setWallet ] = useState('')

    const scannerRef = useRef(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "qr-reader", 
            { fps: 10, qrbox: 250 }
        );

        scanner.render(onScanSuccess, onScanError);

        function onScanSuccess(decodedText) {
            console.log(`Código QR escaneado: ${decodedText}`);
            setWallet(decodedText)
        }

        function onScanError(errorMessage) {
            console.error("Error en el escaneo: ", errorMessage);
        }

        return () => {
            scanner.clear().catch(error => {
                console.error("Error limpiando el escáner: ", error);
            });
        };
    }, []);

    return (
        <>
            <div id="qr-reader" ref={scannerRef}></div>
            {wallet && <h2>{wallet}</h2>}
        </>
    )
}
