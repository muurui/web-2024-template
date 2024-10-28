import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography, Box, Button, CircularProgress } from '@mui/material';
import './ImageProcessor.css';

interface ImageProcessorProps {
  addLog: (message: string) => void;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ addLog }) => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processImage = (imageData: ImageData) => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];

      if (red > Math.max(green, blue) * 1.5) {
        // Оставляем красный цвет нетронутым
      } else {
        // Преобразуем в оттенки серого
        const gray = 0.2989 * red + 0.5870 * green + 0.1140 * blue;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
    }
    return imageData;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string);
        addLog('Изображение загружено');
      }
    };

    reader.readAsDataURL(file);
  }, [addLog]);

  const handleProcessImage = () => {
    if (!originalImage) return;

    setIsProcessing(true);
    addLog('Начало обработки изображения');

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const processedData = processImage(imageData);
        ctx.putImageData(processedData, 0, 0);
        setProcessedImage(canvas.toDataURL('image/jpeg'));
        addLog('Обработка изображения завершена');
      }
      setIsProcessing(false);
    };
    img.src = originalImage;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        {...getRootProps()}
        className="dropzone"
        sx={{
          border: '2px dashed #ccc',
          padding: 3,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? 'rgba(232, 240, 254, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive ? 'Отпустите файл здесь' : 'Перетащите изображение сюда или кликните для выбора файла'}
        </Typography>
      </Paper>
      {originalImage && (
        <Paper className="image-container" sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" gutterBottom>Оригинальное изображение:</Typography>
          <img src={originalImage} alt="Original" style={{ maxWidth: '100%', borderRadius: '10px' }} />
          <Button
            className="process-button"
            variant="contained"
            onClick={handleProcessImage}
            disabled={isProcessing}
            sx={{ mt: 2 }}
          >
            {isProcessing ? <CircularProgress size={24} /> : 'Обработать изображение'}
          </Button>
        </Paper>
      )}
      {processedImage && (
        <Paper className="image-container" sx={{ mt: 4, p: 2 }}>
          <Typography variant="h5" gutterBottom>Обработанное изображение:</Typography>
          <img src={processedImage} alt="Processed" style={{ maxWidth: '100%', borderRadius: '10px' }} />
        </Paper>
      )}
    </Box>
  );
};

export default ImageProcessor;