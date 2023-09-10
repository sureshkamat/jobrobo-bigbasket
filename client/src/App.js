import {
  Box, Button, Center, Flex, Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Search from './component/Search';
import Single from './component/single';

function App() {
  const [data, setData] = useState([]);
  const [cart,setCart]=useState(0);
  const [login,setLogin]=useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
 const [user,setUser]=useState();

 const [search,setSearch]=useState();
  const [signupdata,setSignUpData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const [logindata,setLoginData]=useState({
    email:"",
    password:""
  })
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

  const handleSignup=()=>{
    axios.post('http://localhost:8081/signup',signupdata)
    .then((res)=>{
      if(res.data.status){
        alert("SignUp Successfully now goto Login");
        setLogin(!login);
      }else{
        alert("Something went wrong");
      }
    })
    .catch((err)=>console.log(err));
  }

  const handleLogin=()=>{
    axios.post('http://localhost:8081/login',logindata)
    .then((res)=>{
      if(res.data.token){
        setUser(res.data.UserName);
        alert("login Successfull");
        onClose()
      }else{
        alert("Invalid Credentials");
      }
    })
    .catch((err)=>console.log(err));
  
  }
  return (
    <div className="App">
      <Flex w='80%' m="auto" gap="5" mt='5'>
        <img src="https://www.bbassets.com/static/v2697/custPage/build/content/img/bb_logo.png" alt="logo"></img>
        <Input type="text" placeholder="Search products" onChange={(e)=>setSearch(e.target.value)}/>
        <Button>Cart {cart} </Button>
        {
          user?<Button>{user}</Button>:<Button onClick={onOpen}>Login</Button>
         }     
          </Flex>
      {search?<Box w='80%' m='auto' mt='20'>
      <Search search={search} setCart={setCart} cart={cart}/>
      </Box>:
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
      }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{login?"Login":"Sign Up"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {
                login?<form>
                <Input type='text' placeholder='Enter Email' isRequired onChange={(e)=>setLoginData({...logindata,email:e.target.value})} />
                <Input type='password' placeholder='Enter Password' mt='5' isRequired onChange={(e)=>setLoginData({...logindata,password:e.target.value})} />
                <Center mt='5'><Button onClick={handleLogin}>Login</Button></Center>
              </form>
              :
              <form>
                <Input type='text' placeholder='Enter First Name' isRequired onChange={(e)=>setSignUpData({...signupdata,firstName:e.target.value})} />
                <Input type='text' placeholder='Enter Last Name' mt='3' onChange={(e)=>setSignUpData({...signupdata,lastName:e.target.value}) } />
                <Input type='text' placeholder='Enter Email' mt='3'  isRequired onChange={(e)=>setSignUpData({...signupdata,email:e.target.value}) } />
                <Input type='password' placeholder='Enter Password' mt='3' isRequired onChange={(e)=>setSignUpData({...signupdata,password:e.target.value}) }/>
                <Center mt='5'><Button onClick={handleSignup}>Sign Up</Button></Center>
              </form>
              }
              
            </Box>  
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={()=>setLogin(!login)}>{login?"Sign Up":"Login"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
