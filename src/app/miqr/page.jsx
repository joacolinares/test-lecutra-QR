'use client'

import { useActiveAccount } from "thirdweb/react";
import QRCode from "qrcode.react";
import { Container } from "@chakra-ui/react";

export default function MiQR() {
    const address = useActiveAccount();

    return (
        <Container centerContent bg={'#000012'} minW={'full'} minH={'full'} pt={20}>
            <QRCode 
                value={address?.address} 
                size={256}
                level={"H"}
                includeMargin={true}
            />
        </Container>
    )
}
