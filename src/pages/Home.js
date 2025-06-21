import supabase from "../config/supabaseClient"
import {useEffect, useState} from 'react'

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [roles, setRoles] = useState(null)
  
  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase
        .from('Role')
        .select()

        if(error) {
          setFetchError('Could not fetch the smoothies')
          setRoles(null)
          console.log(error)
        }

        if(data) {
          setFetchError(null)
          setRoles(data)
        }
    }

    fetchRoles()

  }, [])

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      
      {roles && (
        <div className="roles">
          {roles.map((role) => (
            <p key={role.Role_ID}>{role.Role_ID} {role.Role_Name}</p>
          ))}
        </div>
      )}
    </div>
  )
  
}

export default Home