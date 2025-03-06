// div which is shown while page is loading
export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-500 border-t-transparent" />
      </div>
    );
  }  