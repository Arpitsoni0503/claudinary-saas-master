declare module "next-cloudinary" {
    export const CldImage: React.FC<{
      src: string;
      width?: number;
      height?: number;
      alt?: string;
      sizes?: string;
      crop?: string;
      aspectRatio?: string;
      gravity?: string;
      [key: string]: any;
    }>;
  
    export const CldUploadWidget: React.FC<{
      uploadPreset: string;
      onUpload: (result: any) => void;
      [key: string]: any;
    }>;
  }