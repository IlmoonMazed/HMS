import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import supabase from "../config/supabaseClient";

const ShowRoleID2 = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getCookie('user_id');

    if (!userId) {
      setFormError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("User")
        .select(
          "User_ID, Name, Password, Role_ID, Registration_Date, Gender, Date_of_Birth, Email, Phone, Address"
        )
        .eq("User_ID", userId)
        .single();

      if (error) {
        console.log(error);
        setFormError("Something went wrong while fetching data");
        setUser(null);
      } else {
        setUser(data);
        setFormError(null);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading User data...</div>;
  }

  if (formError) {
    return <div className="error">{formError}</div>;
  }

  if (!user) {
    return <div className="no-data">No user found</div>;
  }

  return (
    <div className="patient-profile">
      <h2>Patient Profile</h2>
      <div className="patient-info">
        <p><span className="label">User ID:</span> {user.User_ID}</p>
        <p><span className="label">Name:</span> {user.Name}</p>
        <p><span className="label">Role ID:</span> {user.Role_ID}</p>
        <p><span className="label">Registration Date:</span> {new Date(user.Registration_Date).toLocaleDateString()}</p>
        <p><span className="label">Gender:</span> {user.Gender}</p>
        <p><span className="label">Date of Birth:</span> {new Date(user.Date_of_Birth).toLocaleDateString()}</p>
        <p><span className="label">Email:</span> {user.Email}</p>
        <p><span className="label">Phone:</span> {user.Phone}</p>
        <p><span className="label">Address:</span> {user.Address}</p>
      </div>

      <button 
      className="update-profile-btn" 
      onClick={() => navigate('/UpdateProfile2')}
    >
      Update Profile
    </button>
    </div>
  );
};


export default ShowRoleID2;
