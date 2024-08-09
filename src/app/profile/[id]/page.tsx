export default function userProfile({params}: any){
     return (
          <div className="flex flex-col text-center item-center justify-center min-h-screen py-2">
               <h1>Profile</h1>
               <hr />
               <p className="text-4xl">Farhan <span className="rounded-lg p-2 bg-orange-400">{params.id}</span></p>
          </div>
     )
} 