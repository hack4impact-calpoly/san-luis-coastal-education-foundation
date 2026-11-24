import Navbar from "@/components/Navbar";

// the links shown in the staff navbar
const links = [
  { label: "Dashboard", href: "/staff" },
  { label: "Fellows", href: "/staff/fellows" },
  { label: "Programs", href: "/staff/programs" },
  { label: "Scheduling", href: "/staff/scheduling" },
];

// wraps every page inside the (staff) folder
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>SLO Coastal Staff</header>
      <Navbar links={links} />
      <main>{children}</main>
    </div>
  );
}
