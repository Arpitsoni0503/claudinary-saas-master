"use client"
import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Video } from '@/types'

function Home() {
    const [videos, setVideos] = useState<Video[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchVideos = useCallback(async () => {
        try {
            const response = await axios.get("/api/videos")
            if(Array.isArray(response.data)) {
                setVideos(response.data)
            } else {
                throw new Error("Unexpected response format");
            }
        } catch (error) {
            console.log(error);
            setError("Failed to fetch videos")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    const handleDownload = useCallback((publicId: string, title: string) => {
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const downloadUrl = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto:low/${publicId}.mp4`;
        
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `${title}-compressed.mp4`);
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [])

    if(loading){
        return <div className="container mx-auto p-4 text-center">Loading images...</div>
    }

    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Images</h1>
          
        <div className='text-4xl'>Edited Images are shown in the Social Share page</div>

        </div>
      );
}

export default Home