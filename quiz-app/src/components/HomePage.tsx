import { useNavigate } from 'react-router-dom';
import './static/HomePage.css'

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/quiz');
    }

    return (
        <div className="title-container">
            <div className="title-box">
            <h1>The Quiz App <br/><br/> [☻]</h1>
            </div>
            <div className="title-button"><button onClick={handleSubmit}><span>Start</span></button></div>
        </div>
    );
}

export default HomePage;