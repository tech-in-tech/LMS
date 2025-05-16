import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '../../../features/api/courseApi'
import { toast } from 'sonner'

export const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("")
  const [category, setCategory] = useState("")
  const [createCourse, { data, error, isSuccess, isLoading }] = useCreateCourseMutation();


  const navigate = useNavigate();


  const getSelectedCategory = (value) => {
    setCategory(value);
  }
  const createCourseHandler = async () => {
    await createCourse({courseTitle, category})

  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course Created Successfully.");
      navigate("/admin/course")
    }
  },[isSuccess,error]) 






  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'> Lets add course, add some basic course details for your new course</h1>
        <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      </div>
      <div className='space-y-4'>
        <div className=' flex flex-col gap-3'>
          <Label>Title</Label>
          <Input
            type="text"

            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value
            )}
            placeholder="Your Course Name" />
        </div>
        <div className=' flex flex-col gap-3'>
          <Label>Category</Label>
          <Select
            onValueChange={getSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="nextjs">Next JS</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="blockchain">Blockchain Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                <SelectItem value="app-dev">App Development</SelectItem>
                <SelectItem value="ios-dev">IOS Development</SelectItem>
                <SelectItem value="ethical-hacking">Ethical Hacking</SelectItem>
                <SelectItem value="docker">Docker Course</SelectItem>
                <SelectItem value="cloud">Cloud Course</SelectItem>
                <SelectItem value="cloud">Cloud Course</SelectItem>
                <SelectItem value="aws">AWS Course</SelectItem>
                <SelectItem value="system-engineering">System Engineering</SelectItem>
                <SelectItem value="python">Python Programming</SelectItem>
                <SelectItem value="dsa">DSA Course</SelectItem>
                <SelectItem value="go">Go Programming</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-3'>
          <Button variant="outline" onClick={() => navigate("/admin/course")}>Back</Button>
          <Button disable={isLoading} onClick={createCourseHandler}>
            {
              isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please Wait
                </>

              ) : "Create"
            }
          </Button>
        </div>
      </div>
    </div>
  )
}
