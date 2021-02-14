

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = '/';
}

export default logout;