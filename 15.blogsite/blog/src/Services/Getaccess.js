import axios from "axios"

const Getaccess = async () => {
    // const token = JSON.parse(localStorage.getItem("auth"));
    const res = await axios.post('http://localhost:8888/renewtoken', { token: JSON.parse(localStorage.getItem("refreshtoken")) })
    
    localStorage.setItem("auth", JSON.stringify(res.data.accesstoken));
    localStorage.setItem("refreshtoken", JSON.stringify(res.data.refreshtoken));
}
export default Getaccess;