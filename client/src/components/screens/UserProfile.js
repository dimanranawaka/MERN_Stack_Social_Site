import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {

    // Define a state variable called mypics and a function called setPics to update the state variable. Initialize mypics to an empty array.
    const [userProfile, setProfile] = useState(null);


    // Use the useContext Hook to access the UserContext. This gives us access to the state and dispatch function from the UserContext.
    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();

    // this will make sure if current user following that the profile that he watches show unfollow button
    const [showfollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true);

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
            dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
            localStorage.setItem("user", JSON.stringify(data))
            // shit logic
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers: [...prevState.user.followers, data._id]
                    }
                }
            })
            setShowFollow(false);
        })
    }

    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))

                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setShowFollow(true)

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
                                src={userProfile.user.pic} />
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
                                <h5>{userProfile.user.followers.length} followers</h5>
                                <h5>{userProfile.user.following.length} following</h5>
                            </div>
                            {showfollow ?
                                <button style={{ margin: "12px" }} className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => followUser()}>
                                    follow
                                </button>
                                :
                                <button style={{ margin: "12px" }} className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => unfollowUser()}>
                                    unfollow
                                </button>
                            }


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