import { Box, Grid } from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Single from "./single";
const Search=({search,setCart,cart,role})=>{
    const [data,setData]=useState([]);


    const getData=()=>{
        const params={
            search
        }
        axios.get('https://misty-pike-leather-jacket.cyclic.app/products',{params})
        .then((res)=>{
            console.log(res);
            setData(res.data.data);
        })
        .catch((err)=>console.log(err));
    }
    useEffect(()=>{
  getData();
    },[search])
    return(
        <Box>
            <h1>Searched Products {search} Found {data.length}</h1>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", sm:"repeat(2, 1fr)",md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={6}>
            {
                data.map((el)=><Single data={el} setCart={setCart} cart={cart} role={role} getData={getData} />)
            }
        </Grid>
        
        </Box>
    )
}

export default Search;