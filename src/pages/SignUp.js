import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("M");
  const [roleId, setRoleId] = useState("1");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !dob || !phone || !address || !gender || !roleId) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("User")
      .select("Email")
      .eq("Email", email)
      .single();

    if (existingUser) {
      setFormError("Email already registered.");
      return;
    }

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.log(checkError);
      setFormError("Something went wrong. Please try again.");
      return;
    }

    // Insert new user
    const { data, error } = await supabase
      .from("User")
      .insert([
        {
          Name: name,
          Email: email,
          Password: password, // ⚠️ You should hash this in a real app
          Role_ID: roleId,
          Registration_Date: new Date().toISOString(),
          Gender: gender,
          Date_of_Birth: dob,
          Phone: phone,
          Address: address,
        }
      ])
      .select()
      .single();

    if (error) {
      console.log(error);
      setFormError("Could not complete sign up.");
    } else {
      setFormError(null);
      navigate("/SignIn");
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <label>Role:</label>
        <select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
          <option value="1">Doctor</option>
          <option value="2">Patient</option>
          <option value="3">Employee</option>
        </select>

        <button type="submit">Sign Up</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default SignUp;
