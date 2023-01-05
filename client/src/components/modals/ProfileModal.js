import { useContext, useState } from "react"
import { CartContext } from '../../CartContext'
import axios from "axios";

const ProfileModal = () => {
    const { user, BASE_URL } = useContext(CartContext);
    const [file, setFile] = useState();
    const [upload, setUpload] = useState();

    const handleClick = async () => {
        const formData = new FormData();
        formData.append("avatar", upload);
        formData.append("_id", user._id);
        try {
            const res = await axios.post(`${BASE_URL}/upload/file`, formData)
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setUpload(e.target.files[0]);
    }


    return (
        // < !--Modal -- >
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLabel">Profile</h6>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="profile-img">
                            <img src={!file ? `${BASE_URL}/${user.avatar}` : file} alt="logo" />
                            <input type="file" className="file" onChange={(e) => { handleChange(e) }} />
                        </div>
                        <div className="profile-info">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" value={user.name} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control" value={user.email} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal

