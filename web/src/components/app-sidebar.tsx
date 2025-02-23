"use client"

import * as React from "react"
import {
  Command,
  SquareTerminal,
  Box,
  Tag,
  User,
  ShoppingCart,
} from "lucide-react"

import { NavMain } from "../components/nav-main";
import { NavbarHeader } from "../components/navbar-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../components/ui/sidebar"

// This is sample data.
const data = {
  brand: 
    {
      name: "Inventory Pro.",
      logo: Command,
      plan: "Free",
    },

  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [], // Ensure no dropdown items for Dashboard
    },
    {
      title: "Product",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Create Product",
          url: "/product/create",
        },
        {
          title: "View Products",
          url: "/product",
        },
      ],
    },
    {
      title: "Category",
      url: "#",
      icon: Tag,
      items: [
        {
          title: "Create Category",
          url: "/category/create",
        },
        {
          title: "View Categories",
          url: "/category",
        },
      ],
    },
    {
      title: "Dealer",
      url: "#",
      icon: User,
      items: [
        {
          title: "Create Dealer",
          url: "/dealer/create",
        },
        {
          title: "View Dealers",
          url: "/dealer",
        },
      ],
    },
    {
      title: "Order",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Create Order",
          url: "/order/create",
        },
        {
          title: "View Orders",
          url: "/order",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavbarHeader brand={data.brand} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
