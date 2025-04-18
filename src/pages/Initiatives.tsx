
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Recycle, 
  Trash2, 
  Leaf, 
  Cpu, 
  ArrowRight,
  Calendar,
  X
} from 'lucide-react';
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

// Types for our initiative data
interface Initiative {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'Recycling' | 'Clean-Up' | 'Composting' | 'E-Waste';
  reward: number;
  status: 'Active' | 'Completed' | 'Upcoming';
  progress?: number;
  startDate: string;
  endDate: string;
  steps?: string[];
  image?: string;
}

const Initiatives = () => {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('Most Rewarding');
  
  // State for initiative details modal
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  
  // Form state for creating new initiative
  const [newInitiative, setNewInitiative] = useState({
    title: '',
    description: '',
    category: '',
    reward: '',
    startDate: '',
    endDate: '',
  });

  // Sample initiatives data
  const [initiatives, setInitiatives] = useState<Initiative[]>([
    {
      id: '1',
      title: 'Community Recycling Challenge',
      shortDescription: 'Collect and recycle plastic waste in your community.',
      description: 'Join our community recycling challenge! Collect plastic waste from your neighborhood and bring it to our BINKS stations. Help us reduce plastic pollution while earning rewards.',
      category: 'Recycling',
      reward: 50,
      status: 'Active',
      progress: 60,
      startDate: '2025-04-01',
      endDate: '2025-05-15',
      steps: ['Register for the challenge', 'Collect plastic waste', 'Bring to BINKS stations', 'Scan QR code to record your contribution'],
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b'
    },
    {
      id: '2',
      title: 'E-Waste Collection Drive',
      shortDescription: 'Properly dispose of electronic waste at designated centers.',
      description: 'Electronic waste contains toxic materials that shouldn\'t end up in landfills. Bring your old electronics to our collection centers and earn rewards while helping protect the environment.',
      category: 'E-Waste',
      reward: 75,
      status: 'Upcoming',
      startDate: '2025-05-10',
      endDate: '2025-06-10',
      steps: ['Register online', 'Collect e-waste', 'Visit collection center', 'Get your reward token'],
    },
    {
      id: '3',
      title: 'Park Clean-Up Event',
      shortDescription: 'Join us for a day of cleaning our local parks.',
      description: 'Let\'s keep our parks clean and beautiful! Join our clean-up crew for a day of community service. We\'ll provide all necessary equipment. Your efforts will be tracked and rewarded through BINKS.',
      category: 'Clean-Up',
      reward: 40,
      status: 'Active',
      progress: 30,
      startDate: '2025-04-15',
      endDate: '2025-04-30',
      steps: ['Sign up', 'Check-in at the park', 'Collect provided supplies', 'Clean your assigned area', 'Check-out to claim rewards'],
      image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3'
    },
    {
      id: '4',
      title: 'Composting Workshop',
      shortDescription: 'Learn how to start composting at home and earn rewards.',
      description: 'Join our expert-led workshop to learn effective composting techniques. Participants will receive a starter kit and earn BINK tokens for implementing composting at home.',
      category: 'Composting',
      reward: 35,
      status: 'Upcoming',
      startDate: '2025-05-05',
      endDate: '2025-05-05',
      steps: ['Register for the workshop', 'Attend the session', 'Set up your composting system', 'Document your progress', 'Earn rewards'],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    },
    {
      id: '5',
      title: 'Office Recycling Program',
      shortDescription: 'Implement waste sorting in your workplace with our guidance.',
      description: 'Transform your office into an eco-friendly workplace! Our program helps businesses implement effective waste sorting and recycling systems. Track your progress and earn corporate rewards.',
      category: 'Recycling',
      reward: 100,
      status: 'Active',
      progress: 75,
      startDate: '2025-03-01',
      endDate: '2025-06-30',
      steps: ['Register your company', 'Schedule assessment', 'Implement system', 'Track metrics', 'Receive rewards'],
    },
    {
      id: '6',
      title: 'River Clean-Up Campaign',
      shortDescription: 'Help remove plastic and debris from local waterways.',
      description: 'Our rivers need help! Join our campaign to clean up local waterways and prevent plastic from reaching the ocean. Equipment will be provided, and rewards will be based on participation and volume collected.',
      category: 'Clean-Up',
      reward: 60,
      status: 'Completed',
      progress: 100,
      startDate: '2025-02-10',
      endDate: '2025-03-10',
      steps: ['Register as volunteer', 'Attend safety briefing', 'Participate in clean-up', 'Document your findings', 'Claim rewards'],
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
    }
  ]);

  // Filter and sort initiatives
  const filteredInitiatives = initiatives.filter(initiative => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      initiative.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || initiative.status === statusFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === 'All' || initiative.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    // Sort based on selected option
    if (sortBy === 'Most Rewarding') {
      return b.reward - a.reward;
    } else if (sortBy === 'Newest') {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    } else if (sortBy === 'Ending Soon') {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
    return 0;
  });

  // Get category icon based on category name
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Recycling':
        return <Recycle className="h-6 w-6 text-[#4CAF50]" />;
      case 'Clean-Up':
        return <Trash2 className="h-6 w-6 text-[#4CAF50]" />;
      case 'Composting':
        return <Leaf className="h-6 w-6 text-[#4CAF50]" />;
      case 'E-Waste':
        return <Cpu className="h-6 w-6 text-[#4CAF50]" />;
      default:
        return <Recycle className="h-6 w-6 text-[#4CAF50]" />;
    }
  };

  // Get status badge style based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-600 hover:bg-green-700">{status}</Badge>;
      case 'Completed':
        return <Badge className="bg-gray-600 hover:bg-gray-700">{status}</Badge>;
      case 'Upcoming':
        return <Badge className="bg-blue-600 hover:bg-blue-700">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle view details click
  const handleViewDetails = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
  };

  // Handle join initiative click
  const handleJoinInitiative = (initiativeId: string) => {
    toast({
      title: "Successfully joined initiative!",
      description: `You have successfully joined the initiative. Check your dashboard for updates.`,
    });
    
    // Close the modal
    setSelectedInitiative(null);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewInitiative({
      ...newInitiative,
      [name]: value,
    });
  };

  // Handle create initiative submission
  const handleCreateInitiative = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new initiative to the list
    const newInitiativeData: Initiative = {
      id: (initiatives.length + 1).toString(),
      title: newInitiative.title,
      shortDescription: newInitiative.description.substring(0, 100) + (newInitiative.description.length > 100 ? '...' : ''),
      description: newInitiative.description,
      category: newInitiative.category as any,
      reward: parseInt(newInitiative.reward),
      status: 'Upcoming',
      startDate: newInitiative.startDate,
      endDate: newInitiative.endDate,
      steps: ['Details to be announced'],
    };
    
    setInitiatives([...initiatives, newInitiativeData]);
    
    // Reset form
    setNewInitiative({
      title: '',
      description: '',
      category: '',
      reward: '',
      startDate: '',
      endDate: '',
    });
    
    toast({
      title: "Initiative created!",
      description: "Your new initiative has been successfully created.",
    });
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Current Eco Initiatives</h1>
            <p className="text-gray-300">Participate in ongoing sustainability missions and earn BINK tokens.</p>
          </div>
          
          {isConnected && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-[#4CAF50] hover:bg-[#45a049] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Initiative
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2a2a2a] border-[#4CAF50]/20 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Create New Initiative</DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Fill in the details below to create a new eco initiative.
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleCreateInitiative} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newInitiative.title}
                      onChange={handleInputChange}
                      placeholder="Initiative title"
                      className="bg-[#333] border-[#4CAF50]/20 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newInitiative.description}
                      onChange={handleInputChange}
                      placeholder="Detailed description of the initiative"
                      className="bg-[#333] border-[#4CAF50]/20 text-white min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <Select name="category" value={newInitiative.category} onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as any)}>
                        <SelectTrigger className="bg-[#333] border-[#4CAF50]/20 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#333] border-[#4CAF50]/20 text-white">
                          <SelectGroup>
                            <SelectItem value="Recycling">Recycling</SelectItem>
                            <SelectItem value="Clean-Up">Clean-Up</SelectItem>
                            <SelectItem value="Composting">Composting</SelectItem>
                            <SelectItem value="E-Waste">E-Waste</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reward" className="text-white">Reward (BINK tokens)</Label>
                      <Input
                        id="reward"
                        name="reward"
                        type="number"
                        value={newInitiative.reward}
                        onChange={handleInputChange}
                        placeholder="50"
                        className="bg-[#333] border-[#4CAF50]/20 text-white"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-white">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={newInitiative.startDate}
                        onChange={handleInputChange}
                        className="bg-[#333] border-[#4CAF50]/20 text-white"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endDate" className="text-white">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newInitiative.endDate}
                        onChange={handleInputChange}
                        className="bg-[#333] border-[#4CAF50]/20 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <DialogFooter className="pt-4">
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                      Create Initiative
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search initiatives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#333] border-[#4CAF50]/20 text-white focus:border-[#4CAF50]"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[#333] border-[#4CAF50]/20 text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-[#4CAF50]/20 text-white">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="bg-[#333] border-[#4CAF50]/20 text-white">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-[#4CAF50]/20 text-white">
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="Recycling">Recycling</SelectItem>
              <SelectItem value="Clean-Up">Clean-Up</SelectItem>
              <SelectItem value="Composting">Composting</SelectItem>
              <SelectItem value="E-Waste">E-Waste</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-[#333] border-[#4CAF50]/20 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#2a2a2a] border-[#4CAF50]/20 text-white">
              <SelectItem value="Most Rewarding">Most Rewarding</SelectItem>
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Ending Soon">Ending Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Initiative Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInitiatives.map((initiative) => (
            <div 
              key={initiative.id} 
              className="bg-[#2f2f2f] rounded-xl p-6 shadow-lg border border-gray-700 hover:border-[#4CAF50]/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(76,175,80,0.2)]"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-full bg-[#1e1e1e]">
                  {getCategoryIcon(initiative.category)}
                </div>
                {getStatusBadge(initiative.status)}
              </div>
              
              <h3 className="mt-4 text-xl font-semibold text-white">{initiative.title}</h3>
              
              <p className="mt-2 text-gray-300 text-sm line-clamp-2">{initiative.shortDescription}</p>
              
              <div className="mt-4 flex items-center text-[#4CAF50]">
                <span className="font-mono font-bold">Earn up to {initiative.reward} BINK</span>
              </div>
              
              {initiative.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} className="h-2" />
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(initiative.endDate).toLocaleDateString()}</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] transition-colors"
                      onClick={() => handleViewDetails(initiative)}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="bg-[#2a2a2a] border-[#4CAF50]/20 text-white max-w-2xl">
                    <DialogHeader>
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(initiative.category)}
                        <DialogTitle className="text-2xl font-bold">{initiative.title}</DialogTitle>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(initiative.status)}
                        <span className="text-[#4CAF50] font-mono font-bold">
                          Earn up to {initiative.reward} BINK
                        </span>
                      </div>
                    </DialogHeader>
                    
                    {initiative.image && (
                      <div className="mt-2 rounded-lg overflow-hidden h-48">
                        <img 
                          src={initiative.image} 
                          alt={initiative.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-300 mt-4">{initiative.description}</p>
                    
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold text-white">How to Participate:</h4>
                      <ol className="space-y-2 pl-6 list-decimal">
                        {initiative.steps?.map((step, index) => (
                          <li key={index} className="text-gray-300">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="mt-6 space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium">Duration:</span> {new Date(initiative.startDate).toLocaleDateString()} - {new Date(initiative.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {initiative.progress !== undefined && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progress toward goal</span>
                          <span>{initiative.progress}%</span>
                        </div>
                        <Progress value={initiative.progress} className="h-2" />
                      </div>
                    )}
                    
                    <DialogFooter className="mt-6">
                      <DialogClose asChild>
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Close
                        </Button>
                      </DialogClose>
                      
                      {initiative.status !== 'Completed' && (
                        <Button 
                          className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
                          onClick={() => handleJoinInitiative(initiative.id)}
                        >
                          Join Initiative
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show message if no initiatives match filters */}
        {filteredInitiatives.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-[#2a2a2a] rounded-lg p-8 max-w-md mx-auto">
              <Search className="h-10 w-10 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No initiatives found</h3>
              <p className="text-gray-400">
                We couldn't find any initiatives matching your filters. Try changing your search criteria or check back later.
              </p>
              <Button 
                className="mt-4 bg-[#4CAF50] hover:bg-[#45a049] text-white"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setCategoryFilter('All');
                  setSortBy('Most Rewarding');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Initiatives;
