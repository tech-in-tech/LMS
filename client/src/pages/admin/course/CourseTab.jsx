import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import RichTextEditor from '../../../components/RichTextEditor'
import { ColumnsIcon, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditCourseMutation } from '../../../features/api/courseApi'
import { toast } from 'sonner'


function CourseTab() {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: ""
  })

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();


  const changeEventHandeler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  }

  const selectCourseLabel = (value) => {
    setInput({ ...input, courseLevel: value });
  }

  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0]; // fixed: files instead of file
    if (file) {
      setInput({ ...input, courseThumbnail: file });

      const fileReader = new FileReader(); // fixed: use instance
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result); // fixed: use instance method
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({formData,courseId})
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course Updated Successfully")
    }
    if (error) {
      toast.error(error.data.message || "Failed to Update Course")
    }
  }, [isSuccess, error])

  const isPublished = true;
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Card Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. click save when you are done
          </CardDescription>
        </div>
        <div className='space-x-2'>
          <Button variant={"outline"}>
            {
              isPublished ? "Unpublished" : "Published"
            }
          </Button>
          <Button >
            Remove Course
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className='space-y-4 mt-5'>
          {/* title */}
          <div className={"space-y-2"}>
            <Label> Title</Label>
            <Input type={"text"}
              value={input.courseTitle}
              onChange={changeEventHandeler}
              name="courseTitle" placeholder="Ex. Fullstack Development" />
          </div>

          <div className={"space-y-2"}>
            <Label>Subtitle</Label>
            <Input type={"text"}
              value={input.subTitle}
              onChange={changeEventHandeler}
              name="subTitle" placeholder="Ex. Become a fullstack Development from zero to hero in Two months" />
          </div>


          {/* description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>



          <div className='flex items-center gap-5'>
            {/* Category */}
            <div className={"space-y-2"}>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
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

            {/* course Lavel */}
            <div className={"space-y-2"}>
              <Label>Course Lavel</Label>
              <Select onValueChange={selectCourseLabel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Lavel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Course Level
                    </SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className={"space-y-2"}>
              <Label >Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandeler}
                placeholder="199"
                className="w-fit"
              />
            </div>

          </div>

          {/* Thumbnail */}
          <div className='space-y-2'>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className={"w-fit"}
            />
            {
              previewThumbnail && (
                <img src={previewThumbnail}
                  className='w-64 my-2 ' alt="Course Thumbnail"
                />
              )
            }
          </div>

          <div className='space-x-6'>
            <Button onClick={() => navigate("/admin/course")} variant={"outline"}>Cancel</Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {
                isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please Wait
                  </>
                ) : "Save"
              }
            </Button>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab
