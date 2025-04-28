import { Menu, School } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DarkMode from '../../DarkMode'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Navbar = () => {
  const user = true;

  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
      {/* Desktop */}
      <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-3'>

          <School size={"30"} />
          <h1 className='hidden md:block font-extrabold text-2xl'>E-Learning</h1>
        </div>
        {/* user icon and dark mode icon */}



        <div className='flex items-center gap-8'>
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to="my-learning">
                        My Learning
                      </Link>


                    </DropdownMenuItem>

                    <DropdownMenuItem>
                    <Link to="profile">
                        Edit Profile
                      </Link>

                    </DropdownMenuItem>


                    <DropdownMenuItem>
                      Logout
                    </DropdownMenuItem>

                  </DropdownMenuGroup>



                  <DropdownMenuSeparator />


                  <DropdownMenuItem>
                    Dashboard
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex items-center gap-2'>
                <Button variant="outline">Login</Button>
                <Button >Signup</Button>
              </div>
            )
          }
          <DarkMode />
        </div>




      </div>

      {/* Mobile device */}
      <div className='flex md:hidden items-center justify-between p-4 h-full'>
        <h1 className=' font-extrabold text-2xl'>E-Learning</h1>
        <MobileNavbar />
      </div>

    </div>
  )
}

export default Navbar;


const MobileNavbar = () => {
  const role = "instructer"
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-300"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col justify-between">
        <div>
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between mt-10 mb-4">
            <SheetTitle className="font-extrabold text-2xl">E-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>

          {/* Divider */}
          <div className="border-b border-gray-200 mb-4" />

          {/* Navigation */}
          <nav className="flex flex-col font-bold space-y-4 px-4">
            <button className="text-left hover:text-primary transition">My Learning</button>
            <button className="text-left hover:text-primary transition">Edit Profile</button>
            <button className="text-left text-red-500 hover:text-red-600 transition">Logout</button>
          </nav>
        </div>

        {/* Footer */}

        {
          role == "instructer" && (
            <SheetFooter className="mt-6">
              <SheetClose asChild>
                <Button type="button">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }

      </SheetContent>
    </Sheet>

  )
}
