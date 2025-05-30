
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User, Package, LogOut } from 'lucide-react';

// This is a placeholder page. In a real app, you'd fetch user data.
const UserAccountPage = () => {
  const user = {
    name: "Guest User",
    email: "guest@example.com",
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">My Orders</CardTitle>
            <CardDescription>View your past orders and their status.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for order list or link */}
            <p className="text-muted-foreground mb-4">You have no recent orders.</p>
            <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/account/orders"><Package className="mr-2 h-4 w-4" /> View All Orders</Link>
            </Button>
          </CardContent>
        </Card>
        
        <div className="mt-8">
            <Button variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserAccountPage;
