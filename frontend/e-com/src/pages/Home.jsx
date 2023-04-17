import Announcement from "../component/Announcement";
import Navbar from "../component/Navbar";
import Slider from "../component/Slider";
import Product from "../component/Product";
import NewLetter from "../component/NewLetter";
import Footer from "../component/Footer";
import Categories from "../component/Categories";

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Product />
            <NewLetter />
            <Footer />
        </div>
    )
}

export default Home