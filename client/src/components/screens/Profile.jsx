import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {

    // Define a state variable called mypics and a function called setPics to update the state variable. Initialize mypics to an empty array.
    const [mypics, setPics] = useState([]);

    // Use the useContext Hook to access the UserContext. This gives us access to the state and dispatch function from the UserContext.
    const { state } = useContext(UserContext);

    const [image, setImage] = useState("");
    // const [url, setUrl] = useState("");


    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {

            setPics(result.mypost);

        })
    }, []);

    useEffect(() => {

        if (image) {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "insta-clone");
            data.append("cloud_name", "dyeeglaz1");
            fetch("https://api.cloudinary.com/v1_1/dyeeglaz1/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    // setUrl(data.url);
                    // localStorage.setItem("user", JSON.stringify({ ...state, pic: data.url }))
                    // dispatch({ type: "UPDATEPIC", payload: data.url })
                    fetch('/updatepic', {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("jwt")
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json()).then(result => {
                        console.log(result);
                        localStorage.setItem("user", JSON.stringify({ ...state, pic: data.url }))
                    })

                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [image]);

    const updateProfile = (file) => {
        setImage(file);

    }

    return (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
            <div style={{
                margin: "18px 0px",
                borderBottom: "1px solid grey"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic : "loading"} />
                    </div>

                    <div>
                        <h4>{state ? state.name : "loading"}</h4>
                        <h5>{state ? state.email : "loading"}</h5>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "108%"
                        }}>
                            <h5>{mypics.length} posts</h5>
                            <h5>{state ? state.followers.length : "0"} followers</h5>
                            <h5>{state ? state.following.length : "0"} following</h5>
                        </div>
                    </div>
                </div>


                <div className="file-field input-field" style={{ margin: "15px" }}>
                    <div className="btn">
                        <span>Update Profile</span>
                        <input type="file" onChange={(e) => updateProfile(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

            </div>
            <div className='gallery' style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around"
            }}>
                {
                    mypics.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }


            </div>
        </div>
    );
};

export default Profile;