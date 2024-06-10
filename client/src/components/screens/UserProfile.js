import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {

    // Define a state variable called mypics and a function called setPics to update the state variable. Initialize mypics to an empty array.
    const [userProfile, setProfile] = useState(null);

    // Use the useContext Hook to access the UserContext. This gives us access to the state and dispatch function from the UserContext.
    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();

    // console.log(userid);
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {

            console.log(result);
            setProfile(result);
        })
    }, []);

    const followUser = () => {
        fetch('/follow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
    }

    return (
        <>
            {userProfile ?
                <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww" />
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "108%"
                            }}>
                                <h5>{userProfile.posts.length} posts</h5>
                                <h5>50 followers</h5>
                                <h5>50 following</h5>
                            </div>
                            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => followUser()}>
                                follow
                            </button>
                        </div>
                    </div>

                    <div className='gallery' style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-around"
                    }}>
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }


                    </div>
                </div>
                : <h1>loading...</h1>}

        </>
    );
};

export default Profile;