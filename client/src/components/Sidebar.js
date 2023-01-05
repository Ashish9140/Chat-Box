import React, { useContext, useEffect } from 'react'
import { getUsers, getChats } from '../http';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../CartContext';

const Sidebar = ({ socket }) => {
    const { user, setUser, allUser, setAllUser, setRightTop, setMessageList, setShowChat, BASE_URL } = useContext(CartContext);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const { data } = await getUsers({ token });
                setAllUser(data.alluser);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        history.push("/");
    }

    const handleOpen = async (Navuser) => {
        if (Navuser.avatar)
            setRightTop({
                _id: Navuser._id,
                name: Navuser.name,
                email: Navuser.email,
                avatar: Navuser.avatar
            });
        else
            setRightTop({
                _id: Navuser._id,
                name: Navuser.name,
                email: Navuser.email,
                avatar: ''
            });


        let roomId = user.email + Navuser.email;
        roomId = roomId.split('').sort().join('')

        // Join User
        await socket.emit("join_room", roomId);
        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await getChats({ roomId, token });
        setMessageList(data);
        setShowChat(true);
        document.querySelector(".mainTopBack").classList.add("show");
        document.querySelector(".sidebar").classList.add("open");
        document.querySelector(".main").classList.add("close");
    }


    return (
        <div className="sidebar">
            <div className="sidebarTop">
                <div className="sidebarTopImg">
                    <img src={user.avatar ? `${BASE_URL}/${user.avatar}` : '/images/ppp3.jpg'} alt="logo" />
                    <span>{user.name}</span>
                </div>
                <div className="topMenu btn-group">
                    <i className="fa-solid fa-ellipsis-vertical dropdown-toggle-split" data-mdb-toggle="dropdown" aria-expanded="false" />
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" data-mdb-toggle="modal" data-mdb-target="#exampleModal">Profile</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Dark Mode</a></li>
                        <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
            <div className="sidebarSearch">
                <input type="search" className="form-control" placeholder='Search for chats' />
            </div>
            <div className="sidebarList list-group list-group-light">

                {
                    (allUser !== undefined) ?
                        allUser.map((Navuser, index) => {
                            return (
                                (Navuser.email !== user.email) ?
                                    <div className="list-group-item list-group-item-action px-3 border-1" onClick={() => { handleOpen(Navuser) }} key={index}>
                                        <img src={Navuser.avatar ? `${BASE_URL}/${Navuser.avatar}` : '/images/ppp3.jpg'} alt="logo" />
                                        <span>{Navuser.name}</span>
                                    </div>
                                    : ''
                            )
                        })
                        : ''
                }

            </div>
        </div>
    )
}

export default Sidebar