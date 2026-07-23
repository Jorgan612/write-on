import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User } from '../interfaces/interfaces';

interface AcceptInviteProps {
    currentUser: User | null;
    setCurrentUser?: (user: User) => void;
    setSignedIn?: (signedIn: boolean) => void;
}

function AcceptInvite({ currentUser, setCurrentUser, setSignedIn }: AcceptInviteProps) {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setError('Missing invitation token.');
            setLoading(false);
            return;
        }

        const verifyInvitation = async () => {
            try {
                const response = await fetch('http://localhost:5000/groups/accept-invite', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    if (data.accountExists) {
                        if (data.token) {
                            localStorage.setItem('token', data.token);
                        }

                        if (setCurrentUser && data.user) {
                            setCurrentUser(data.user);
                        }

                        if (setSignedIn) {
                            setSignedIn(true);
                        }

                        alert('Welcome back! You have successfully joined the group.');
                        navigate('/dashboard');
                    } else {
                        const targetEmail = data.invitedEmail || data.email;
                        
                        alert('Welcome! There is no existing account under that email. Please create your account.');
                        navigate(`/signup?email=${encodeURIComponent(targetEmail)}&joinGroup=${data.groupId}`);
                    }
                } else {
                    setError(data.message || 'Failed to process invitation.');
                }
            } catch (err) {
                console.error(err);
                setError('An error occurred while connecting to the server.');
            } finally {
                setLoading(false);
            }
        };

        verifyInvitation();
    }, [token, currentUser, navigate, setCurrentUser]);

    if (loading) return <div className="loading-screen">Processing your group invitation...</div>;
    if (error) return <div className="error-screen"><h3>Error</h3><p>{error}</p></div>;

    return null;
}

export default AcceptInvite;