export default function AdminLoading() {
  return (
    <main className="min-h-screen bg-background">
      <header className="px-6 pt-8">
        <div className="mx-auto max-w-4xl">
          <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </header>

      <section className="px-6 pt-6">
        <div className="mx-auto max-w-4xl">
          <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-10 w-48 animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-4 w-96 animate-pulse rounded-md bg-muted" />
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="mt-6 h-80 animate-pulse rounded-md bg-muted" />
        </div>
      </section>
    </main>
  );
}
