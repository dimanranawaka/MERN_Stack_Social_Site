import React from "react";

const Home = () => {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Diman</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2FsbHBhcGVyfGVufDB8MHwwfHx8MA%3D%3D"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>Title</h6>
                    <p>This is an amazing post</p>
                    <input type="text" placeholder="add a comment"/>
                </div>
            </div>
        </div>
    );
};

export default Home;