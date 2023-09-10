import { Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import React from 'react';
const PopOverComponent = ({ setSearch, category, subcategory }) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleMouseEnter = () => {
        setIsPopoverOpen(true);
    };

    const handleMouseLeave = () => {
        setIsPopoverOpen(false);
    };
    return (
        <Popover
            placement="right-start"
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
        >
            <PopoverTrigger>
                <Text bg='black' color='white' onClick={() => setSearch(category)} onPointerEnter={handleMouseEnter}
                >{category}</Text>

            </PopoverTrigger>
            <PopoverContent onMouseLeave={handleMouseLeave}>
                {/* <PopoverArrow /> */}
                <PopoverBody >
                    {
                        subcategory.map((el) => (
                            <Text key={el} onClick={() => setSearch(el)}>
                                {el}
                            </Text>
                        ))
                    }

                    {/* <Text onClick={() => setSearch("Herbs & Seasonings")}>Herbs & Seasonings</Text>
                    <Text onClick={() => setSearch("Fresh Fruits")}>Fresh Fruits</Text> */}

                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default PopOverComponent