'use client'

import { Box, Flex, Image, HStack, IconButton, useDisclosure, Stack, Text, Divider } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { client } from '../app/client';
import { chain } from '../app/chain'
import { ConnectButton, useActiveAccount } from 'thirdweb/react';

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const address = useActiveAccount();

    return (
      <>
        <Box py={5} px={5} as='nav' bg="#292782" fontWeight={'500'}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <HStack spacing={8} alignItems={'center'}>
                    <NextLink href='/' passHref>
                        {/*
                        <Image 
                            src={LOGO_RES.src}
                            alt='Steel Shock'
                            w='37px'
                            display={{ base: 'block', md: 'none' }}
                        />
                        */}
                    </NextLink>
                </HStack>
                <HStack
                    as={'nav'}
                    spacing={10}
                    display={{ base: 'none', md: 'flex' }}
                >
                    <NextLink href="/" passHref>
                        <Text color={'white'}>Comprar</Text>
                    </NextLink>
                    {address && (
                        <>
                            <NextLink href="/miqr" passHref>
                                <Text color={'white'}>Mi QR</Text>
                            </NextLink>
                            <NextLink href="/misentradas" passHref>
                                <Text color={'white'}>Mis Entradas</Text>
                            </NextLink>
                            <NextLink href="/escanear" passHref>
                                <Text color={'white'}>Escanear</Text>
                            </NextLink>
                        </>
                    )}                                         
                    <Flex display={{ base: 'none', md: 'flex' }} mx={2}>
                        <ConnectButton
                            client={client}
                            chain={chain}
                        >
                            Connectar
                        </ConnectButton>
                    </Flex>
                </HStack>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                    bg={'white'}
                    color={'black'}
                />
            </Flex>
                                 
          {isOpen ? (
            <Box display={{ md: 'none' }}>
                <Stack as={'nav'} spacing={10} textAlign={'center'}>
                    <NextLink href="/" passHref>
                        <Text color={'white'}>Entradas</Text>
                    </NextLink>
                    {address && (
                        <>
                            <NextLink href="/miqr" passHref>
                                <Text color={'white'}>Mi QR</Text>
                            </NextLink>
                            <NextLink href="/misentradas" passHref>
                                <Text color={'white'}>Mis Entradas</Text>
                            </NextLink>
                            <NextLink href="/escanear" passHref>
                                <Text color={'white'}>Escanear</Text>
                            </NextLink>
                        </>
                    )} 
                    
                    <ConnectButton
                        client={client}
                        chain={chain}
                    >
                         Connect 
                    </ConnectButton>
                </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
}
