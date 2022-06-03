import { logout } from "../lib/twitter"

const Header = () => {

    return (
        <div className="py-4 shadow px-4 flex items-center justify-between">
            <div className="uppercase">Twitter Direct message testing</div>
            <button
                onClick={logout}
                type="button"
                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Log Out
            </button>
        </div>
    )
}

export default Header