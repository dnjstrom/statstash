import { useLocation } from "preact-iso"
export const NotFound = () => {
  const location = useLocation()

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center flex flex-col gap-2">
      <h1 className="text-2xl">Not Found</h1>
      <p>The requested page does not exist</p>
      <pre>{location.url}</pre>
    </div>
  )
}
