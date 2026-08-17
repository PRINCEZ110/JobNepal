import { Skeleton } from '../ui/Skeleton.jsx'

export function JobCardSkeleton() {
  return (
    <div className="jobcard jobcard--skeleton" aria-hidden="true">
      <div className="jobcard-logo">
        <Skeleton width={52} height={52} borderRadius={10} />
      </div>
      <div className="jobcard-main">
        <Skeleton width="55%" height={18} />
        <div style={{ marginTop: 10 }}>
          <Skeleton width="35%" height={13} />
        </div>
        <div className="jobcard-meta" style={{ marginTop: 14 }}>
          <Skeleton width={110} height={12} />
          <Skeleton width={90} height={12} />
          <Skeleton width={70} height={12} />
        </div>
      </div>
      <div className="jobcard-actions">
        <Skeleton width={72} height={32} borderRadius={8} />
        <Skeleton width={92} height={32} borderRadius={8} />
      </div>
    </div>
  )
}

export function JobGridSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </>
  )
}

export default JobCardSkeleton