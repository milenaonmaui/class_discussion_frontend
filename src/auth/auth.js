require('dotenv').config()

export const signup=(user) => {
        const url = `${process.env.REACT_APP_API_URL}/signup`
        console.log("Sign up URL ", url)
        return fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json()
            //console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export const signin=(user) => {
    const url = `${process.env.REACT_APP_API_URL}/signin`
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
        //console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

export const authenticate=(jwt, user, callback)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(jwt));
        localStorage.setItem("user", JSON.stringify(user));
        callback()
    }
}

export const signout = (next)=>{
    const url = `${process.env.REACT_APP_API_URL}/signout`
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next()
        return fetch(url, {
            method: "GET"
        })
        .then(response => {
            console.log(response)
            return response.json()
        })
        .catch(err =>console.log(err))
    }
} 

export const isAuthenticated = () => {
    //check local storage if user is autheticated based on presence of jwt
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return {jwt: JSON.parse(localStorage.getItem("jwt")), user: JSON.parse(localStorage.getItem("user"))}
    } else {
        return false
    }
}

