import { FaRegBookmark, FaShare } from "react-icons/fa";

const CardFacility = ({image, title, description}) => {
    return (
        <div className="card h-100">
            <img src={image} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                <div 
                    className='post-thumb'
                    dangerouslySetInnerHTML={{__html: description.substring(0,70)+"<p>....</p>"}}
                />
                <div className='icon-card'>
                    <div className="row justify-content-between">
                        <div className="col-4"><FaRegBookmark/> Save</div>
                        <div className="col-2" style={{textAlign: 'right'}}><FaShare/> </div>
                    </div>                              
                </div>
                </p>
            </div>
        </div>
    )
}

export default CardFacility;