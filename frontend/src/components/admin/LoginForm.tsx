'use client';

import { FormEvent, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { loginAdmin } from '@/src/lib/api';

interface LoginFormProps {
  onLogin: (token: string) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [token, setToken] = useState('admin-dev-token');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token.trim()) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await loginAdmin(token.trim());
      onLogin(result.access_token);
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="browser-shell border-none bg-transparent shadow-none">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>管理员登录</CardTitle>
            <CardDescription>第一期只保留 Token 登录、文件上传与索引重建。</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={submit}>
          <label className="space-y-2 text-sm font-medium text-foreground">
            <span>管理 Token</span>
            <Input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="输入管理 Token"
            />
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? '登录中…' : '登录'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
