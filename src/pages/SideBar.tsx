import { HomeOutlined, SettingOutlined, SnippetsOutlined, UserOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useNavigate } from "react-router-dom"
import logo from "../assets/images.png";

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <div className="h-full font-bold">
            <img src={logo} alt="Logo" className="w-[80px] ml-[20px] cursor-pointer" onClick={() => {navigate("/")}}/>
            <Menu
                onClick={({ key }) => {
                    navigate(key);
                }}
                items={[
                    { label: 'Home', key: '/', icon: <HomeOutlined /> },
                    { label: 'Project Management', key: '/projectmanagement', icon: <SettingOutlined />, },
                    { label: 'Create Task', key: '/taskmanagement', icon: <SnippetsOutlined /> },
                    { label: 'User Management', key: '*', icon: <UserOutlined /> },
                ]}
            >
            </Menu>
        </div>
    )
}

export default SideBar
