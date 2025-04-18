import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from "@/context/WalletContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import {
  Upload,
  CalendarRange,
  GaugeCircle,
  Leaf,
  AlertTriangle,
  ChevronLeft,
  ImagePlus
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Initiative title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  materialType: z.string({
    required_error: "Please select a material type.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date({
    required_error: "End date is required.",
  }),
  rewardMultiplier: z.number().min(0.1).max(5),
  environmentalFactor: z.number().min(0).max(100).optional(),
  smartContractAddress: z.string().optional(),
  bannerImage: z.any().optional(),
});

const materialTypes = [
  "Plastic",
  "Paper",
  "Metal",
  "Glass",
  "Organic",
  "E-Waste"
] as const;

const CreateInitiative = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { walletInfo, isConnected } = useWallet();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Check authorization
  const isAuthorized = walletInfo?.role === 'admin'; // This would be implemented in your WalletContext

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rewardMultiplier: 1.0,
      environmentalFactor: 50,
    },
  });

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form data:', data);
    
    // Here you would integrate with your smart contract and Supabase
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccessDialog(true);
      
      // Reset form after successful submission
      form.reset();
      setSelectedImage(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create initiative. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <Alert className="max-w-md bg-[#2a2a2a] border-[#4CAF50]/20">
          <AlertTriangle className="h-5 w-5 text-[#4CAF50]" />
          <AlertTitle className="text-white">Access Denied</AlertTitle>
          <AlertDescription className="text-gray-300">
            You don't have permission to access this page. Please contact an administrator.
          </AlertDescription>
        </Alert>
        <Button
          className="mt-6 bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
          onClick={() => navigate('/dashboard')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Create New <span className="text-[#4CAF50]">Initiative</span>
        </h1>

        <div className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg border border-[#4CAF50]/20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Initiative Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter initiative title"
                          className="bg-[#323232] border-[#4CAF50]/20 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="materialType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Material Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#323232] border-[#4CAF50]/20 text-white">
                            <SelectValue placeholder="Select material type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#2a2a2a] border-[#4CAF50]/20">
                          {materialTypes.map((type) => (
                            <SelectItem
                              key={type}
                              value={type.toLowerCase()}
                              className="text-white hover:bg-[#4CAF50]/20"
                            >
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your initiative..."
                        className="bg-[#323232] border-[#4CAF50]/20 text-white min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full bg-[#323232] border-[#4CAF50]/20 text-white",
                                !field.value && "text-gray-400"
                              )}
                            >
                              <CalendarRange className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a start date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#2a2a2a] border-[#4CAF50]/20">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="bg-[#2a2a2a] text-white pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full bg-[#323232] border-[#4CAF50]/20 text-white",
                                !field.value && "text-gray-400"
                              )}
                            >
                              <CalendarRange className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick an end date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#2a2a2a] border-[#4CAF50]/20">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="bg-[#2a2a2a] text-white pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="rewardMultiplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Reward Multiplier
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={0.1}
                            max={5}
                            step={0.1}
                            value={[field.value]}
                            onValueChange={([value]) => field.onChange(value)}
                            className="py-4"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>0.1x</span>
                            <span className="text-[#4CAF50]">{field.value}x</span>
                            <span>5.0x</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Set the reward multiplier for this initiative
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="environmentalFactor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Environmental Impact Factor
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={0}
                            max={100}
                            value={[field.value || 0]}
                            onValueChange={([value]) => field.onChange(value)}
                            className="py-4"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>Low</span>
                            <span className="text-[#4CAF50]">{field.value || 0}%</span>
                            <span>High</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Rate the environmental impact of this initiative
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                  className="bg-[#323232]"
                />
                <span className="text-white">Show Advanced Options</span>
              </div>

              {showAdvanced && (
                <FormField
                  control={form.control}
                  name="smartContractAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Smart Contract Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter smart contract address"
                          className="bg-[#323232] border-[#4CAF50]/20 text-white font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-400">
                        Optional: Link this initiative to a smart contract
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div>
                <FormLabel className="text-white block mb-2">
                  Initiative Banner
                </FormLabel>
                <div className="border-2 border-dashed border-[#4CAF50]/20 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {selectedImage ? (
                      <div className="relative w-full max-w-md">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected banner"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                          <ImagePlus className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-[#4CAF50]" />
                        <span className="text-gray-400">
                          Click to upload initiative banner
                        </span>
                        <span className="text-xs text-gray-500">
                          SVG, PNG, JPG or GIF (max. 2MB)
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
              >
                <Leaf className="mr-2 h-5 w-5" />
                Deploy & Create Initiative
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-[#2a2a2a] text-white border-[#4CAF50]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="h-6 w-6 text-[#4CAF50]" />
              Initiative Created!
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Your new initiative has been successfully created and deployed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccessDialog(false);
                navigate('/initiatives');
              }}
              className="bg-transparent border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10"
            >
              View All Initiatives
            </Button>
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
            >
              Create Another
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateInitiative;
