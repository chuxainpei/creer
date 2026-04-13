'use client';

import { useMemo, useState } from 'react';

interface UploadPanelProps {
  token: string;
}

export default function UploadPanel({ token }: UploadPanelProps) {
  const [officialFile, setOfficialFile] = useState('');
  const [graduateFile, setGraduateFile] = useState('');
  const [lastSync, setLastSync] = useState('未同步');

  const disabled = useMemo(() => !token, [token]);

  return (
    <section className="card" style={{ padding: '1rem' }}>
      <h3 style={{ margin: '0.2rem 0 0.8rem', fontSize: '1rem' }}>内容更新</h3>
      <div style={{ display: 'grid', gap: '0.9rem' }}>
        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span style={{ fontWeight: 600 }}>上传官方资料</span>
          <input
            type="file"
            disabled={disabled}
            onChange={(event) => setOfficialFile(event.target.files?.[0]?.name || '')}
          />
          <small style={{ color: 'var(--soft-ink)' }}>{officialFile || '尚未选择文件'}</small>
        </label>

        <label style={{ display: 'grid', gap: '0.35rem' }}>
          <span style={{ fontWeight: 600 }}>上传毕业去向数据</span>
          <input
            type="file"
            disabled={disabled}
            onChange={(event) => setGraduateFile(event.target.files?.[0]?.name || '')}
          />
          <small style={{ color: 'var(--soft-ink)' }}>{graduateFile || '尚未选择文件'}</small>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.8rem' }}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setLastSync(new Date().toLocaleString('zh-CN'))}
            style={{
              border: 0,
              borderRadius: '10px',
              background: disabled ? '#94a3b8' : '#153a66',
              color: '#fff',
              fontWeight: 700,
              padding: '0.5rem 0.85rem',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            重新索引
          </button>
          <span style={{ fontSize: '0.84rem', color: 'var(--soft-ink)' }}>最后同步: {lastSync}</span>
        </div>
      </div>
    </section>
  );
}
