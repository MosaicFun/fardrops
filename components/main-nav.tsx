"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"
import CustomLink from "./custom-link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"
import React from "react"
import { Button } from "./ui/button"

export function MainNav() {
  return (
    <div className="flex items-center space-x-2 lg:space-x-6">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0 space-x-3">
          <Image src="/logo.png" alt="Frames Simple Manager" width="32" height="32" className="rounded-full" />
          <span className="text-lg">fardrops</span>
        </Button>
      </CustomLink>
      <div className="items-end">
      <NavigationMenu>
        <NavigationMenuList>
          {/*<NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="https://warpcast.com/~/channel/loyalty" target="_blank" title="/Loyalty Channel">
                what does loyalty mean to you? share your insights on using or building loyalty platforms, incentive mechanisms, and best-in-class rewards.
                </ListItem>
                <ListItem href="/about" title="About this app">
                  A simple manager to the fastest way to make a Farcaster Frame
                </ListItem>
                <ListItem href="https://framesjs.org/" target="_blank" title="Frames.js">
                  The fastest way to make a Farcaster Frames
                </ListItem>
                <ListItem href="https://warpcast.com/~/developers/frames" target="_blank" title="Frames Validator">
                  Warpcast Frames Validator
                </ListItem>
              </ul>
            </NavigationMenuContent>
  </NavigationMenuItem>*/}
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/builder/new-campaign"
              className={navigationMenuTriggerStyle()}
            >
              Builder
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/campaigns"
              className={navigationMenuTriggerStyle()}
            >
              Campaigns
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
