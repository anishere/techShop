import Banner from "../components/banner";
import NewProds from "../components/newProds";
import Policy from "../components/policy";
import SliderHome from "../components/sliderHome";
import HotProds from "../components/hotProds";
import SliderFooterMain from "../components/sliderFooterMain";

function home() {
    return (
        <>
        <Banner></Banner>
        <Policy></Policy>
        <NewProds></NewProds>
        <SliderHome></SliderHome>
        <HotProds></HotProds>
        <SliderFooterMain></SliderFooterMain>
        </>
    );
}

export default home;