import React from "react";

const Profile = () => {

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0px",
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"/>
                </div>
                <div>
                    <h4>Diman Ranawaka</h4>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Profile;