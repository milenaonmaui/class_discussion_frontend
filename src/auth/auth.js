export const signup=(user) => {
        return fetch("http://localhost:8080/signup", {
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
    return fetch("http://localhost:8080/signin", {
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
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt");
        next()
        return fetch("http://localhost:8080/signout", {
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
        return JSON.parse(localStorage.getItem("user"))
    } else {
        return false
    }
}

