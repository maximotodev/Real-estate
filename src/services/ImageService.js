export class ImageService {
  static async uploadImage(file, folder = 'general') {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Image upload failed');
      return await response.json();
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  static async uploadPropertyImages(propertyId, files) {
    try {
      const uploadPromises = files.map((file) =>
        this.uploadImage(file, `properties/${propertyId}`)
      );

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Property images upload error:', error);
      throw error;
    }
  }

  static async deleteImage(imageId) {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Image deletion failed');
      return await response.json();
    } catch (error) {
      console.error('Image deletion error:', error);
      throw error;
    }
  }

  static async optimizeImage(imageUrl, options = {}) {
    try {
      const response = await fetch('/api/images/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          url: imageUrl,
          width: options.width || 800,
          height: options.height || 600,
          quality: options.quality || 80,
        }),
      });

      if (!response.ok) throw new Error('Image optimization failed');
      return await response.json();
    } catch (error) {
      console.error('Image optimization error:', error);
      throw error;
    }
  }

  static validateImageFile(file, maxSize = 10 * 1024 * 1024) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid image format. Only JPG, PNG, WEBP, and GIF are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error(`Image size must be less than ${maxSize / 1024 / 1024}MB`);
    }

    return true;
  }

  static getImageUrl(imageId, options = {}) {
    const baseUrl = process.env.NEXT_PUBLIC_CDN_URL || '/api/images';
    const size = options.size || 'medium'; // small, medium, large, original
    const quality = options.quality || 80;

    return `${baseUrl}/${imageId}?size=${size}&quality=${quality}`;
  }
}

export default ImageService;
