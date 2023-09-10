import { Box, Grid, Text } from "@chakra-ui/react";
import Single from './single';
const FrontView=({subcategory,setCart,cart,data})=>{
    return (
        <Box>
            <Text fontSize='2xl'>{subcategory}</Text>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>
              {
                data.filter((el) => el.subcategory === subcategory)
                  .slice(0, 5)
                  .map((el) => (
                    <Single data={el} setCart={setCart} cart={cart} />
                  ))
              }
            </Grid>
          </Box>
    )
}

export default FrontView;