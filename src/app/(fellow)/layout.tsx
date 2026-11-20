import Navbar from "@/components/Navbar";

// the links shown in the fellow navbar
const links = [
  { label: "Home", href: "/home" },
  { label: "Availability", href: "/availability" },
  { label: "Schedule", href: "/schedule" },
];

// wraps every page inside the (fellow) folder
export default function FellowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>SLO Coastal Education Foundation</header>
      <Navbar links={links} />
      {/* children is the current page (Home, Availability, etc.) */}
      <main>{children}</main>
    </div>
  );
}
