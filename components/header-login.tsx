import { MainNav } from "./main-nav"
import SignInButton from "./signin-button"

export default function HeaderLogin() {
  return (
    <header className="sticky flex justify-center mt-6">
      <div className="flex items-center justify-end w-full h-16 max-w-7xl px-4 mx-auto sm:px-6">
        <SignInButton />
      </div>
    </header>
  )
}
