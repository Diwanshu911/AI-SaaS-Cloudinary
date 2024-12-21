'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function VideoUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null); // For error messages

    const router = useRouter();
    
    // Max file size of 60 MB
    const MAX_FILE_SIZE = 60 * 1024 * 1024;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a video file.');
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setError('File size is too large. Please upload a file smaller than 60MB.');
            return;
        }

        // Validate file type (only video files)
        if (!file.type.startsWith('video/')) {
            setError('Invalid file type. Please upload a video file.');
            return;
        }

        setIsUploading(true);
        setError(null); // Reset error state before uploading
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('originalSize', file.size.toString());

        try {
            const response = await axios.post('/api/video-upload', formData);
            if (response.status === 200) {
                router.push('/'); // Redirect after successful upload
            }
        } catch (error) {
            setError('Video upload failed. Please try again.');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Upload Video</h1>

            {/* Show error if any */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Video File</span>
                    </label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUploading}
                >
                    {isUploading ? "Uploading..." : "Upload Video"}
                </button>
            </form>
        </div>
    );
}

export default VideoUpload;
