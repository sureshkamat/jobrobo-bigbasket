import {
  Box, Button, Center, Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'react-feather';
import './App.css';
import FrontView from './component/FrontView';
import PopOverComponent from './component/PopOver';
import Search from './component/Search';

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
    axios.get('https://misty-pike-leather-jacket.cyclic.app/products')
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
    axios.post('https://misty-pike-leather-jacket.cyclic.app/signup', signupdata)
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
    axios.post('https://misty-pike-leather-jacket.cyclic.app/login', logindata)
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
    axios.post('https://misty-pike-leather-jacket.cyclic.app/products/add', addProduct)
      .then((res) => {
        if (res.data.msg) {
          alert("Product Added Successfully");
        }
      })
      .catch((err) => console.log(err));
  }
  const uniqueCategory = [...new Set(data.map(item => item.category))]
  console.log(uniqueCategory);
  return (
    <div className="App">

    
            
      <Flex w='90%' m="auto" gap="5" mt='5'>
        <img src="https://www.bbassets.com/static/v2697/custPage/build/content/img/bb_logo.png" alt="logo"></img>
        <Menu>
          <MenuButton colorScheme='green' as={Button} >
            Shop by Category
          </MenuButton>
          <MenuList bg='black'>
            <PopOverComponent category={"Fruits & Vegetables"} subcategory={["Fresh Vegetables","Herbs & Seasonings","Fresh Fruits"]} setSearch={setSearch} />
            <PopOverComponent category={"Foodgrains, Oil & Masala"} subcategory={["Atta","Dals","Salts"]} setSearch={setSearch} />
            <PopOverComponent category={"Bakery, Cakes & Dairy"} subcategory={["Dairy"]} setSearch={setSearch} />
            <PopOverComponent category={"Beverages"} subcategory={["Energy & Soft Drinks","Water"]} setSearch={setSearch} />
            <PopOverComponent category={"Snacks & Branded Foods"} subcategory={["Biscuits & Cookies"]} setSearch={setSearch} />
            
            {/* <MenuItem bg='black' color='white' onClick={() => setSearch("Beverages")}>Beverages</MenuItem> */}
          </MenuList>
        </Menu>
        <Input type="text" placeholder="Search products" w='50%' onChange={(e) => setSearch(e.target.value)} />
        <Button colorSchema='pink'><Icon as={ShoppingCart} w={6} h={6} color="blue.500" /> {cart} items </Button>
        {
          user ? <Button>{user}</Button> : <Button onClick={onOpen}>Login</Button>
        }
        {role === 'admin' && <Button onClick={onOpenModal2}>Add Products</Button>}
      </Flex>

      {search ? 
      <Box w='80%' m='auto' mt='20' >
        <Search search={search} setCart={setCart} cart={cart} role={role} />
      </Box> :
        <Box w='80%' m='auto' mt='20'>
          {
            uniqueCategory.map((el)=><FrontView data={data} setCart={setCart} cart={cart} category={el}/>)
          }
          
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
