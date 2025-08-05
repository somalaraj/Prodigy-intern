import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from './AuthForm';

export const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleRegister = async (data: { email: string; password: string; fullName: string }) => {
    setLoading(true);
    setError('');

    const { error } = await signUp(data.email, data.password, data.fullName);

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleRegister}
      loading={loading}
      error={error}
    />
  );
};