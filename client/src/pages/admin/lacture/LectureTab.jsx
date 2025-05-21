import React, { useState } from 'react'
import { Button } from '../../../components/ui/button'
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Switch } from "@/components/ui/switch"
import { toast } from 'sonner'


const MEDIA_API = "http://localhost:8080/api/v1/media"
const LectureTab = () => {

  const[title,setTitle] = useState("");
  const [uploadVideoInfo,setUploadVideoInfo] = useState(null);
  const[isFree,setIsFree] = useState(false);
  const[mediaProgress,setMediaProgress] = useState(false);
  const[uploadProgress,setUploadProgress] = useState(0);
  const[buttonDisable,setButtonDisable] = useState(true);


  const fileChangeHandler = async(e)=>{
    const file = e.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append("file",file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`,formData,{
          onUploadProgress:({loaded,total})=>{
            setUploadProgress(Math.round((loaded*100)/total));
          },
        });
        if(res.data.success){
          console.log(res);
          setUploadVideoInfo({videoUrl:res.data.url,publicId:res.data.data.public_id})
          setButtonDisable(false);
          toast.success(res.data.message)
        }
      } 
      catch (error) {
        console.log(error);
        toast.error("Failed to upload video")
      }
      finally{
        setMediaProgress(false);
      }
    }
  }

  return (

    <Card>
      <CardHeader className="flex justify-between">
        <div className='space-y-2' >
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make Changes and click save when done</CardDescription>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant="destructive">Remove Lecture</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 ">
        <div className='space-y-2'>
          <Label>Title</Label>
          <Input type={"text"} placeholder="Enter courrse title" />
        </div>

        <div className='space-y-2'>
          <Label>Video <span className='text-red-600'>*</span> </Label>
          <Input type={"file"} accept="video/*" onChange={fileChangeHandler} className={"w-fit"} placeholder="Enter courrse title" />
        </div>


        <div className='flex items-center space-x-2 my-5'>

          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Video Free</Label>
        </div>

        {
          mediaProgress &&(
            <div className='my-4'>
              <Progress value={uploadProgress}/>
              
              <p>{uploadProgress}% uploaded</p>
            </div>
          )
        }


        <div className='mt-4 '>
          <Button>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>

  )
}

export default LectureTab
