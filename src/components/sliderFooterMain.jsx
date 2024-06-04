import { Box } from "@chakra-ui/react";
import Sliders from "./sliderFooter";

function sliderFooterMain() {

    return (
        <>
        <div className="container-xxl newProds slider-footer">    
        <h2 className="text-center">Vô vàng quà tặng</h2>
        <Box padding={4}>
            <Sliders/>
        </Box>
        </div>
        </>
    );
}

export default sliderFooterMain;