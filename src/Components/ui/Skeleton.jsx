export function Skeleton({ width, height = 16, borderRadius = 6, style, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width: width || '100%',
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease infinite',
        ...style,
      }}
    />
  )
}

export function JobCardSkeleton() {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, border: '1px solid #eaeef5',
      padding: 20, display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton width={48} height={48} borderRadius={8} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton width="70%" height={14} />
          <Skeleton width="50%" height={12} />
        </div>
      </div>
      <Skeleton width="100%" height={12} />
      <Skeleton width="90%" height={12} />
      <div style={{ display: 'flex', gap: 12 }}>
        <Skeleton width={80} height={10} borderRadius={4} />
        <Skeleton width={80} height={10} borderRadius={4} />
        <Skeleton width={100} height={10} borderRadius={4} />
      </div>
    </div>
  )
}
