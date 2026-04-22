'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { DatabaseBackup, FileUp, RefreshCw } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { getAdminStatus, reindexAdmin, uploadAdminFile } from '@/src/lib/api';
import type { AdminStatus } from '@/src/lib/types';

interface UploadPanelProps {
  token: string;
}

export default function UploadPanel({ token }: UploadPanelProps) {
  const [officialFile, setOfficialFile] = useState<File | null>(null);
  const [graduateFile, setGraduateFile] = useState<File | null>(null);
  const [status, setStatus] = useState<AdminStatus>({
    ok: false,
    official_files: 0,
    graduate_files: 0,
    official_chunks: 0,
    graduate_chunks: 0,
    last_reindexed: null,
    skipped_files: [],
  });
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState<'official' | 'graduate' | 'reindex' | null>(null);

  const disabled = useMemo(() => !token, [token]);
  const lastSyncLabel = status.last_reindexed || '未同步';

  useEffect(() => {
    if (!token) {
      return;
    }

    void getAdminStatus(token)
      .then(setStatus)
      .catch(() => {
        setFeedback('暂时无法读取当前后台状态。');
      });
  }, [token]);

  const selectFile = (kind: 'official' | 'graduate') => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (kind === 'official') {
      setOfficialFile(file);
      return;
    }
    setGraduateFile(file);
  };

  async function upload(kind: 'official' | 'graduate') {
    const file = kind === 'official' ? officialFile : graduateFile;
    if (!token || !file) {
      return;
    }

    setLoading(kind);
    setFeedback('');
    try {
      const path = kind === 'official' ? '/api/v1/admin/upload/official' : '/api/v1/admin/upload/graduate-data';
      const result = await uploadAdminFile(path, token, file);
      setFeedback(`${result.filename} 上传成功`);
      setStatus(await getAdminStatus(token));
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : '上传失败');
    } finally {
      setLoading(null);
    }
  }

  async function reindex() {
    if (!token) {
      return;
    }

    setLoading('reindex');
    setFeedback('');
    try {
      const nextStatus = await reindexAdmin(token);
      setStatus(nextStatus);
      setFeedback('索引已重建，问答页面会读取最新资料。');
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : '重建索引失败');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1.2fr]">
      <Card className="browser-shell border-none bg-transparent shadow-none">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-foreground">
              <DatabaseBackup className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>系统状态</CardTitle>
              <CardDescription>用于确认当前知识库是否已经接入最新官方资料与毕业去向数据。</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-border/70 bg-white/82 p-4">
            <p className="text-sm text-muted-foreground">官方资料文件</p>
            <p className="mt-2 text-2xl font-semibold">{status.official_files}</p>
          </div>
          <div className="rounded-[1.25rem] border border-border/70 bg-white/82 p-4">
            <p className="text-sm text-muted-foreground">毕业去向文件</p>
            <p className="mt-2 text-2xl font-semibold">{status.graduate_files}</p>
          </div>
          <div className="rounded-[1.25rem] border border-border/70 bg-white/82 p-4">
            <p className="text-sm text-muted-foreground">官方资料切片</p>
            <p className="mt-2 text-2xl font-semibold">{status.official_chunks}</p>
          </div>
          <div className="rounded-[1.25rem] border border-border/70 bg-white/82 p-4">
            <p className="text-sm text-muted-foreground">毕业去向切片</p>
            <p className="mt-2 text-2xl font-semibold">{status.graduate_chunks}</p>
          </div>
          <div className="sm:col-span-2 rounded-[1.25rem] border border-border/70 bg-white/90 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">最后同步</p>
              <Badge variant={status.last_reindexed ? 'success' : 'warning'}>
                {status.last_reindexed ? '已建立索引' : '待建立索引'}
              </Badge>
            </div>
            <p className="mt-2 text-sm font-medium text-foreground">{lastSyncLabel}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="browser-shell border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle>资料更新</CardTitle>
          <CardDescription>文件上传完成后，记得执行一次重新索引。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4">
            <label className="space-y-2 text-sm font-medium text-foreground">
              <span>上传官方资料</span>
              <input type="file" disabled={disabled} onChange={selectFile('official')} />
              <p className="text-xs text-muted-foreground">{officialFile?.name || '支持 PDF / DOCX / TXT / MD'}</p>
            </label>
            <Button
              type="button"
              variant="outline"
              disabled={disabled || !officialFile || loading !== null}
              className="gap-2 rounded-2xl"
              onClick={() => void upload('official')}
            >
              <FileUp className="h-4 w-4" />
              {loading === 'official' ? '上传中…' : '上传官方资料'}
            </Button>

            <label className="space-y-2 text-sm font-medium text-foreground">
              <span>上传毕业去向数据</span>
              <input type="file" disabled={disabled} onChange={selectFile('graduate')} />
              <p className="text-xs text-muted-foreground">{graduateFile?.name || '支持 XLSX / CSV'}</p>
            </label>
            <Button
              type="button"
              variant="outline"
              disabled={disabled || !graduateFile || loading !== null}
              className="gap-2 rounded-2xl"
              onClick={() => void upload('graduate')}
            >
              <FileUp className="h-4 w-4" />
              {loading === 'graduate' ? '上传中…' : '上传毕业去向数据'}
            </Button>
          </div>

          <div className="rounded-[1.3rem] border border-border/70 bg-secondary/45 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">重新索引</p>
                <p className="text-sm leading-6 text-muted-foreground">上传新资料后执行，让问答接口读取最新内容。</p>
              </div>
              <Button type="button" disabled={disabled || loading !== null} className="gap-2" onClick={() => void reindex()}>
                <RefreshCw className="h-4 w-4" />
                {loading === 'reindex' ? '重建中…' : '重新索引'}
              </Button>
            </div>
          </div>

          {feedback ? <p className="text-sm text-muted-foreground">{feedback}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
