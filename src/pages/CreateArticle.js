import React, { useMemo, useState } from "react";
import { BsCamera } from "react-icons/bs";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import { createPost } from "../redux/actions/post";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

const CreateArticle = () => {
    const dispatch = useDispatch();

    const { message } = useSelector(state => state.message);
    const { user: currentUser } = useSelector((state) => state.auth);
    const isEditorOrDoctor = currentUser && ["Editor","Doctor"].includes(currentUser.role);
    const dataCategories = useSelector(state => state.category).data;

    const userId =  useMemo(() => currentUser?.id ?? 0, [currentUser?.id]);
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

    const hiddenFileInput = React.useRef(null);
    const handleButtonClick = () => {
        hiddenFileInput.current.click();
    }

    const [imageEncode, setImageEncode] = useState({
        file: null,
        base64URL: ""
    });

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                setImage(baseURL);
                resolve(baseURL);
            };
        });
    };

    const handleFileInputChange = e => {
        let { file } = imageEncode;

        file = e.target.files[0];

        getBase64(file).then(result => {
            file["base64"] = result;
            setImageEncode({
                base64URL: result,
                file
            });
        }).catch(err => {
            console.error(err);
        });

        setImageEncode({
            file: e.target.files[0]
        });
    };

    const removeSelectedImage = () => {
        setImage('');
    };

    const onChangeTitle  = e => {
        const title = e.target.value;
        setTitle(title);
    };
    
    const onChangeCategoryId  = e => {
        const categoryId = e.target.value;
        setCategoryId(categoryId);
    };
    
    const [success, setSuccess] = useState(false);
    
    const dataPost = {
        userId,
        categoryId,
        title,
        image,
        content
    };

    const messageAlert = () => {
        Swal.fire({
            title: success ? 'Success' : 'Error',
            text: message,
            icon: success ? 'success' : 'error',
        }).then(function () {
            if (success) {
                window.location.href = "/";
            }
        });
    };

    const handleCreatePost = () => {
        dispatch(createPost(dataPost)).then(() => {
            setSuccess(true);
        }).catch(() => {
            setSuccess(false);
        })
    };

    const handleSubmit = event => {
        event.preventDefault();
        handleCreatePost();
    };

    if (isEditorOrDoctor) {
        return (
            <div>
                <Navbar/>
                <div className="container-fluid container-article">
                    <div className="row">
                        <div className="col-lg-4 mt-4">
                            <h2>Post an Article</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb navigate-menu">
                                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Post an Article</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <section>
                        <h2 className="mt-5">Let's Write Again!</h2>
                        {
                            message && ( messageAlert() )
                        }
                        <div className="container mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-4" >
                                        {
                                            image ?
                                                <div className="preview">
                                                    <img src={image} alt="preview cover"/>
                                                    <div className="d-grip gap-1">
                                                        <button className="btn btn-remove-preview mt-2" onClick={removeSelectedImage}>Remove this image</button>
                                                    </div>
                                                </div>    
                                                :
                                                <div className="btn-file-image" onClick={handleButtonClick}>
                                                <BsCamera/>
                                                    <h4 className="mx-auto mt-1" style={{marginBottom: '30%'}}>Drop your lovely Article Cover</h4>
                                                    <input type="file" accept="image/*" id="image" name="image" ref={hiddenFileInput} onChange={handleFileInputChange} style={{display:'none'}} required/>
                                                </div>
                                        }
                                    </div>
                                    <div className="col-lg-8">
                                        <input type="text" className="form-control" id="title" name="title" value={title} onChange={onChangeTitle} placeholder="Type in the title" required/>
                                        <ReactQuill
                                            className="col align-self-start mt-3"
                                            style={{textAlign: 'left'}}
                                            placeholder="Write down your insight here!"
                                            theme='snow' 
                                            modules={modules}
                                            formats={formats}
                                            value={content} 
                                            onChange={setContent} 
                                            required
                                        />
                                        <div className="row justify-content-end mt-5">
                                            <div className="col-lg-4">                                                
                                                <select onChange={onChangeCategoryId} className="form-select form-select-lg select-category">
                                                    <option selected>Category</option>
                                                    {
                                                        dataCategories && dataCategories.map((category) => (
                                                            <option value={category.id}>{category.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-lg-2">
                                                <button className='btn btn-lg btn-create-article'>Publish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
                <Footer/>
            </div>
        )
    }

    return (
        <Navigate to={'/'} />
    )
};

export default CreateArticle;