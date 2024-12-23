// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function ProfilePage() {
  
//   const userProfile = {
//     username: "JohnDoe",
//     email: "johndoe@example.com",
//     sid: "S12345",
//     branch: "Computer Science",
//     phoneNumber: "+1 (555) 123-4567",
//     parentNumber: "+1 (555) 987-6543"
//   };

  return (
    <div className="container mx-auto py-8">
      {/* <Card className="max-w-2xl mx-auto">
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
      </Card> */}
      <h2>PROFILE PAGE</h2>
    </div>
  );
}

export default ProfilePage;

