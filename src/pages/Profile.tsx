
import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Database,
  Award,
  Recycle,
  Calendar,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useWallet } from "@/context/WalletContext";
import { formatAddress } from "@/utils/wallet";

// Mock data - replace with Supabase data later
const mockStats = {
  totalDisposals: 32,
  totalTokens: 1240,
  mostRecycledType: "Plastic",
  lastDisposalDate: "2025-04-17"
};

const mockDisposals = Array(10).fill(null).map((_, i) => ({
  id: i,
  date: new Date(2025, 3, 18 - i).toISOString().split('T')[0],
  wasteType: ['Plastic', 'Paper', 'Metal'][i % 3],
  weight: (Math.random() * 2 + 0.1).toFixed(2),
  rewardTokens: Math.floor(Math.random() * 100 + 10)
}));

const StatCard = ({ icon: Icon, label, value, info }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-[#1a1a1a] rounded-xl p-4 border border-[#32CD32]/20"
  >
    <div className="flex items-center justify-between mb-2">
      <Icon className="h-5 w-5 text-[#32CD32]" />
      <HoverCard>
        <HoverCardTrigger>
          <Info className="h-4 w-4 text-gray-400 hover:text-gray-300" />
        </HoverCardTrigger>
        <HoverCardContent className="bg-[#242424] border-[#32CD32]/20">
          <p className="text-sm text-gray-400">{info}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-xl font-bold text-white mt-1">{value}</p>
  </motion.div>
);

const Profile = () => {
  const { walletInfo } = useWallet();

  return (
    <div className="container p-6 space-y-8">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 bg-[#1a1a1a] p-6 rounded-2xl border border-[#32CD32]/20"
      >
        <Avatar className="h-20 w-20 border-2 border-[#32CD32]/30">
          <AvatarFallback className="bg-[#32CD32]/20 text-[#32CD32] text-2xl">
            {walletInfo?.name?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {walletInfo?.name || 'Anonymous User'}
          </h1>
          <p className="text-gray-400 font-mono">
            {walletInfo ? formatAddress(walletInfo.address) : 'Not Connected'}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Database}
          label="Total Disposals"
          value={mockStats.totalDisposals}
          info="Number of successful waste disposals"
        />
        <StatCard
          icon={Award}
          label="Total BINK Earned"
          value={`${mockStats.totalTokens} BINK`}
          info="Total BINK tokens earned from recycling"
        />
        <StatCard
          icon={Recycle}
          label="Most Recycled"
          value={mockStats.mostRecycledType}
          info="Your most frequently recycled material"
        />
        <StatCard
          icon={Calendar}
          label="Last Disposal"
          value={mockStats.lastDisposalDate}
          info="Date of your most recent disposal"
        />
      </div>

      {/* Disposal History */}
      <Card className="bg-[#1a1a1a] border-[#32CD32]/20 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Disposal History</h2>
          <button className="text-gray-400 hover:text-white flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort by Date
          </button>
        </div>

        {mockDisposals.length > 0 ? (
          <>
            <div className="rounded-lg overflow-hidden border border-[#32CD32]/20">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-[#32CD32]/5">
                    <TableHead className="text-[#32CD32]">Date</TableHead>
                    <TableHead className="text-[#32CD32]">Waste Type</TableHead>
                    <TableHead className="text-[#32CD32]">Weight (kg)</TableHead>
                    <TableHead className="text-[#32CD32] text-right">Reward</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDisposals.map((disposal) => (
                    <TableRow 
                      key={disposal.id}
                      className="hover:bg-[#32CD32]/5"
                    >
                      <TableCell className="text-gray-300">{disposal.date}</TableCell>
                      <TableCell className="text-gray-300">{disposal.wasteType}</TableCell>
                      <TableCell className="text-gray-300">{disposal.weight}</TableCell>
                      <TableCell className="text-right text-[#32CD32]">
                        {disposal.rewardTokens} BINK
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Recycle className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No Disposals Yet</h3>
            <p className="text-gray-500">Start recycling to see your history here!</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;
