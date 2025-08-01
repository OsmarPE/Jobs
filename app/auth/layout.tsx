

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="body-jobs">
        <div className='container container--auth'>
            <div className="circle circle-left-header"></div>
            {children}
        </div>
    </main>
  )
}
