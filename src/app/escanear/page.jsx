'use client';

import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';

export default function Escanear() {
    const [wallet, setWallet] = useState('');
    const videoRef = useRef(null);
    const [scanQr, setScanQr] = useState(false);

    useEffect(() => {
        let qrScanner;

        const initializeScanner = async () => {
            if (videoRef.current) {
                const cameras = await QrScanner.listCameras(); // List available cameras
                const rearCamera = cameras.find(camera => camera.label.toLowerCase().includes('back') || camera.label.toLowerCase().includes('rear'));

                qrScanner = new QrScanner(
                    videoRef.current,
                    result => handleScanSuccess(result),
                    {
                        onDecodeError: handleScanError,
                        highlightScanRegion: true,
                        highlightCodeOutline: true,
                        preferredCamera: rearCamera?.id // Use the rear camera if available
                    }
                );
                console.log(rearCamera);
                if (rearCamera) {
                    qrScanner.start();
                } else {
                    console.error("No rear camera found, using default camera");
                    qrScanner.start();
                }
            }
        };

        if (scanQr) {
            initializeScanner();
        }

        return () => {
            if (qrScanner) {
                qrScanner.stop();
            }
        };
    }, [scanQr]);

    const handleScanSuccess = (decodedText) => {
        console.log(`Código QR escaneado: ${decodedText}`);
        setWallet(decodedText);
        setScanQr(false); // Cerrar el scanner después de escanear
    };

    const handleScanError = (errorMessage) => {
        console.error("Error en el escaneo: ", errorMessage);
    };

    return (
        <VStack spacing={4} align="center" pt={10} bg={'#000012'} minH={'full'}>
            <Button onClick={() => setScanQr(true)} colorScheme="teal" size="lg">
                Escanear usuario
            </Button>
            {scanQr && (
                <Box w="100%" maxW="600px">
                    <video ref={videoRef} style={{ width: '100%', borderRadius: '8px' }}></video>
                </Box>
            )}
            {wallet && (
                <Heading size="md" mt={4}>
                    Wallet escaneada: {wallet}
                </Heading>
            )}
        </VStack>
    );
}
