import { FaLongArrowAltRight } from 'react-icons/fa';
import CardFacility from './CardFacility';
import './FacilityMain.css';
import facility1 from '../assets/Rectangle5.png';
import facility2 from '../assets/Rectangle5(1).png';
import facility3 from '../assets/Rectangle5(2).png';
import { useNavigate } from 'react-router-dom';

const FacilityMain = () => {
    const staticFacility = 
    [
        {
            id: 1,
            image: facility1,
            title: 'lorem ipsum doler sit',
            description: 'Amet minim mollit non deserunt.',
        },
        {
            id: 2,
            image: facility2,
            title: 'lorem ipsum doler sit',
            description: 'Amet minim mollit non deserunt.',
        },
        {
            id: 3,
            image: facility3,
            title: 'lorem ipsum doler sit',
            description: 'Amet minim mollit non deserunt.',
        }
    ];
    const navigate = useNavigate();
    const toQnA = () => {
        navigate('/qnas');
    };

    return (
        <div className='main-facility'>
            <div className='container-fluid'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <h2 className="mt-5 mb-3 title-main">Find a health facility nearby.</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-9 '>
                            <div className='row row-cols-1 row-cols-md-3 g-4'>
                            {
                                staticFacility ? staticFacility?.map((fl) => (
                                    <CardFacility image={fl.image} title={fl.title} description={fl.description} />
                                )) : ''
                            }
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <FaLongArrowAltRight className='mx-auto icon-arrow' onClick={toQnA} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacilityMain;