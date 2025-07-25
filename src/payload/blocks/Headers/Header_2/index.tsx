"use client"

import { Home, Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Header_2_Block } from "~/payload-types"
import { cn } from "~/styles/utils"
import { Button } from "~/ui/button"

export default function Header_2({ menuItems }: Header_2_Block) {
	const [menuState, setMenuState] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	return (
		<header>
			<nav
				data-state={menuState && 'active'}
				className={cn('z-20 w-full border-b transition-colors duration-150', isScrolled && 'bg-background/50 backdrop-blur-3xl')}>
				<div className="mx-auto max-w-5xl px-6 transition-all duration-300">
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full items-center justify-between gap-12 lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="flex items-center space-x-2">
								<Home />
							</Link>

							<button
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
								<Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>

							<div className="hidden lg:block">
								<ul className="flex gap-8 text-sm">
									{menuItems.map((item, index) => (
										<li key={index}>
											<Link
												href={item.href}
												className="text-muted-foreground hover:text-accent-foreground block duration-150">
												<span>{item.label}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="bg-background absolute top-full in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-base">
									{menuItems.map((item, index) => (
										<li key={index}>
											<Link
												href={item.href}
												className="text-muted-foreground hover:text-accent-foreground block duration-150">
												<span>{item.label}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
								<Button
									asChild
									variant="outline"
									size="sm">
									<Link href="#">
										<span>Login</span>
									</Link>
								</Button>
								<Button
									asChild
									size="sm">
									<Link href="#">
										<span>Sign Up</span>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	)
}
