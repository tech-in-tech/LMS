import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Dashboard = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Total Sale</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

export default Dashboard
