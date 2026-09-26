import { NavLink } from "react-router";
import { Home, Film, Tv, Bookmark } from "lucide-react";

const MobileFooter = () => {

    const navItems = [
        {
            to: "/browse",
            label: "Home",
            icon: Home,
        },
        {
            to: "/movies",
            label: "Movies",
            icon: Film,
        },
        {
            to: "/tvshows",
            label: "TV Shows",
            icon: Tv,
        },
        {
            to: "/watchlist",
            label: "Watchlist",
            icon: Bookmark,
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
            <div className="flex items-center justify-around bg-zinc-950/95 backdrop-blur-xl border-t border-white/10 px-2 py-2">

                {navItems.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `relative flex flex-col items-center justify-center gap-1 w-20 py-1 transition-colors duration-200
                            ${
                                isActive
                                    ? "text-purple-500"
                                    : "text-zinc-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    size={22}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />

                                <span className="text-[11px] font-medium">
                                    {label}
                                </span>

                                {isActive && (
                                    <span className="absolute -bottom-1 w-3 h-1 rounded-full bg-purple-500" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}

            </div>
        </nav>
    );
};

export default MobileFooter;