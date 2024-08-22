import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Container, Image, Select, SimpleGrid, Text } from "@chakra-ui/react";
import TICKET1 from "../assets/ticket1.jpg"
import { FiShoppingCart } from "react-icons/fi";

export default function Home() {
  return (
    <Container bg={'#000012'} minW={'100%'} p={20} minH={'100vh'} centerContent display={'flex'} flexDirection={'column'}>
      <SimpleGrid columns={{base: 1, md: 2, '2xl': 4}} spacing={10} justifyItems={'center'} flex="1">
        <Card overflow="hidden" maxW={'300px'} h="450px" display="flex" flexDirection="column" justifyContent="space-between">
          <Image src={TICKET1.src} w="full" h="180px" objectFit="cover"/>
          <Box p={4} flex="1">
            <Text fontSize="lg" fontWeight="bold">
              Standard 1 - Día Miércoles
            </Text>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              95€
            </Text>
            <Text color="gray.500">
              Acceso libre a las conferencias y talleres sólo el día 27 de noviembre de 2024
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" p={4} gap={5}>
            <Select w="80px">
              {[...Array(5)].map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </Select>
            <Button variant="outline" leftIcon={<FiShoppingCart/>}>
              Add to Cart
            </Button>
          </Box>
        </Card>
        <Card overflow="hidden" maxW={'300px'} h="450px" display="flex" flexDirection="column" justifyContent="space-between">
          <Image src={TICKET1.src} w="full" h="180px" objectFit="cover"/>
          <Box p={4} flex="1">
            <Text fontSize="lg" fontWeight="bold">
              Standard 1 - Día Jueves
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              95€
            </Text>
            <Text color="gray.500">
              Acceso libre a las conferencias y talleres sólo el día 28 de noviembre de 2024
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" p={4} gap={5}>
            <Select w="80px">
              {[...Array(5)].map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </Select>
            <Button variant="outline" leftIcon={<FiShoppingCart/>}>
              Add to Cart
            </Button>
          </Box>
        </Card>
        <Card overflow="hidden" maxW={'300px'} h="450px" display="flex" flexDirection="column" justifyContent="space-between">
          <Image src={TICKET1.src} w="full" h="180px" objectFit="cover"/>
          <Box p={4} flex="1">
            <Text fontSize="lg" fontWeight="bold">
              Business
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              395€
            </Text>
            <Text color="gray.500">
              Acceso libre a las conferencias y talleres todos los días. Lounge VIP, acceso a networking profesional y cena business jueves.
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" p={4} gap={5}>
            <Select w="80px">
              {[...Array(5)].map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </Select>
            <Button variant="outline" leftIcon={<FiShoppingCart/>}>
              Add to Cart
            </Button>
          </Box>
        </Card>
        <Card overflow="hidden" maxW="300px" h="450px" display="flex" flexDirection="column" justifyContent="space-between">
          <Image src={TICKET1.src} w="full" h="180px" objectFit="cover"/>
          <Box p={4} flex="1">
            <Text fontSize="lg" fontWeight="bold">
              Online
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              45€
            </Text>
            <Text color="gray.500">
              Acceso online y grabaciones del congreso
            </Text>
          </Box>
          <Box display="flex" justifyContent="center" p={4} gap={5}>
            <Select w="80px">
              {[...Array(5)].map((_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </Select>
            <Button variant="outline" leftIcon={<FiShoppingCart/>}>
              Add to Cart
            </Button>
          </Box>
        </Card>
      </SimpleGrid>
    </Container>
  );
}