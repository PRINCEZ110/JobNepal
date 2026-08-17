import { Skeleton } from '../ui/Skeleton.jsx'

export function FjCardSkeleton() {
  return (
    <div className="fj-card fj-card--skeleton" aria-hidden="true">
      <div className="fj-card-top">
        <Skeleton width={48} height={48} borderRadius={10} />
        <Skeleton width={34} height={34} borderRadius={10} />
      </div>
      <Skeleton width="88%" height={17} />
      <div style={{ marginTop: 8 }}>
        <Skeleton width="52%" height={13} />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <Skeleton width={84} height={12} />
        <Skeleton width={62} height={12} />
        <Skeleton width={70} height={12} />
      </div>
      <div className="fj-card-foot" style={{ marginTop: 20 }}>
        <Skeleton width="45%" height={14} />
        <Skeleton width={100} height={12} />
      </div>
      <Skeleton width="100%" height={36} borderRadius={8} style={{ marginTop: 14 }} />
    </div>
  )
}

export default FjCardSkeleton