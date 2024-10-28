import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Jimp from 'jimp';

const ImageProcessor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string);
        
        const image = await Jimp.read(Buffer.from(e.target.result as string, 'base64'));
        
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
          const red = image.bitmap.data[idx + 0];
          const green = image.bitmap.data[idx + 1];
          const blue = image.bitmap.data[idx + 2];
          
          if (red > Math.max(green, blue) * 1.5) {
            // Оставляем красный цвет нетронутым
          } else {
            // Преобразуем в оттенки серого
            const gray = 0.2989 * red + 0.5870 * green + 0.1140 * blue;
            image.bitmap.data[idx + 0] = gray;
            image.bitmap.data[idx + 1] = gray;
            image.bitmap.data[idx + 2] = gray;
          }
        });

        const processedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        setProcessedImage(`data:image/jpeg;base64,${processedBuffer.toString('base64')}`);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Перетащите изображение сюда или кликните для выбора файла</p>
      </div>
      {originalImage && (
        <div>
          <h3>Оригинальное изображение:</h3>
          <img src={originalImage} alt="Original" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {processedImage && (
        <div>
          <h3>Обработанное изображение:</h3>
          <img src={processedImage} alt="Processed" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;