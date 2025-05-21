import React from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '../../../features/api/courseApi'
import { useEffect } from 'react'
import { toast } from 'sonner'
import Lecture from './Lecture'



const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState();
  // const isLoading = false
  const params = useParams();
  const courseId = params.courseId
  const navigate = useNavigate();
  const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();

  const { data: lectureData, isLoading: lectureLoading, isError: lectureError,refetch } = useGetCourseLectureQuery(courseId);
  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();a
      toast.success(data.message)
    }
    if (error) {
      toast.error(error.data.message)
    }
  }, [isSuccess, error])


  console.log(lectureData)
  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'> Lets add lecture, add some basic details for your new lecture</h1>
        <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
      </div>
      <div className='space-y-4'>
        <div className=' flex flex-col gap-3'>
          <Label>Title</Label>
          <Input
            type="text"

            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value
            )}
            placeholder="Your Title Name" />
        </div>
        
        <div className='flex items-center gap-3'>
          <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back To Course</Button>
          <Button disable={isLoading} onClick={createLectureHandler}>
            {
              isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please Wait
                </>

              ) : "Create Lecture"
            }
          </Button>
        </div>

        <div className='mt-10'>
          {
            lectureLoading ? (
              <p>Loading Lecture...</p>
            ) : lectureError ? (
              <p>Failed to Load Lectures...</p>
            ) : lectureData.lectures.length === 0 ? (
              <p>No Lecture Available</p>
            ) : (
              lectureData.lectures.map((lecture, index) => (
                <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
              ))

            )
          }
        </div>



      </div>
    </div>
  )
}

export default CreateLecture
