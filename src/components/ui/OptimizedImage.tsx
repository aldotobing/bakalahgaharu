import { useState, useEffect } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import imageCompression from 'browser-image-compression';

// Helper function to add cache-busting query parameter
const addCacheBuster = (url: string): string => {
  if (!url) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
};

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  loading?: 'eager' | 'lazy';
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 0.8,
  maxWidth = 1200,
  maxHeight = 1200,
  loading = 'lazy',
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadAndOptimizeImage = async () => {
      if (!src) return;
      
      try {
        setIsLoading(true);
        
        // Skip optimization for SVG files
        if (src.endsWith('.svg')) {
          if (isMounted) {
            setImageSrc(src);
            setIsLoading(false);
          }
          return;
        }
        
        // Check if the image is already optimized
        const isAlreadyOptimized = src.includes('?') || src.includes('&') || 
                                 src.includes('w=') || src.includes('q=') ||
                                 src.includes('auto=format');
        
        // Check if the image is external
        const isExternal = !src.startsWith(window.location.origin) && 
                         (src.startsWith('http://') || src.startsWith('https://'));
        
        // For external images, use the proxy
        if (isExternal) {
          if (isMounted) {
            // Convert external URL to use our proxy
            const proxyUrl = new URL(src);
            const proxyPath = `/api/images${proxyUrl.pathname}${proxyUrl.search}`;
            const fullProxyUrl = new URL(proxyPath, window.location.origin).toString();
            setImageSrc(addCacheBuster(fullProxyUrl));
            setIsLoading(false);
          }
          return;
        }
        
        // For already optimized local images, use them directly
        if (isAlreadyOptimized) {
          if (isMounted) {
            setImageSrc(addCacheBuster(src));
            setIsLoading(false);
          }
          return;
        }
        
        try {
          // Try to fetch with CORS mode
          const response = await fetch(addCacheBuster(src), {
            mode: 'cors',
            cache: 'no-cache'
          });
          
          if (!response.ok) throw new Error('Failed to fetch image');
          
          const blob = await response.blob();
          
          // Skip compression for very small images
          if (blob.size < 100 * 1024) { // 100KB
            if (isMounted) {
              setImageSrc(URL.createObjectURL(blob));
              setIsLoading(false);
            }
            return;
          }
          
          // Compress the image
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: Math.min(maxWidth, maxHeight),
            useWebWorker: true,
            fileType: 'image/jpeg',
            initialQuality: quality,
            alwaysKeepResolution: true,
          };
          
          const compressedBlob = await imageCompression(blob as File, options);
          
          if (isMounted) {
            setImageSrc(URL.createObjectURL(compressedBlob));
            setIsLoading(false);
          }
        } catch (fetchError) {
          console.error('Error optimizing image, falling back to original:', fetchError);
          // Fallback to original source if optimization fails
          if (isMounted) {
            setImageSrc(addCacheBuster(src));
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Error loading image:', err);
        if (isMounted) {
          setError(err as Error);
          setImageSrc(src); // Fallback to original source on error
          setIsLoading(false);
        }
      }
    };
    
    loadAndOptimizeImage();
    
    return () => {
      isMounted = false;
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src, maxWidth, maxHeight, quality]);

  if (error || !imageSrc) {
    return (
      <div className={`${className} bg-gray-100 flex flex-col items-center justify-center text-center p-4`}>
        <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
        <span className="text-sm text-gray-500">
          {error ? 'Failed to load image' : 'No image available'}
        </span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
        <span className="sr-only">Loading image...</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onLoad={() => {
        setIsLoading(false);
        setError(null);
      }}
      onError={(e) => {
        console.error('Error loading image:', e);
        // If we have a fallback source and the current source is not the fallback, try the fallback
        if (src && imageSrc !== src) {
          setImageSrc(src);
        } else {
          setError(new Error('Failed to load image'));
          setIsLoading(false);
        }
      }}
    />
  );
}
