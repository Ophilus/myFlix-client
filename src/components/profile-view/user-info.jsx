import React from "react";

function UserInfo({email, name , birthday}) {
    return(
        <>
            <h4>Your info:</h4>
            <p>Name: {name}</p>
            <p>e-mail: {email}</p>
            <p>Birthday: {birthday}</p>
        </>
    )
}

export default UserInfo