import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import supabase from "../config/supabaseClient";

const ShowRoleID3 = () => {
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getCookie('user_id');

    if (!userId) {
      setFormError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchDoctorData = async () => {
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
        setDoctor(null);
      } else {
        setDoctor(data);
        setFormError(null);
      }
      setLoading(false);
    };

    fetchDoctorData();
  }, []);

  if (loading) {
    return <div className="loading">Loading doctor data...</div>;
  }

  if (formError) {
    return <div className="error">{formError}</div>;
  }

  if (!doctor) {
    return <div className="no-data">No doctor found</div>;
  }

  return (
    <div className="doctor-profile">
      <h2>Doctor Profile</h2>
      <div className="doctor-info">
        <p><span className="label">User ID:</span> {doctor.User_ID}</p>
        <p><span className="label">Name:</span> {doctor.Name}</p>
        <p><span className="label">Role ID:</span> {doctor.Role_ID}</p>
        <p><span className="label">Registration Date:</span> {new Date(doctor.Registration_Date).toLocaleDateString()}</p>
        <p><span className="label">Gender:</span> {doctor.Gender}</p>
        <p><span className="label">Date of Birth:</span> {new Date(doctor.Date_of_Birth).toLocaleDateString()}</p>
        <p><span className="label">Email:</span> {doctor.Email}</p>
        <p><span className="label">Phone:</span> {doctor.Phone}</p>
        <p><span className="label">Address:</span> {doctor.Address}</p>
      </div>
    </div>
  );
};


export default ShowRoleID3;
