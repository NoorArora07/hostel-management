import { Button } from "@/components/ui/button";
import { ClipboardList, PlusCircle } from "lucide-react";
import pic from "@/Photos/complaints.jpg";
import { AuroraBackground } from '../ui/aurora-background.tsx';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/urls.jsx";

export default function Complaints() {
  const navigate = useNavigate();
  const pathv = "/complaintsview";
  const pathf = "/complaintsform";

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="relative min-h-screen">
      {/* Aurora Background */}
      <AuroraBackground className="fixed top-0 left-0 right-0 z-0 h-full" />

      <main className="container mx-auto px-4 py-16 relative z-10 bg-white/20 backdrop-blur-lg mt-16 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Hostel Complaints Portal</h1>
          <p className="text-xl text-violet-100">Your voice matters. Report and track issues easily.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <div>
            <Button
              className="w-64 h-16 text-lg"
              variant="default"
              onClick={() => handleNavigation(pathv)}
            >
              <ClipboardList className="mr-2 h-6 w-6" />
              View Complaints
            </Button>
          </div>
          <div>
            <Button
              className="w-64 h-16 text-lg bg-violet-100 hover:bg-violet-200"
              variant="outline"
              onClick={() => handleNavigation(pathf)}
            >
              <PlusCircle className="mr-2 h-6 w-6" />
              Add New Complaint
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow-2xl">
          <img
            src={pic}
            alt="Hostel common area"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <p className="text-center text-violet-100 mt-8">
          We're committed to improving your hostel experience. Your feedback helps us make it better for everyone.
        </p>
      </main>
    </div>
  );
}
