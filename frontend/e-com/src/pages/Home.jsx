import Announcement from "../component/Announcement";
import Navbar from "../component/Navbar";
import Slider from "../component/Slider";
import Product from "../component/Product";
import NewLetter from "../component/NewLetter";
import Footer from "../component/Footer";
import Categories from "../component/Categories";
import { Link } from "react-router-dom";
import './style.css'

const Home = ({user}) => {
    return (
        <div className="position-relative">
            <Announcement />
            <Navbar user={user} />
            <Slider />
            <Categories />
            <Product />
            <NewLetter />
            <Footer />
            {user && (
                <div className="position-fixed bottom-0 end-0 z-3">
                    <Link to={'/dashboard'} className="p-3 links rounded">
                        Sellers Page
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Home