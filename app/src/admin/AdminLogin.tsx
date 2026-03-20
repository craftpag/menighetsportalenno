import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { adminLogin } from './adminStore';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await adminLogin(password);
      if (success) {
        onLogin();
      } else {
        setError('Feil passord');
        setPassword('');
      }
    } catch {
      setError('Kunne ikke koble til serveren');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#2D5A4A]/10 flex items-center justify-center">
            <Lock className="w-7 h-7 text-[#2D5A4A]" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
            Admin
          </h1>
          <p className="text-sm text-[#636363] mt-1">Menighetsportalen</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Passord"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            autoFocus
            disabled={isLoading}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-[#2D5A4A] hover:bg-[#1F3D32] text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Logger inn...
              </>
            ) : (
              'Logg inn'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
