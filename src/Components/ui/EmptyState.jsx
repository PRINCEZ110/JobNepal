import { HiBriefcase } from 'react-icons/hi2'

export default function EmptyState({
  icon: Icon = HiBriefcase,
  title = 'Nothing here yet',
  description = '',
  action,
  compact = false,
}) {
  return (
    <div className={`empty-state ${compact ? 'empty-state--compact' : ''}`}>
      <div className="empty-state-icon" aria-hidden="true">
        <Icon />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-desc">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  )
}