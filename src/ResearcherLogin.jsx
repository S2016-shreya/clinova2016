
import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function ResearcherLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (loginError) throw loginError;

      const { data: researcher, error: accessError } =
        await supabase
          .from('researcher_accounts')
          .select('user_id')
          .eq('user_id', data.user.id)
          .maybeSingle();

      if (accessError || !researcher) {
        await supabase.auth.signOut();
        setError('This account is not authorized as a researcher.');
        return;
      }

      onLogin(data.user);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '60px auto' }}>
      <h2>Clinova AI — Researcher Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Researcher email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
