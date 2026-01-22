#!/bin/bash

# Script to extract audio from MP4 files using ffmpeg
# Output format: M4A (change to mp3 if needed)

OUTPUT_FORMAT="m4a"  # Change to "mp3" if you prefer MP3 format

# Find all MP4 files and extract audio
for file in *.mp4; do
    if [ -f "$file" ]; then
        # Get filename without extension
        filename="${file%.*}"
        output_file="${filename}.${OUTPUT_FORMAT}"
        
        echo "Processing: $file -> $output_file"
        
        if [ "$OUTPUT_FORMAT" = "m4a" ]; then
            # Extract audio to M4A format
            ffmpeg -i "$file" -vn -acodec aac -b:a 192k "$output_file" -y
        elif [ "$OUTPUT_FORMAT" = "mp3" ]; then
            # Extract audio to MP3 format
            ffmpeg -i "$file" -vn -acodec libmp3lame -q:a 2 "$output_file" -y
        fi
        
        if [ $? -eq 0 ]; then
            echo "✓ Successfully created: $output_file"
        else
            echo "✗ Failed to process: $file"
        fi
    fi
done

echo "Done processing all MP4 files!"

