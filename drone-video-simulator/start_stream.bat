@echo off
set PROJECT_ID=drone-stream-473321
set BUCKET=raspi-video-stream
set STREAM_DIR=stream

set GOOGLE_APPLICATION_CREDENTIALS=my-service-account-key.json

mkdir %STREAM_DIR% 2>nul

echo Starting FFmpeg stream simulator...
echo Output directory: %STREAM_DIR%
echo -----------------------------------------

REM Check if FFmpeg is installed
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo FFmpeg is not installed!
    echo Install from: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

REM List available video devices (uncomment to see your camera names)
REM ffmpeg -list_devices true -f dshow -i dummy

echo Starting webcam capture...
REM Replace "Integrated Camera" with your actual camera name from the list above
start /B ffmpeg -f dshow -framerate 25 -video_size 1280x720 -i video="Integrated Camera" ^
  -c:v libx264 -b:v 2M -f hls -hls_time 2 -hls_list_size 5 ^
  -hls_flags delete_segments %STREAM_DIR%/playlist.m3u8

REM Alternative: Use test pattern if camera doesn't work
REM start /B ffmpeg -f lavfi -i testsrc=size=1280x720:rate=25 -f lavfi -i sine=frequency=1000 ^
REM   -c:v libx264 -b:v 2M -f hls -hls_time 2 -hls_list_size 5 ^
REM   -hls_flags delete_segments %STREAM_DIR%/playlist.m3u8

timeout /t 5

echo Starting Python uploader...
python upload_stream.py

pause