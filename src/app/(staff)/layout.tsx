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
      <header className="p-4 text-xl font-bold">SLO Coastal Staff</header>
      <Navbar links={links} />
      <main className="mx-auto max-w-5xl p-6">{children}</main>
    </div>
  );
}
