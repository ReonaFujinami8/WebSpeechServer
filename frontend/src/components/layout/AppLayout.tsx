import { AppHeader } from "./AppHeader";
import type { AppLayoutProps } from "../../types/appLayoutProps";

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="app-layout">
            <AppHeader />

            <main className="app-main">
                {children}
            </main>
        </div>
    )
}