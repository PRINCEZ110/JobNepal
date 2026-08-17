export function Skeleton({ width, height = 16, borderRadius = 8, className = '', style }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width: width || '100%', height, borderRadius, ...style }}
      aria-hidden="true"
    />
  )
}

export default Skeleton