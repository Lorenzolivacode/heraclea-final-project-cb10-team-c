

import React, { useState } from 'react';
import styles from './profileForm.module.scss';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string; 
}

interface ProfileFormProps {
  userData: UserData;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    
    if (isEditing) {
      console.log("Dati salvati:", formData);
      
    }
  };

  return (
    <form className={styles.form}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Cognome:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password} 
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
      <button type="button" onClick={toggleEdit}>
        {isEditing ? 'Salva' : 'Modifica'}
      </button>
    </form>
  );
};

export default ProfileForm;
