'use client'

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";
import { chain } from "../chain";
import QRCode from "qrcode.react";

export default function MiQR() {
    const address = useActiveAccount();

    return (
        <div>
            <ConnectButton
                client={client}
                chain={chain}
            />
            <QRCode value={address?.address}/>
            <h2>{address?.address}</h2>
        </div>
    )
}