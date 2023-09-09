import { Box, Button, Center, Text } from '@chakra-ui/react';
const Single=({data,setCart,cart})=>{
    return (
        <Box border='1px solid' p="5" borderRadius="5">
                <img src={data.image}  key={data.id} width="200"/>
                <Text fontSize='xl'>{data.name.slice(0,10)}..</Text>
                <Text fontSize='xl'>RS. {data.price} /-</Text>
                <Text fontSize='xl'>{data.quantity}</Text>
                <Center><Button onClick={()=>setCart(cart+1)}>Add to Cart</Button></Center>
     </Box>
    )
}

export default Single