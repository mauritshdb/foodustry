
const handleLogout = () => {
    localStorage.clear();
    window.location.assign('/');
}

export default handleLogout;