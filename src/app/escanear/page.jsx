'use client';

import { useState } from "react";
import dynamic from 'next/dynamic';

const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function Escanear() {
    const [wallet, setWallet] = useState('');
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleScan = (data) => {
        if (data) {
            setWallet(data);
            setIsScannerOpen(false);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const openScanner = () => {
        setIsScannerOpen(true);
    };

    return (
        <div>
            <button onClick={openScanner}>Abrir Escáner</button>
            {isScannerOpen && (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '30%' }}
                    constraints={{
                        video: {
                            facingMode: { ideal: "environment" },
                        },
                    }}
                />
            )}
            {wallet && (
                <div>
                    <h2>Wallet: {wallet}</h2>
                </div>
            )}
        </div>
    );
}
