import { Box } from "@chakra-ui/react";
import Sliders from "./sliderFooter";

function sliderFooterMain() {

    return (
        <>
        <div className="container-xxl slider-footer">    
        <Box padding={4}>
            <Sliders/>
        </Box>
        </div>
        </>
    );
}

export default sliderFooterMain;