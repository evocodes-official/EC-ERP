import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

const LinkedInCallback = () => {
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const errorParam = urlParams.get('error');

      if (errorParam) {
        setStatus('error');
        setError(errorParam);
        // Notify the opener window about the error
        if (window.opener) {
          window.opener.postMessage(
            { type: 'LINKEDIN_AUTH_ERROR', error: errorParam },
            window.location.origin
          );
        }
        return;
      }

      if (!code) {
        setStatus('error');
        setError('No authorization code received from LinkedIn.');
        if (window.opener) {
          window.opener.postMessage(
            { type: 'LINKEDIN_AUTH_ERROR', error: 'No authorization code received' },
            window.location.origin
          );
        }
        return;
      }

      try {
        // Exchange the authorization code for an access token
        // NOTE: In production, this should be done on your backend server
        // to keep your client secret secure. This is a simplified client-side
        // example for demonstration purposes.
        const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: `${window.location.origin}/auth/linkedin/callback`,
            client_id: 'YOUR_LINKEDIN_CLIENT_ID', // Replace with your actual Client ID
            client_secret: 'YOUR_LINKEDIN_CLIENT_SECRET', // Replace with your actual Client Secret
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange authorization code for access token');
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Fetch user profile from LinkedIn
        const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch LinkedIn user profile');
        }

        const profileData = await profileResponse.json();

        // Store user data in localStorage
        localStorage.setItem('linkedin_user', JSON.stringify({
          name: profileData.name || '',
          email: profileData.email || '',
          picture: profileData.picture || '',
          sub: profileData.sub || '',
        }));

        setStatus('success');

        // Notify the opener window about successful authentication
        if (window.opener) {
          window.opener.postMessage(
            { type: 'LINKEDIN_AUTH_SUCCESS', user: profileData },
            window.location.origin
          );
        }

        // Auto-close the popup after success
        setTimeout(() => {
          if (window.opener) {
            window.close();
          } else {
            // If opened directly (not in popup), redirect to home
            window.location.href = '/';
          }
        }, 1500);
      } catch (err) {
        setStatus('error');
        setError(err.message || 'LinkedIn authentication failed.');
        if (window.opener) {
          window.opener.postMessage(
            { type: 'LINKEDIN_AUTH_ERROR', error: err.message },
            window.location.origin
          );
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-[#0A66C2] rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <Loader2 size={32} className="mx-auto mb-4 text-[#0A66C2] animate-spin" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Connecting to LinkedIn...</h2>
            <p className="text-sm text-gray-500">Please wait while we authenticate your account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Successful!</h2>
            <p className="text-sm text-gray-500">You've been signed in with LinkedIn. Redirecting...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center">
              <XCircle size={32} className="text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Failed</h2>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold rounded-lg text-sm transition-all"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LinkedInCallback;