import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      padding: '4rem 2rem',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Project Not Found</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        The project you&apos;re looking for doesn&apos;t exist or has been deleted.
      </p>
      <Link
        href="/"
        style={{
          color: '#4f32ce',
          textDecoration: 'none',
          fontWeight: 500
        }}
      >
        ← Back to Projects
      </Link>
    </div>
  )
}
