import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Award, Leaf, Wrench, BarChart, Building, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  location: z.string().min(5, {
    message: "Please provide a complete address.",
  }),
  organizationType: z.string({
    required_error: "Please select an organization type.",
  }),
  wasteOutput: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const FranchiseInfo = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "",
      contactName: "",
      email: "",
      phone: "",
      location: "",
      organizationType: "",
      wasteOutput: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    
    toast({
      title: "Franchise Request Submitted",
      description: "Thank you for your interest! Our team will contact you shortly.",
    });
    
    form.reset();
    
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] to-[#1e1e1e]">
      <Navbar />
      
      <section 
        id="franchise-hero" 
        className="relative py-12 md:py-20 bg-[#323232] scroll-mt-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Partner with <span className="text-[#4CAF50]">BINKS</span> — Bring Smart Waste Management to Your City
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join our network of successful franchisees who are revolutionizing waste management while building profitable businesses. BINKS offers a unique opportunity to make a positive environmental impact while generating sustainable revenue.
          </p>
        </div>
      </section>
      
      <section className="py-12 bg-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Benefits of Becoming a BINKS Franchisee
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-[#242424] border-[#4CAF50]/20 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#4CAF50]/20">
                    <Award className="h-8 w-8 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Patented Technology</h3>
                    <p className="text-gray-300">Access to our award-winning smart dustbin technology that automatically sorts and processes waste.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#4CAF50]/20">
                    <Wrench className="h-8 w-8 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Complete Support</h3>
                    <p className="text-gray-300">Comprehensive training, setup assistance, and ongoing technical support for your franchise operation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#4CAF50]/20">
                    <BarChart className="h-8 w-8 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-time Analytics</h3>
                    <p className="text-gray-300">Powerful dashboard with data insights on waste management and token economy performance.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#4CAF50]/20">
                    <Leaf className="h-8 w-8 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Green Branding</h3>
                    <p className="text-gray-300">Join an eco-conscious brand that enhances your sustainability credentials and CSR initiatives.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#4CAF50]/20">
                    <Building className="h-8 w-8 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Diverse Applications</h3>
                    <p className="text-gray-300">Solutions tailored for corporate offices, campuses, tech parks, malls, and other commercial spaces.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#242424] border-[#4CAF50]/20 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(76,175,80,0.3)]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-full bg-[#4CAF50]/20">
                    <Award className="h-8 w-8 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Token Economy</h3>
                    <p className="text-gray-300">Integrate our innovative token reward system that incentivizes users for responsible waste disposal.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Eligibility & Requirements
          </h2>
          
          <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#4CAF50]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Ideal Locations</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Corporate office buildings</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>University and school campuses</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Shopping malls and commercial centers</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Technology parks and business hubs</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Residential complexes and gated communities</p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technical Requirements</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Minimum space allocation for bin placement</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Reliable internet connectivity for smart features</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Power source accessibility</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Compliance with local waste handling regulations</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 text-[#4CAF50] mr-2">✓</div>
                    <p>Commitment to recycling and sustainability practices</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-[#1e1e1e]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#242424] p-8 rounded-xl border border-[#4CAF50]/20 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Request Franchise Information
            </h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Organization Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter organization name" 
                            className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Contact Person Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter contact name" 
                            className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email ID</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter email address" 
                            className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter phone number" 
                            className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Location / Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter complete address" 
                          className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]" 
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
                    name="organizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Type of Organization</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]">
                              <SelectValue placeholder="Select organization type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#323232] border-[#4CAF50]/20 text-white">
                            <SelectItem value="tech_park">Tech Park</SelectItem>
                            <SelectItem value="university">University / Campus</SelectItem>
                            <SelectItem value="mall">Shopping Mall</SelectItem>
                            <SelectItem value="corporate">Corporate Office</SelectItem>
                            <SelectItem value="residential">Residential Complex</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="wasteOutput"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Estimated Daily Waste Output (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 100kg, 500 liters" 
                            className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Message / Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any specific requirements or questions?" 
                          className="bg-[#323232] border-[#4CAF50]/20 text-white focus:border-[#4CAF50] focus:ring-[#4CAF50] min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="bg-transparent border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
      
      <footer className="bg-[#121212] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 BINKS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FranchiseInfo;
