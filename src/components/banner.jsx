import { Link } from 'react-router-dom';
import bannerVideo from '../assets/videos/homevideo.mp4'

function banner() {
    return (
        <div className="home-banner">
            <video autoPlay muted loop className="banner-video">
                <source src={bannerVideo}/>
            </video>
            <div className='banner-detail'>
                <h4>Tech Shop</h4>
                <h2 className='mb-3'>Công nghệ đánh thức đam mê</h2>
                <Link className='banner-button'>Khám phá ngay</Link>
            </div>
        </div>
    );
}

export default banner;