import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { setCookie } from "../utils/cookie"
import supabase from "../config/supabaseClient"

const SignIn = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setFormError('Fill in email and password correctly');
      return;
    }
  
    const { data, error } = await supabase
      .from('User')
      .select('User_ID, Email, Password, Role_ID')
      .eq('Email', email)
      .single();
  
    if (error || !data) {
      console.log(error);
      setFormError('Wrong email or password');
      return;
    }
  
    if (data.Password !== password) {
      setFormError('Wrong email or password');
      return;
    }

    setCookie('user_id', data.User_ID);
  
    setFormError(null);
    navigate(`/${data.Role_ID}`);
  };
  
  

  return (
    <div className="signIn">
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email:</label>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
  
        
  
        <button type="submit">Sign In</button>

        {formError && <p className="error">{ formError }</p>}
      </form>

      <div className="signUp-link">
        <p>Don't have an account? <span onClick={() => navigate('/signUp')} className="signUp-button">Sign Up</span></p>
      </div>
    </div>
  )
}

export default SignIn