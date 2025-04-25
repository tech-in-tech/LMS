import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
const Course = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className='relative'>
          <img
            className='w-full h-36  rounded-t-lg'
            src="https://www.classcentral.com/report/wp-content/uploads/2023/09/bcg_docker_banner.png" alt="" />

        </div>
        <CardContent className="px-5 py-2 space-y-3">
          <h1 className='hover:underline font-bold text-lg truncate'>Docker Complete course in Hindi</h1>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className='font-medium text-sm'>Anubhav Sharma</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">Advance</Badge>
          </div>
          <div className='text-lg font-bold'>
            <span>₹499</span>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default Course
