import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Shield, Check, X, Ban, Search, Eye, Filter, AlertTriangle, Users, Package, Flag, Clock, CheckCircle } from "lucide-react";

interface AdminItem {
  id: string;
  title: string;
  type: 'lost' | 'found';
  status: 'pending' | 'approved' | 'rejected';
  category: string;
  submittedBy: string;
  submittedAt: string;
  reportCount: number;
  description: string;
  location: string;
  spamScore: number;
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  itemsPosted: number;
  lastActive: string;
  status: 'active' | 'suspended';
  reportCount: number;
  spamScore: number;
}

interface ClaimRequest {
  id: string;
  itemId: string;
  itemTitle: string;
  requesterEmail: string;
  requesterName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

export default function Admin() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [claims, setClaims] = useState<ClaimRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'items' | 'users' | 'claims'>('items');
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // call GET /api/admin/items, GET /api/admin/users, and GET /api/admin/claims here
      
      // Mock data for demonstration
      const mockItems: AdminItem[] = [
        {
          id: "1",
          title: "Black iPhone 13",
          type: "lost",
          status: "approved",
          category: "Electronics",
          submittedBy: "john.doe@university.edu",
          submittedAt: "2024-01-10T10:30:00Z",
          reportCount: 0,
          description: "Lost my iPhone 13 in the library",
          location: "University Library",
          spamScore: 0.1
        },
        {
          id: "2",
          title: "Red Water Bottle",
          type: "found",
          status: "pending",
          category: "Other",
          submittedBy: "jane.smith@university.edu",
          submittedAt: "2024-01-11T14:15:00Z",
          reportCount: 0,
          description: "Found a red water bottle in the cafeteria",
          location: "Student Cafeteria",
          spamScore: 0.2
        },
        {
          id: "3",
          title: "Suspicious Item Listing",
          type: "lost",
          status: "pending",
          category: "Electronics",
          submittedBy: "suspicious@email.com",
          submittedAt: "2024-01-11T16:20:00Z",
          reportCount: 3,
          description: "BUY NOW!!! AMAZING DEALS!!! CLICK HERE!!!",
          location: "Unknown",
          spamScore: 0.9
        },
        {
          id: "4",
          title: "MacBook Pro",
          type: "found",
          status: "pending",
          category: "Electronics",
          submittedBy: "newuser@email.com",
          submittedAt: "2024-01-12T09:00:00Z",
          reportCount: 1,
          description: "Found a MacBook Pro in the computer lab",
          location: "Computer Lab",
          spamScore: 0.3
        }
      ];

      const mockUsers: AdminUser[] = [
        {
          id: "u1",
          email: "john.doe@university.edu",
          name: "John Doe",
          itemsPosted: 5,
          lastActive: "2024-01-11T16:30:00Z",
          status: "active",
          reportCount: 0,
          spamScore: 0.1
        },
        {
          id: "u2",
          email: "jane.smith@university.edu",
          name: "Jane Smith",
          itemsPosted: 2,
          lastActive: "2024-01-11T14:15:00Z",
          status: "active",
          reportCount: 0,
          spamScore: 0.1
        },
        {
          id: "u3",
          email: "suspicious@email.com",
          name: "Suspicious User",
          itemsPosted: 10,
          lastActive: "2024-01-11T16:20:00Z",
          status: "suspended",
          reportCount: 5,
          spamScore: 0.8
        },
        {
          id: "u4",
          email: "newuser@email.com",
          name: "New User",
          itemsPosted: 1,
          lastActive: "2024-01-12T09:00:00Z",
          status: "active",
          reportCount: 1,
          spamScore: 0.4
        }
      ];

      const mockClaims: ClaimRequest[] = [
        {
          id: "c1",
          itemId: "1",
          itemTitle: "Black iPhone 13",
          requesterEmail: "alice@university.edu",
          requesterName: "Alice Johnson",
          requestDate: "2024-01-11T11:00:00Z",
          status: "pending",
          description: "I lost my iPhone 13 yesterday. It has a black case and my contact info on the lock screen."
        },
        {
          id: "c2",
          itemId: "2",
          itemTitle: "Red Water Bottle",
          requesterEmail: "bob@university.edu",
          requesterName: "Bob Wilson",
          requestDate: "2024-01-11T15:00:00Z",
          status: "pending",
          description: "I lost my red water bottle in the cafeteria. It has my name written on it."
        }
      ];

      setItems(mockItems);
      setUsers(mockUsers);
      setClaims(mockClaims);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleItemAction = async (itemId: string, action: 'approve' | 'reject') => {
    try {
      // call PUT /api/admin/items/:id here
      
      setItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
          : item
      ));

      toast({
        title: `Item ${action}d successfully`,
        description: `The item has been ${action}d and the user has been notified.`,
      });
    } catch (error) {
      toast({
        title: `Failed to ${action} item`,
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate') => {
    try {
      // call PUT /api/admin/users/:id here
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
          : user
      ));

      toast({
        title: `User ${action}d successfully`,
        description: `The user has been ${action}d.`,
      });
    } catch (error) {
      toast({
        title: `Failed to ${action} user`,
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleClaimAction = async (claimId: string, action: 'approve' | 'reject') => {
    try {
      // call PUT /api/admin/claims/:id here
      
      setClaims(prev => prev.map(claim => 
        claim.id === claimId 
          ? { ...claim, status: action === 'approve' ? 'approved' : 'rejected' }
          : claim
      ));

      toast({
        title: `Claim ${action}d successfully`,
        description: `The claim has been ${action}d and the user has been notified.`,
      });
    } catch (error) {
      toast({
        title: `Failed to ${action} claim`,
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const getSpamIndicator = (score: number) => {
    if (score >= 0.7) {
      return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />High Spam Risk</Badge>;
    } else if (score >= 0.4) {
      return <Badge variant="secondary" className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" />Moderate Risk</Badge>;
    }
    return <Badge variant="outline" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" />Low Risk</Badge>;
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter || (filter === 'reported' && item.reportCount > 0) || (filter === 'spam' && item.spamScore >= 0.7);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.status === filter || (filter === 'reported' && user.reportCount > 0) || (filter === 'spam' && user.spamScore >= 0.7);
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredClaims = claims.filter(claim => {
    const matchesFilter = filter === 'all' || claim.status === filter;
    const matchesSearch = claim.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.requesterEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string, reportCount?: number) => {
    if (reportCount && reportCount > 0) {
      return <Badge variant="destructive">Reported ({reportCount})</Badge>;
    }
    
    const variants = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      active: 'default',
      suspended: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getFilterOptions = () => {
    switch (activeTab) {
      case 'items':
        return (
          <>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="reported">Reported</SelectItem>
            <SelectItem value="spam">High Spam Risk</SelectItem>
          </>
        );
      case 'users':
        return (
          <>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="reported">Reported</SelectItem>
            <SelectItem value="spam">High Spam Risk</SelectItem>
          </>
        );
      case 'claims':
        return (
          <>
            <SelectItem value="all">All Claims</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </>
        );
      default:
        return <SelectItem value="all">All</SelectItem>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage items, users, and claims across the platform</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {items.filter(item => item.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flag className="h-4 w-4" />
                Reported Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {items.filter(item => item.reportCount > 0).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {users.filter(user => user.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Pending Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {claims.filter(claim => claim.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                High Spam Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {items.filter(item => item.spamScore >= 0.7).length + users.filter(user => user.spamScore >= 0.7).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'items' | 'users' | 'claims')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Items Management
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="claims" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Claims Management
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {getFilterOptions()}
              </SelectContent>
            </Select>
          </div>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Items Management</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Submitted By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Spam Risk</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium max-w-[200px] truncate" title={item.title}>
                            {item.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.type === 'lost' ? 'destructive' : 'default'}>
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="max-w-[150px] truncate" title={item.submittedBy}>
                            {item.submittedBy}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status, item.reportCount)}</TableCell>
                          <TableCell>{getSpamIndicator(item.spamScore)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" title="View Details">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {item.status === 'pending' && (
                                <>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="default" title="Approve">
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Approve Item</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to approve "{item.title}"? This will make it visible to all users.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleItemAction(item.id, 'approve')}>
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="destructive" title="Reject">
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Item</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject "{item.title}"? This will remove it from the platform.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleItemAction(item.id, 'reject')}>
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Items Posted</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Spam Risk</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={user.email}>
                            {user.email}
                          </TableCell>
                          <TableCell>{user.itemsPosted}</TableCell>
                          <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(user.status, user.reportCount)}</TableCell>
                          <TableCell>{getSpamIndicator(user.spamScore)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {user.status === 'active' ? (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive" title="Suspend User">
                                      <Ban className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Suspend User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to suspend {user.name}? They will not be able to post new items.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleUserAction(user.id, 'suspend')}>
                                        Suspend
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              ) : (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="default" title="Activate User">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Activate User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to reactivate {user.name}? They will be able to post new items again.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleUserAction(user.id, 'activate')}>
                                        Activate
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Claims Management</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Requester</TableHead>
                        <TableHead>Request Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium max-w-[200px] truncate" title={claim.itemTitle}>
                            {claim.itemTitle}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{claim.requesterName}</div>
                              <div className="text-sm text-muted-foreground max-w-[150px] truncate" title={claim.requesterEmail}>
                                {claim.requesterEmail}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(claim.requestDate).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(claim.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" title="View Details">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {claim.status === 'pending' && (
                                <>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="default" title="Approve Claim">
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Approve Claim</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to approve this claim for "{claim.itemTitle}"?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleClaimAction(claim.id, 'approve')}>
                                          Approve
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="destructive" title="Reject Claim">
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject Claim</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to reject this claim for "{claim.itemTitle}"?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleClaimAction(claim.id, 'reject')}>
                                          Reject
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}