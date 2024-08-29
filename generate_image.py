from PIL import Image, ImageDraw, ImageFont

# Create a blank image with white background
img = Image.new('RGB', (1200, 600), color='white')
draw = ImageDraw.Draw(img)

# Use the full path to the DejaVuSans font
font_path = "/usr/share/fonts/TTF/DejaVuSans.ttf"
font = ImageFont.truetype(font_path, size=150)

# Define text and position
text = "ChatPulse"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
position = ((img.width - text_width) // 2, (img.height - text_height) // 2)

# Add text to image
draw.text(position, text, font=font, fill='black')

# Save the image
img.save('cover-image.jpg')