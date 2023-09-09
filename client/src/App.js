import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Single from './component/single';

function App() {
  const [data, setData] = useState([]);
  const [cart,setCart]=useState(0);

  const getData = () => {
    axios.get('http://localhost:8081/products')
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className="App">
      <Flex w='80%' m="auto" gap="5" mt='5'>
        <img src="https://www.bbassets.com/static/v2697/custPage/build/content/img/bb_logo.png" alt="logo"></img>
        <Input type="text" placeholder="Search products" />
        <Button>Cart {cart} </Button>
        <Button>Login</Button>
      </Flex>
      <Box w='80%' m='auto' mt='20'>
        <Box>
          <Text fontSize='2xl'>Fresh Vegetables</Text>
          <Flex gap="10">
          {
            data.filter((el) => el.subcategory === 'Fresh Vegetables')
              .slice(0, 5)
              .map((el) => (
                <Single data={el} setCart={setCart} cart={cart}/>
              ))
          }
          </Flex>
        </Box>
        <Box>
          <Text fontSize='2xl'>Herbs & Seasonings</Text>
          <Flex gap="10">
          {
            data.filter((el) => el.subcategory === 'Herbs & Seasonings')
              .slice(0, 5)
              .map((el) => (
                <Single data={el} setCart={setCart} cart={cart}/>
              ))
          }
          </Flex>
        </Box>
        <Box>
          <Text fontSize='2xl'>Fresh Fruits</Text>
          <Flex gap="10">
          {
            data.filter((el) => el.subcategory === 'Fresh Fruits')
              .slice(0, 5)
              .map((el) => (
                <Single data={el} setCart={setCart} cart={cart}/>
              ))
          }
          </Flex>
        </Box>
        <Box>
          <Text fontSize='2xl'>Attas</Text>
          <Flex gap="10">
          {
            data.filter((el) => el.subcategory === 'Atta')
              .slice(0, 5)
              .map((el) => (
                <Single data={el} setCart={setCart} cart={cart}/>
              ))
          }
          </Flex>
        </Box>
        <Box>
          <Text fontSize='2xl'>Dals</Text>
          <Flex gap="10">
          {
            data.filter((el) => el.subcategory === 'Dals')
              .slice(0, 5)
              .map((el) => (
                <Single data={el} setCart={setCart} cart={cart}/>
              ))
          }
          </Flex>
        </Box>
        <Box>
          <Text fontSize='2xl'>Salts</Text>
          <Flex gap="10">
          {
            data.filter((el) => el.subcategory === 'Salts')
              .slice(0, 5)
              .map((el) => (
                <Single data={el} setCart={setCart} cart={cart}/>
              ))
          }
          </Flex>
        </Box>
      </Box>
    </div>
  );
}

export default App;
