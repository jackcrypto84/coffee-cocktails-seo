export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
      <div className="rounded-[2.5rem] bg-white p-10 shadow-[0_20px_60px_rgba(32,24,18,0.08)] sm:p-14">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Not found</div>
        <h1 className="mt-4 font-heading text-5xl text-ink">That page is not in the content system yet.</h1>
        <p className="mt-5 text-lg leading-8 text-stone-700">
          Try the coffee hub, the cocktail hub, or the programmatic guides page to continue exploring.
        </p>
      </div>
    </div>
  );
}

