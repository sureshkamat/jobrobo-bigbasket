import { Box, Button, Center, Select, Text } from '@chakra-ui/react';
import axios from 'axios';
const Single=({data,setCart,cart,role,getData})=>{
    const handleDelete=(id)=>{
        console.log(id);
        axios.delete(`https://misty-pike-leather-jacket.cyclic.app/products/delete/${id}`)
        .then((res)=>{
            getData();
        })
        .catch((err)=>console.log(err));
    }
    return (
        <Box border='1px solid' p="2" borderRadius="5">
                <img src={data.image}  key={data.id} width="200"/>
                <Text fontSize='xl' mt={10}>{data.name.slice(0,11)}..</Text>
                
                
                <Select colorScheme='green' variant='outline' mt={10}>
                    <option>{data.quantity}</option>
                </Select>
                <Text fontSize='lg' as='b'>₹{data.price} /-</Text>
                <Select color='green' variant='outline' mt={10} borderColor='green' textAlign="center" placeholder='Har Din Sasta!'>
                </Select>
                <Center mt={3}><Button colorScheme='red' variant='outline' onClick={()=>setCart(cart+1)}>Add to Cart</Button>
                {
                    role==='admin' && <Button colorScheme='red' onClick={()=>handleDelete(data._id)}>Delete</Button>
                }
                </Center>
     </Box>
    )
}

export default Single