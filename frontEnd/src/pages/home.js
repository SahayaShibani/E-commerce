import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VetrticalCardProducts";
import CategoryList from "../components/categoryList";
import productCategory from "../helper/productCategory";

export default function Home(){

    
    return(
  <>
  <CategoryList/>
  <BannerProduct/>
  <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
  <HorizontalCardProduct category={"mobiles"} heading={"Latest Mobiles"}/>

 
  <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
  
  <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
  <VerticalCardProduct category={"watches"} heading={"Popular Watches"}/>
  <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
  <VerticalCardProduct category={"printers"} heading={"Printers"}/>
  <VerticalCardProduct category={"processor"} heading={"Processors"}/>

  
</>
    ) 
}