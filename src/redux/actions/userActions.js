const setUser = (payload) => ({ type: "SET_USER", payload})

export const logUserOut = () => ({type: "LOG_OUT"})



export const autoLogin = () => dispatch => {
    fetch(`http://localhost:4000/auto_login`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        localStorage.setItem("token", data.token)
        dispatch(setUser(data.user))
    })
}