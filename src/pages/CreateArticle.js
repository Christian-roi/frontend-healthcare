import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar"
import { createPost } from "../redux/actions/post";

const CreateArticle = () => {
    const dispatch = useDispatch();

    const { message } = useSelector(state => state.message);
    const { user: currentUser } = useSelector((state) => state.auth);

    const userId = currentUser.id;
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');

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
                // console.log(baseURL);
                setImage(baseURL);
                resolve(baseURL);
            };
        });
    };

    const handleFileInputChange = e => {
        // console.log(e.target.files[0]);
        let { file } = imageEncode;

        file = e.target.files[0];

        getBase64(file).then(result => {
            file["base64"] = result;
            // console.log("File Is", file);
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

    const onChangeTitle  = e => {
        const title = e.target.value;
        setTitle(title);
    };
    
    // const onChangeCategoryId  = e => {
    //     const categoryId = e.target.value;
    //     setPlace(categoryId);
    // };
    
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

    if (currentUser && (currentUser.role === "Editor" || currentUser.role === "Doctor")) {
        return (
            <div>
                <Navbar/>
                <div className="container-fluid container-article">
                    <div className="row">
                        <div className="col-lg-4 mt-4">
                            <h2>Article Choice</h2>
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
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">

                                </div>
                                <div className="col-lh-8">

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    return (
        <Navigate to={'/'} />
    )
};

export default CreateArticle;