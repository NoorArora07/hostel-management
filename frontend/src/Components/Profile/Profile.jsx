//avatar image src par kaam karna hai 
//div container max width nahi ho raha, need to solve this 

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"

const Profile = () => {
  
  const userProfile = {
    username: "Mithas Janbade",
    email: "mithas@example.com",
    sid: "23103116",
    branch: "Computer Science",
    phoneNumber: "+91 9872075026",
    parentNumber: "+91 0000000000",
  };

  return (
    <div className="w-full px-4 md:px-8 py-16  mt-11 bg-blue-300">
      <Card className="max-w-2xl mx-auto mt-11">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg" alt={userProfile.username} />
            <AvatarFallback>{userProfile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userProfile.username}</CardTitle>
            <p className="text-muted-foreground">{userProfile.branch}</p>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Object.entries(userProfile).map(([key, value]) => (
              key !== 'username' && key !== 'branch' && (
                <div key={key} className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{value}</dd>
                </div>
              )
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}


export default Profile;
