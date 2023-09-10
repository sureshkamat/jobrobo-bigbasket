import {
  Box, Button, Center, Flex, Grid,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'react-feather';
import './App.css';
import Search from './component/Search';
import Single from './component/single';

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(0);
  const [login, setLogin] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState();
  const [role, setRole] = useState();

  const [search, setSearch] = useState();
  const [signupdata, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [logindata, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    subcategory: "",
    description: "",
    image: ""
  })
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const onCloseModal2 = () => {
    setIsOpenModal2(false);
  };

  const onOpenModal2 = () => {
    setIsOpenModal2(true);
  };
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

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/signup', signupdata)
      .then((res) => {
        if (res.data.status) {
          alert("SignUp Successfully now goto Login");
          setLogin(!login);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/login', logindata)
      .then((res) => {
        if (res.data.token) {
          console.log(res);
          setUser(res.data.UserName);
          setRole(res.data.role);
          onClose()
          alert("login Successfull");
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => console.log(err));

  }
  const handleAddProduct = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/products/add', addProduct)
      .then((res) => {
        if (res.data.msg) {
          alert("Product Added Successfully");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="App">

      <Flex w='90%' m="auto" gap="5" mt='5'>
        <img src="https://www.bbassets.com/static/v2697/custPage/build/content/img/bb_logo.png" alt="logo"></img>
        <Menu>
          <MenuButton colorScheme='green' as={Button} >
            Shop by Category
          </MenuButton>
          <MenuList bg='black'>
            <MenuItem bg='black' color='white' onClick={()=>setSearch("Fruits & Vegetables")}>Fruits & Vegetables</MenuItem>
            <MenuItem bg='black' color='white' onClick={()=>setSearch("Foodgrains, Oil & Masala")}>Foodgrains, Oil & Masala</MenuItem>
            <MenuItem bg='black' color='white' onClick={()=>setSearch("Bakery, Cakes & Dairy")}>Bakery, Cakes & Dairy</MenuItem>
          </MenuList>
        </Menu>
        <Input type="text" placeholder="Search products" w='50%' onChange={(e) => setSearch(e.target.value)} />
        <Button colorSchema='pink'><Icon as={ShoppingCart} w={6} h={6} color="blue.500" /> {cart} items </Button>
        {
          user ? <Button>{user}</Button> : <Button onClick={onOpen}>Login</Button>
        }
        {role === 'admin' && <Button onClick={onOpenModal2}>Add Products</Button>}
      </Flex>
      {search ? <Box w='80%' m='auto' mt='20' >
        <Search search={search} setCart={setCart} cart={cart} role={role} />
      </Box> :
        <Box w='80%' m='auto' mt='20'>
          <Box>
            <Text fontSize='2xl'>Fresh Vegetables</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>
              {
                data.filter((el) => el.subcategory === 'Fresh Vegetables')
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
          <Box>
            <Text fontSize='2xl'>Herbs & Seasonings</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>

              {
                data.filter((el) => el.subcategory === 'Herbs & Seasonings')
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
          <Box>
            <Text fontSize='2xl'>Fresh Fruits</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>

              {
                data.filter((el) => el.subcategory === 'Fresh Fruits')
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
          <Box>
            <Text fontSize='2xl'>Attas</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>

              {
                data.filter((el) => el.subcategory === 'Atta')
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
          <Box>
            <Text fontSize='2xl'>Dals</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>

              {
                data.filter((el) => el.subcategory === 'Dals')
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
          <Box>
            <Text fontSize='2xl'>Salts</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>

              {
                data.filter((el) => el.subcategory === 'Salts')
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
        </Box>
      }

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{login ? "Login" : "Sign Up"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {
                login ? <form onSubmit={handleLogin}>
                  <Input type='text' placeholder='Enter Email' isRequired onChange={(e) => setLoginData({ ...logindata, email: e.target.value })} />
                  <Input type='password' placeholder='Enter Password' mt='5' isRequired onChange={(e) => setLoginData({ ...logindata, password: e.target.value })} />
                  <Center mt='5'><Button type="submit">Login</Button></Center>
                </form>
                  :
                  <form onSubmit={handleSignup}>
                    <Input type='text' placeholder='Enter First Name' isRequired onChange={(e) => setSignUpData({ ...signupdata, firstName: e.target.value })} />
                    <Input type='text' placeholder='Enter Last Name' mt='3' onChange={(e) => setSignUpData({ ...signupdata, lastName: e.target.value })} />
                    <Input type='text' placeholder='Enter Email' mt='3' isRequired onChange={(e) => setSignUpData({ ...signupdata, email: e.target.value })} />
                    <Input type='password' placeholder='Enter Password' mt='3' isRequired onChange={(e) => setSignUpData({ ...signupdata, password: e.target.value })} />
                    <Center mt='5'><Button type="submit">Sign Up</Button></Center>
                  </form>
              }

            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => setLogin(!login)}>{login ? "Sign Up" : "Login"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add products</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>

              <form onSubmit={handleAddProduct}>
                <Input type='text' placeholder='Enter Product Name' isRequired onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })} />
                <Input type='number' placeholder='Enter Product Price' mt='3' onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })} />
                <Input type='text' placeholder='Enter Quantity' mt='3' isRequired onChange={(e) => setAddProduct({ ...addProduct, quantity: e.target.value })} />
                <Input type='text' placeholder='Enter Category' isRequired onChange={(e) => setAddProduct({ ...addProduct, category: e.target.value })} />
                <Input type='text' placeholder='Enter SubCategory' mt='3' onChange={(e) => setAddProduct({ ...addProduct, subcategory: e.target.value })} />
                <Input type='text' placeholder='Enter Description' mt='3' isRequired onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })} />
                <Input type='text' placeholder='Enter Image Url' mt='3' isRequired onChange={(e) => setAddProduct({ ...addProduct, image: e.target.value })} />
                <Center mt='5'><Button type="submit">Add to Products</Button></Center>
              </form>


            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </div>
  );
}

export default App;
