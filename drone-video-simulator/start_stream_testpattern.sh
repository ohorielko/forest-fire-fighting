#!/bin/bash

PROJECT_ID="drone-stream-473321"
BUCKET="raspi-video-stream"
STREAM_DIR="./stream"

export GOOGLE_APPLICATION_CREDENTIALS="./my-service-account-key.json"

# Create stream directory
mkdir -p "$STREAM_DIR"

echo "🎥 Starting FFmpeg stream simulator..."
echo "📁 Output directory: $STREAM_DIR"
echo "-----------------------------------------"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "❌ FFmpeg is not installed!"
    echo "Install it with: brew install ffmpeg"
    exit 1
fi

# ACTIVE: Test pattern (works without camera)
echo "🎨 Generating test pattern with audio..."
ffmpeg -f lavfi -i testsrc=size=1280x720:rate=25 -f lavfi -i sine=frequency=1000 \
  -c:v libx264 -b:v 2M -f hls -hls_time 2 -hls_list_size 5 \
  -hls_flags delete_segments "$STREAM_DIR/playlist.m3u8" &

FFMPEG_PID=$!
echo "FFmpeg started (PID: $FFMPEG_PID)"

echo "⏳ Waiting for stream to initialize..."
sleep 5

echo "📤 Starting Python uploader..."
python3 upload_stream.py

# Cleanup on exit
trap "kill $FFMPEG_PID 2>/dev/null" EXIT