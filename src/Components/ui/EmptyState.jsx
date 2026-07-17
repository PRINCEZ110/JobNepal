import { HiBriefcase } from 'react-icons/hi2'

export default function EmptyState({
  icon = HiBriefcase,
  title = 'Nothing here yet',
  description = '',
  action,
}) {
  const Icon = icon

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '60px 24px', textAlign: 'center',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', background: '#f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16, color: '#94a3b8', fontSize: 28,
      }}>
        <Icon />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>{title}</h3>
      {description && (
        <p style={{ fontSize: 14, color: '#64748b', margin: '0 0 20px', maxWidth: 360, lineHeight: 1.6 }}>{description}</p>
      )}
      {action}
    </div>
  )
}
