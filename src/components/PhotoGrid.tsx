
import React, { useState } from 'react';
import { Heart, Download, BookmarkPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  author: string;
  likes: number;
}

interface PhotoGridProps {
  activeFilter: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ activeFilter }) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const photos: Photo[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      alt: "Woman using laptop on bed",
      category: "lifestyle",
      author: "Emily Chen",
      likes: 342
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      alt: "Turned on gray laptop computer",
      category: "technology",
      author: "Michael Scott",
      likes: 527
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      alt: "Monitor showing Java programming",
      category: "technology",
      author: "Alex Wong",
      likes: 298
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      alt: "Woman in white using laptop",
      category: "lifestyle",
      author: "Sarah Johnson",
      likes: 421
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      alt: "Gray and black laptop computer",
      category: "workspace",
      author: "David Miller",
      likes: 183
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      alt: "Colorful software code",
      category: "design",
      author: "Thomas Lee",
      likes: 367
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      alt: "People with laptops",
      category: "workspace",
      author: "Jessica Park",
      likes: 289
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      alt: "Laptop on glass-top table",
      category: "workspace",
      author: "Mark Wilson",
      likes: 412
    },
    {
      id: "9",
      src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      alt: "A living room with a couch and a table",
      category: "lifestyle",
      author: "Olivia Taylor",
      likes: 176
    }
  ];
  
  const handleLike = (id: string) => {
    setLiked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    toast({
      title: liked[id] ? "Removed from favorites" : "Added to favorites",
      duration: 1500,
    });
  };
  
  const handleSave = (photo: Photo) => {
    toast({
      title: "Photo saved to collection",
      description: `${photo.alt} has been saved to your collection`,
      duration: 2000,
    });
  };
  
  const handleDownload = (photo: Photo) => {
    toast({
      title: "Download started",
      description: "Your photo will be downloaded shortly",
      duration: 2000,
    });
  };

  const filteredPhotos = activeFilter === "all" 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPhotos.map((photo) => (
        <div 
          key={photo.id} 
          className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="aspect-w-16 aspect-h-10 overflow-hidden bg-gray-200">
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
            <div className="flex justify-end">
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleSave(photo)} 
                  variant="secondary" 
                  size="icon" 
                  className="bg-black/20 hover:bg-black/40 backdrop-blur-sm"
                >
                  <BookmarkPlus className="h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={() => handleDownload(photo)} 
                  variant="secondary" 
                  size="icon" 
                  className="bg-black/20 hover:bg-black/40 backdrop-blur-sm"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium text-lg mb-1">{photo.alt}</h3>
              <p className="text-gray-300 text-sm">by {photo.author}</p>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-300 text-sm">#{photo.category}</span>
                <Button 
                  onClick={() => handleLike(photo.id)} 
                  variant="ghost"
                  className="gap-1 text-gray-300 hover:text-white p-1"
                >
                  <Heart 
                    className={`h-5 w-5 ${liked[photo.id] ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  <span>{liked[photo.id] ? photo.likes + 1 : photo.likes}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
