import { useRef, useState } from 'react';
import { C, sans, mono } from '../tokens';

const MAX_SIZE_MB = 10;
const ACCEPT = '.pdf,.jpg,.jpeg,.png,.gif,.mp3,.mp4,.wav,.zip';

export default function FileUpload({ id, value, onChange, accept = ACCEPT, maxSizeMb = MAX_SIZE_MB }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (file) => {
    if (!file) return;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File must be under ${maxSizeMb} MB`);
      return;
    }
    setError('');
    onChange({ name: file.name, size: file.size, type: file.type, file });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const clear = (e) => {
    e.stopPropagation();
    setError('');
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
        aria-label="Upload file"
        style={{
          padding: value ? '12px 16px' : '24px 16px',
          borderRadius: 8,
          border: `1.5px dashed ${dragOver ? C.teal : error ? C.error : C.border}`,
          background: dragOver ? C.tealDim : C.surface,
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'border-color .2s, background .2s',
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
        />

        {value ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ textAlign: 'left', minWidth: 0 }}>
              <div style={{ ...sans, fontSize: 14, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {value.name}
              </div>
              <div style={{ ...mono, fontSize: 10, color: C.inkLight, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>
                {formatSize(value.size)}
              </div>
            </div>
            <button
              onClick={clear}
              type="button"
              aria-label="Remove file"
              style={{
                ...mono,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                color: C.error,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                padding: '4px 8px',
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 8, opacity: 0.4 }}>
              <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a1 1 0 001 1h14a1 1 0 001-1v-2" stroke={C.inkMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ ...sans, fontSize: 14, color: C.inkMuted }}>
              Drop a file here or click to browse
            </div>
            <div style={{ ...mono, fontSize: 10, color: C.inkLight, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 4 }}>
              Max {maxSizeMb} MB
            </div>
          </>
        )}
      </div>

      {error && (
        <p role="alert" aria-live="polite" style={{ ...sans, fontSize: 13, color: C.error, marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}
