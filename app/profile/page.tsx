"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>View and manage your account details</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Profile Picture" />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div>
              <p className="text-lg font-medium">St Saran</p>
              <p className="text-muted-foreground">stsaran2004@gmail.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
