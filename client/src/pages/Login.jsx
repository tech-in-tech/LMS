import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "../features/api/authApi"
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: ""
  })
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [registerUser, {
    data: registerData,
    error: registerError,
    isLoading: registerIsLoading,
    isSuccess: registerIsSuccess
  },] = useRegisterUserMutation();
  const [loginUser, {
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess
  },] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === 'signup') {
      setSignupInput({ ...signupInput, [name]: value })
    }
    else {
      setLoginInput({ ...loginInput, [name]: value })
    }
  }

  const handleRegistration = async(type) => {
    const inputData = type === "signup" ? signupInput : loginInput
    const action = type==="signup"?registerUser:loginUser;
    await action(inputData);
  }

  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData.message || "Signup Successfully")
    }
    if(registerError){
      toast.success(registerError.data.message || "Signup Failed")
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login Successfully")
      navigate("/");
    }
    if(loginError){
      toast.error(loginError.data.message || "Login Failed")
    }
  },[loginIsSuccess,registerIsLoading,loginData,registerData,loginError,registerError])


  return (
    <div className="flex mt-27 justify-center w-full items-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>


        <TabsContent value="login" >
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")} required="true" placeholder="john@gmail.com"
                  name="email"
                  value={loginInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")} required="true" placeholder="******"
                  name="password"
                  type="password"
                  value={loginInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
                  </>
                  ):"Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create your new account and click signup when your're done
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="text"
                  placeholder="John"
                  name="name"
                  value={signupInput.name}
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")} type="email" placeholder="John@gmail.com" required="true"
                  name="email"
                  value={signupInput.email}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => changeInputHandler(e, "signup")} type="password" placeholder="******" required="true"
                  name="password"
                  value={signupInput.password}
                />
              </div>
            </CardContent>
            <CardFooter>
            <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
                  </>
                  ):"Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default Login






