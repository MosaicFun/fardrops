import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./ui/button"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const { login } = usePrivy();

  return (
      <Button onClick={login} className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg" {...props} >Sign In</Button>
  )
}
