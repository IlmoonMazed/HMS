import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import supabase from "../config/supabaseClient";

const UpdateProfile2 = () => {
  const navigate = useNavigate();
  const userId = getCookie('user_id');

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setFormError("User not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("Patient")
        .select("Height, Weight, Blood_Type, Emergency_Contact")
        .eq("User_ID", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.log(error);
        setFormError("Could not fetch profile data");
      } 

      if (data) {
        setHeight(data.Height || "");
        setWeight(data.Weight || "");
        setBloodType(data.Blood_Type || "");
        setEmergencyContact(data.Emergency_Contact || "");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!userId) {
      setFormError("User not logged in");
      return;
    }

    const { data: existing } = await supabase
      .from("Patient")
      .select("User_ID")
      .eq("User_ID", userId)
      .single();

    let result;
    if (existing) {
      result = await supabase
        .from("Patient")
        .update({
          Height: height,
          Weight: weight,
          Blood_Type: bloodType,
          Emergency_Contact: emergencyContact
        })
        .eq("User_ID", userId);
    } else {
      result = await supabase
        .from("Patient")
        .insert({
          User_ID: userId,
          Height: height,
          Weight: weight,
          Blood_Type: bloodType,
          Emergency_Contact: emergencyContact,
          Referential_Code: 0  // or generate if needed
        });
    }

    if (result.error) {
      console.log(result.error);
      setFormError("Update failed");
    } else {
      setFormError(null);
      navigate("/2");  // or wherever you want to redirect
    }
  };

  return (
    <div className="update-profile">
      <h2>Update Patient Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Height (cm):</label>
        <input 
          type="number" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
        />

        <label>Weight (kg):</label>
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
        />

        <label>Blood Type:</label>
        <select 
          value={bloodType} 
          onChange={(e) => setBloodType(e.target.value)}
        >
          <option value="">Select blood type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label>Emergency Contact:</label>
        <input 
          type="text" 
          placeholder="+880 1X XXXXXXXX"
          value={emergencyContact} 
          onChange={(e) => setEmergencyContact(e.target.value)} 
        />

        <button type="submit">Update Profile</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile2;
