export const processFiles = (files) => {
    const coverPhoto = files.coverPhoto ? `/uploads/${files.coverPhoto[0].filename}` : null;
    const gallery = files.gallery
      ? files.gallery.map((file) => `/uploads/${file.filename}`)
      : [];
    return { coverPhoto, gallery };
  };
  