import { Box, Button, Center, Text } from '@chakra-ui/react';
import axios from 'axios';
const Single=({data,setCart,cart,role,getData})=>{
    const handleDelete=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:8081/products/delete/${id}`)
        .then((res)=>{
            getData();
        })
        .catch((err)=>console.log(err));
    }
    return (
        <Box border='1px solid' p="5" borderRadius="5">
                <img src={data.image}  key={data.id} width="200"/>
                <Text fontSize='xl'>{data.name.slice(0,10)}..</Text>
                <Text fontSize='xl'>RS. {data.price} /-</Text>
                <Text fontSize='xl'>{data.quantity}</Text>
                <Center><Button colorScheme='green' onClick={()=>setCart(cart+1)}>Add to Cart</Button>
                {
                    role==='admin' && <Button colorScheme='red' onClick={()=>handleDelete(data._id)}>Delete</Button>
                }
                </Center>
     </Box>
    )
}

export default Single