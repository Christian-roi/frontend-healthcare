import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegBookmark } from 'react-icons/fa'
import { fetchCategories } from '../redux/actions/category';
import randomImage from '../assets/blank-profile.png';
import './ArticleMain.css';

const ArticleMain = () => {
    const categories = useSelector(state => state.category.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // console.log("INI CATEGORY",categories);
    const getByCategory = id => {
        console.log("Category ID: ",id)
    }


    return (
        <div className="main-article">
            <h2 className="mt-5">Explore everything that interests you.</h2>
            <ul className='list-inline mt-4'>
                {
                    categories && categories.map((category, index) => (
                        <li 
                            key={index}
                            className='list-inline-item mx-2'    
                        >
                            <h5 
                                onClick={() => getByCategory(category.id)}
                                className='list-category'
                            >
                                {category.name}
                            </h5>
                        </li>
                    ))
                }
            </ul>
            <div className='container'>
                <div className='row'>
                    {/* <div className='col md-6'>
                        <div className='row row-cols-1'>
                        <div className="col">
    <div className="card">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
                        </div>
                    </div>
                    <div className='col md-6'>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
</div>
                    </div> */}
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 '>
    <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title big-card">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
                    </div>
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 '>
                        {/* <div className='row'>
                            <div className='col md-6'>
                            <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
    
                            </div>
                            <div className='col md-6'>
                            <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className='col md-6'>
                            <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
                            </div>
                            <div className='col md-6'>
                            <div className="card h-100">
      <img src={randomImage} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
                            </div>

                        </div> */}
                        <div className='row row-cols-1 row-cols-md-2 g-4'>
                        <div className="col">
                          <div className="card h-100">
                            <img src={randomImage} className="card-img-top" alt="..."/>
                            <div className="card-body">
                              <h5 className="card-title">Card title</h5>
                              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card h-100">
                            <img src={randomImage} className="card-img-top" alt="..."/>
                            <div className="card-body">
                              <h5 className="card-title">Card title</h5>
                              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card h-100">
                            <img src={randomImage} className="card-img-top" alt="..."/>
                            <div className="card-body">
                              <h5 className="card-title">Card title</h5>
                              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card h-100">
                            <img src={randomImage} className="card-img-top" alt="..."/>
                            <div className="card-body">
                              <h5 className="card-title">Card title</h5>
                              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ArticleMain;