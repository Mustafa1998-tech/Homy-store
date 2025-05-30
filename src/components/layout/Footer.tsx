
export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Homey Store (Homey مصر). All rights reserved.</p>
        <p className="mt-1">Inspired by modern e-commerce, built with Next.js.</p>
      </div>
    </footer>
  );
}
