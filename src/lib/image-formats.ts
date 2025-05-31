export interface ImageFormat {
  format: string
  description: string
  supportsReading: boolean
  supportsWriting: boolean
}

export const SUPPORTED_FORMATS: ImageFormat[] = [
  { format: '3FR', description: 'Hasselblad CFV/H3D39II Raw Format', supportsReading: true, supportsWriting: false },
  { format: '3G2', description: 'Media Container', supportsReading: true, supportsWriting: false },
  { format: '3GP', description: 'Media Container', supportsReading: true, supportsWriting: false },
  { format: 'A', description: 'Raw alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'AAI', description: 'AAI Dune image', supportsReading: true, supportsWriting: true },
  { format: 'AI', description: 'Adobe Illustrator CS2', supportsReading: true, supportsWriting: true },
  { format: 'APNG', description: 'Animated Portable Network Graphics', supportsReading: true, supportsWriting: true },
  { format: 'ART', description: 'PFS: 1st Publisher Clip Art', supportsReading: true, supportsWriting: true },
  { format: 'ARW', description: 'Sony Alpha Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'ASHLAR', description: 'Image sequence laid out in continuous irregular courses', supportsReading: false, supportsWriting: true },
  { format: 'AVI', description: 'Microsoft Audio/Visual Interleaved', supportsReading: true, supportsWriting: false },
  { format: 'AVIF', description: 'AV1 Image File Format', supportsReading: true, supportsWriting: true },
  { format: 'AVS', description: 'AVS X image', supportsReading: true, supportsWriting: true },
  { format: 'B', description: 'Raw blue samples', supportsReading: true, supportsWriting: true },
  { format: 'BAYER', description: 'Raw mosaiced samples', supportsReading: true, supportsWriting: true },
  { format: 'BAYERA', description: 'Raw mosaiced and alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'BGR', description: 'Raw blue, green, and red samples', supportsReading: true, supportsWriting: true },
  { format: 'BGRA', description: 'Raw blue, green, red, and alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'BGRO', description: 'Raw blue, green, red, and opacity samples', supportsReading: true, supportsWriting: true },
  { format: 'BMP', description: 'Microsoft Windows bitmap image', supportsReading: true, supportsWriting: true },
  { format: 'BMP2', description: 'Microsoft Windows bitmap image (V2)', supportsReading: true, supportsWriting: true },
  { format: 'BMP3', description: 'Microsoft Windows bitmap image (V3)', supportsReading: true, supportsWriting: true },
  { format: 'BRF', description: 'BRF ASCII Braille format', supportsReading: false, supportsWriting: true },
  { format: 'C', description: 'Raw cyan samples', supportsReading: true, supportsWriting: true },
  { format: 'CAL', description: 'Continuous Acquisition and Life-cycle Support Type 1', supportsReading: true, supportsWriting: true },
  { format: 'CALS', description: 'Continuous Acquisition and Life-cycle Support Type 1', supportsReading: true, supportsWriting: true },
  { format: 'CANVAS', description: 'Constant image uniform color', supportsReading: true, supportsWriting: false },
  { format: 'CAPTION', description: 'Caption', supportsReading: true, supportsWriting: false },
  { format: 'CIN', description: 'Cineon Image File', supportsReading: true, supportsWriting: true },
  { format: 'CIP', description: 'Cisco IP phone image format', supportsReading: false, supportsWriting: true },
  { format: 'CLIP', description: 'Image Clip Mask', supportsReading: true, supportsWriting: true },
  { format: 'CMYK', description: 'Raw cyan, magenta, yellow, and black samples', supportsReading: true, supportsWriting: true },
  { format: 'CMYKA', description: 'Raw cyan, magenta, yellow, black, and alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'CR2', description: 'Canon Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'CR3', description: 'Canon Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'CRW', description: 'Canon Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'CUBE', description: 'Cube LUT', supportsReading: true, supportsWriting: false },
  { format: 'CUR', description: 'Microsoft icon', supportsReading: true, supportsWriting: true },
  { format: 'CUT', description: 'DR Halo', supportsReading: true, supportsWriting: false },
  { format: 'DATA', description: 'Base64-encoded inline images', supportsReading: true, supportsWriting: true },
  { format: 'DCM', description: 'Digital Imaging and Communications in Medicine image', supportsReading: true, supportsWriting: false },
  { format: 'DCR', description: 'Kodak Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'DCRAW', description: 'Raw Photo Decoder (dcraw)', supportsReading: true, supportsWriting: false },
  { format: 'DCX', description: 'ZSoft IBM PC multi-page Paintbrush', supportsReading: true, supportsWriting: true },
  { format: 'DDS', description: 'Microsoft DirectDraw Surface', supportsReading: true, supportsWriting: true },
  { format: 'DFONT', description: 'Multi-face font package', supportsReading: true, supportsWriting: false },
  { format: 'DNG', description: 'Digital Negative Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'DPX', description: 'SMPTE 268M-2003 (DPX 2.0)', supportsReading: true, supportsWriting: true },
  { format: 'DXT1', description: 'Microsoft DirectDraw Surface', supportsReading: true, supportsWriting: true },
  { format: 'DXT5', description: 'Microsoft DirectDraw Surface', supportsReading: true, supportsWriting: true },
  { format: 'EPDF', description: 'Encapsulated Portable Document Format', supportsReading: true, supportsWriting: true },
  { format: 'EPI', description: 'Encapsulated PostScript Interchange format', supportsReading: true, supportsWriting: true },
  { format: 'EPS', description: 'Encapsulated PostScript', supportsReading: true, supportsWriting: true },
  { format: 'EPS2', description: 'Level II Encapsulated PostScript', supportsReading: false, supportsWriting: true },
  { format: 'EPS3', description: 'Level III Encapsulated PostScript', supportsReading: false, supportsWriting: true },
  { format: 'EPSF', description: 'Encapsulated PostScript', supportsReading: true, supportsWriting: true },
  { format: 'EPSI', description: 'Encapsulated PostScript Interchange format', supportsReading: true, supportsWriting: true },
  { format: 'EPT', description: 'Encapsulated PostScript with TIFF preview', supportsReading: true, supportsWriting: true },
  { format: 'EPT2', description: 'Encapsulated PostScript Level II with TIFF preview', supportsReading: true, supportsWriting: true },
  { format: 'EPT3', description: 'Encapsulated PostScript Level III with TIFF preview', supportsReading: true, supportsWriting: true },
  { format: 'ERF', description: 'Epson Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'EXR', description: 'High Dynamic-range (HDR)', supportsReading: true, supportsWriting: true },
  { format: 'FARBFELD', description: 'Farbfeld', supportsReading: true, supportsWriting: true },
  { format: 'FAX', description: 'Group 3 FAX', supportsReading: true, supportsWriting: true },
  { format: 'FF', description: 'Farbfeld', supportsReading: true, supportsWriting: true },
  { format: 'FFF', description: 'Hasselblad CFV/H3D39II Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'FILE', description: 'Uniform Resource Locator (file://)', supportsReading: true, supportsWriting: false },
  { format: 'FITS', description: 'Flexible Image Transport System', supportsReading: true, supportsWriting: true },
  { format: 'FL32', description: 'FilmLight', supportsReading: true, supportsWriting: true },
  { format: 'FLV', description: 'Flash Video Stream', supportsReading: true, supportsWriting: true },
  { format: 'FRACTAL', description: 'Plasma fractal image', supportsReading: true, supportsWriting: false },
  { format: 'FTP', description: 'Uniform Resource Locator (ftp://)', supportsReading: false, supportsWriting: false },
  { format: 'FTS', description: 'Flexible Image Transport System', supportsReading: true, supportsWriting: true },
  { format: 'FTXT', description: 'Formatted text image', supportsReading: true, supportsWriting: true },
  { format: 'G', description: 'Raw green samples', supportsReading: true, supportsWriting: true },
  { format: 'G3', description: 'Group 3 FAX', supportsReading: true, supportsWriting: true },
  { format: 'G4', description: 'Group 4 FAX', supportsReading: true, supportsWriting: true },
  { format: 'GIF', description: 'CompuServe graphics interchange format', supportsReading: true, supportsWriting: true },
  { format: 'GIF87', description: 'CompuServe graphics interchange format', supportsReading: true, supportsWriting: true },
  { format: 'GRADIENT', description: 'Gradual linear passing from one shade to another', supportsReading: true, supportsWriting: false },
  { format: 'GRAY', description: 'Raw gray samples', supportsReading: true, supportsWriting: true },
  { format: 'GRAYA', description: 'Raw gray and alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'GROUP4', description: 'Raw CCITT Group4', supportsReading: true, supportsWriting: true },
  { format: 'HALD', description: 'Identity Hald color lookup table image', supportsReading: true, supportsWriting: false },
  { format: 'HDR', description: 'Radiance RGBE image format', supportsReading: true, supportsWriting: true },
  { format: 'HEIC', description: 'High Efficiency Image Format', supportsReading: true, supportsWriting: false },
  { format: 'HEIF', description: 'High Efficiency Image Format', supportsReading: true, supportsWriting: false },
  { format: 'HISTOGRAM', description: 'Histogram of the image', supportsReading: false, supportsWriting: true },
  { format: 'HRZ', description: 'Slow Scan TeleVision', supportsReading: true, supportsWriting: true },
  { format: 'HTM', description: 'Hypertext Markup Language and a client-side image map', supportsReading: false, supportsWriting: true },
  { format: 'HTML', description: 'Hypertext Markup Language and a client-side image map', supportsReading: false, supportsWriting: true },
  { format: 'HTTP', description: 'Uniform Resource Locator (http://)', supportsReading: false, supportsWriting: false },
  { format: 'HTTPS', description: 'Uniform Resource Locator (https://)', supportsReading: true, supportsWriting: false },
  { format: 'ICB', description: 'Truevision Targa image', supportsReading: true, supportsWriting: true },
  { format: 'ICO', description: 'Microsoft icon', supportsReading: true, supportsWriting: true },
  { format: 'ICON', description: 'Microsoft icon', supportsReading: true, supportsWriting: true },
  { format: 'IIQ', description: 'Phase One Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'INFO', description: 'The image format and characteristics', supportsReading: false, supportsWriting: true },
  { format: 'INLINE', description: 'Base64-encoded inline images', supportsReading: true, supportsWriting: true },
  { format: 'IPL', description: 'IPL Image Sequence', supportsReading: true, supportsWriting: true },
  { format: 'ISOBRL', description: 'ISO/TR 11548-1 format', supportsReading: false, supportsWriting: true },
  { format: 'ISOBRL6', description: 'ISO/TR 11548-1 format 6dot', supportsReading: false, supportsWriting: true },
  { format: 'J2C', description: 'JPEG-2000 Code Stream Syntax', supportsReading: true, supportsWriting: true },
  { format: 'J2K', description: 'JPEG-2000 Code Stream Syntax', supportsReading: true, supportsWriting: true },
  { format: 'JNG', description: 'JPEG Network Graphics', supportsReading: true, supportsWriting: true },
  { format: 'JNX', description: 'Garmin tile format', supportsReading: true, supportsWriting: false },
  { format: 'JP2', description: 'JPEG-2000 File Format Syntax', supportsReading: true, supportsWriting: true },
  { format: 'JPC', description: 'JPEG-2000 Code Stream Syntax', supportsReading: true, supportsWriting: true },
  { format: 'JPE', description: 'Joint Photographic Experts Group JFIF format', supportsReading: true, supportsWriting: true },
  { format: 'JPEG', description: 'Joint Photographic Experts Group JFIF format', supportsReading: true, supportsWriting: true },
  { format: 'JPG', description: 'Joint Photographic Experts Group JFIF format', supportsReading: true, supportsWriting: true },
  { format: 'JPM', description: 'JPEG-2000 File Format Syntax', supportsReading: true, supportsWriting: true },
  { format: 'JPS', description: 'Joint Photographic Experts Group JFIF format', supportsReading: true, supportsWriting: true },
  { format: 'JPT', description: 'JPEG-2000 File Format Syntax', supportsReading: true, supportsWriting: true },
  { format: 'JSON', description: 'The image format and characteristics', supportsReading: false, supportsWriting: true },
  { format: 'JXL', description: 'JPEG XL (ISO/IEC 18181)', supportsReading: true, supportsWriting: true },
  { format: 'K', description: 'Raw black samples', supportsReading: true, supportsWriting: true },
  { format: 'K25', description: 'Kodak Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'KDC', description: 'Kodak Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'LABEL', description: 'Image label', supportsReading: true, supportsWriting: false },
  { format: 'M', description: 'Raw magenta samples', supportsReading: true, supportsWriting: true },
  { format: 'M2V', description: 'MPEG Video Stream', supportsReading: true, supportsWriting: true },
  { format: 'M4V', description: 'Raw VIDEO-4 Video', supportsReading: true, supportsWriting: true },
  { format: 'MAC', description: 'MAC Paint', supportsReading: true, supportsWriting: false },
  { format: 'MAP', description: 'Colormap intensities and indices', supportsReading: true, supportsWriting: true },
  { format: 'MASK', description: 'Image Clip Mask', supportsReading: true, supportsWriting: true },
  { format: 'MAT', description: 'MATLAB level 5 image format', supportsReading: true, supportsWriting: true },
  { format: 'MATTE', description: 'MATTE format', supportsReading: false, supportsWriting: true },
  { format: 'MDC', description: 'Minolta Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'MEF', description: 'Mamiya Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'MIFF', description: 'Magick Image File Format', supportsReading: true, supportsWriting: true },
  { format: 'MKV', description: 'Multimedia Container', supportsReading: true, supportsWriting: true },
  { format: 'MNG', description: 'Multiple-image Network Graphics', supportsReading: true, supportsWriting: true },
  { format: 'MONO', description: 'Raw bi-level bitmap', supportsReading: true, supportsWriting: true },
  { format: 'MOS', description: 'Aptus Leaf Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'MOV', description: 'MPEG Video Stream', supportsReading: true, supportsWriting: true },
  { format: 'MP4', description: 'VIDEO-4 Video Stream', supportsReading: true, supportsWriting: true },
  { format: 'MPC', description: 'Magick Pixel Cache image format', supportsReading: true, supportsWriting: true },
  { format: 'MPEG', description: 'MPEG Video Stream', supportsReading: true, supportsWriting: true },
  { format: 'MPG', description: 'MPEG Video Stream', supportsReading: true, supportsWriting: true },
  { format: 'MPO', description: 'Joint Photographic Experts Group JFIF format', supportsReading: true, supportsWriting: false },
  { format: 'MRW', description: 'Sony (Minolta) Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'MSL', description: 'Magick Scripting Language', supportsReading: true, supportsWriting: true },
  { format: 'MSVG', description: 'ImageMagick\'s own SVG internal renderer', supportsReading: true, supportsWriting: true },
  { format: 'MTV', description: 'MTV Raytracing image format', supportsReading: true, supportsWriting: true },
  { format: 'MVG', description: 'Magick Vector Graphics', supportsReading: true, supportsWriting: true },
  { format: 'NEF', description: 'Nikon Digital SLR Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'NRW', description: 'Nikon Digital SLR Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'NULL', description: 'Constant image of uniform color', supportsReading: true, supportsWriting: true },
  { format: 'O', description: 'Raw opacity samples', supportsReading: true, supportsWriting: true },
  { format: 'ORA', description: 'OpenRaster format', supportsReading: false, supportsWriting: false },
  { format: 'ORF', description: 'Olympus Digital Camera Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'OTB', description: 'On-the-air bitmap', supportsReading: true, supportsWriting: true },
  { format: 'OTF', description: 'Open Type font', supportsReading: true, supportsWriting: false },
  { format: 'PAL', description: '16bit/pixel interleaved YUV', supportsReading: true, supportsWriting: true },
  { format: 'PALM', description: 'Palm pixmap', supportsReading: true, supportsWriting: true },
  { format: 'PAM', description: 'Common 2-dimensional bitmap format', supportsReading: true, supportsWriting: true },
  { format: 'PANGO', description: 'Pango Markup Language', supportsReading: false, supportsWriting: false },
  { format: 'PATTERN', description: 'Predefined pattern', supportsReading: true, supportsWriting: false },
  { format: 'PBM', description: 'Portable bitmap format (black and white)', supportsReading: true, supportsWriting: true },
  { format: 'PCD', description: 'Photo CD', supportsReading: true, supportsWriting: true },
  { format: 'PCDS', description: 'Photo CD', supportsReading: true, supportsWriting: true },
  { format: 'PCL', description: 'Printer Control Language', supportsReading: true, supportsWriting: true },
  { format: 'PCT', description: 'Apple Macintosh QuickDraw/PICT', supportsReading: true, supportsWriting: true },
  { format: 'PCX', description: 'ZSoft IBM PC Paintbrush', supportsReading: true, supportsWriting: true },
  { format: 'PDB', description: 'Palm Database ImageViewer Format', supportsReading: true, supportsWriting: true },
  { format: 'PDF', description: 'Portable Document Format', supportsReading: true, supportsWriting: true },
  { format: 'PDFA', description: 'Portable Document Archive Format', supportsReading: true, supportsWriting: true },
  { format: 'PEF', description: 'Pentax Electronic Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'PES', description: 'Embrid Embroidery Format', supportsReading: true, supportsWriting: false },
  { format: 'PFA', description: 'Postscript Type 1 font (ASCII)', supportsReading: true, supportsWriting: false },
  { format: 'PFB', description: 'Postscript Type 1 font (binary)', supportsReading: true, supportsWriting: false },
  { format: 'PFM', description: 'Portable float format', supportsReading: true, supportsWriting: true },
  { format: 'PGM', description: 'Portable graymap format (gray scale)', supportsReading: true, supportsWriting: true },
  { format: 'PGX', description: 'JPEG 2000 uncompressed format', supportsReading: true, supportsWriting: true },
  { format: 'PHM', description: 'Portable half float format', supportsReading: true, supportsWriting: true },
  { format: 'PICON', description: 'Personal Icon', supportsReading: true, supportsWriting: true },
  { format: 'PICT', description: 'Apple Macintosh QuickDraw/PICT', supportsReading: true, supportsWriting: true },
  { format: 'PIX', description: 'Alias/Wavefront RLE image format', supportsReading: true, supportsWriting: false },
  { format: 'PJPEG', description: 'Joint Photographic Experts Group JFIF format', supportsReading: true, supportsWriting: true },
  { format: 'PLASMA', description: 'Plasma fractal image', supportsReading: true, supportsWriting: false },
  { format: 'PNG', description: 'Portable Network Graphics', supportsReading: true, supportsWriting: true },
  { format: 'PNG00', description: 'PNG inheriting bit-depth, color-type from original, if possible', supportsReading: true, supportsWriting: true },
  { format: 'PNG24', description: 'opaque or binary transparent 24-bit RGB', supportsReading: true, supportsWriting: true },
  { format: 'PNG32', description: 'opaque or transparent 32-bit RGBA', supportsReading: true, supportsWriting: true },
  { format: 'PNG48', description: 'opaque or binary transparent 48-bit RGB', supportsReading: true, supportsWriting: true },
  { format: 'PNG64', description: 'opaque or transparent 64-bit RGBA', supportsReading: true, supportsWriting: true },
  { format: 'PNG8', description: '8-bit indexed with optional binary transparency', supportsReading: true, supportsWriting: true },
  { format: 'PNM', description: 'Portable anymap', supportsReading: true, supportsWriting: true },
  { format: 'POCKETMOD', description: 'Pocketmod Personal Organizer', supportsReading: true, supportsWriting: true },
  { format: 'PPM', description: 'Portable pixmap format (color)', supportsReading: true, supportsWriting: true },
  { format: 'PS', description: 'PostScript', supportsReading: true, supportsWriting: true },
  { format: 'PS2', description: 'Level II PostScript', supportsReading: false, supportsWriting: true },
  { format: 'PS3', description: 'Level III PostScript', supportsReading: false, supportsWriting: true },
  { format: 'PSB', description: 'Adobe Large Document Format', supportsReading: true, supportsWriting: true },
  { format: 'PSD', description: 'Adobe Photoshop bitmap', supportsReading: true, supportsWriting: true },
  { format: 'PTIF', description: 'Pyramid encoded TIFF', supportsReading: true, supportsWriting: true },
  { format: 'PWP', description: 'Seattle Film Works', supportsReading: true, supportsWriting: false },
  { format: 'QOI', description: 'Quite OK image format', supportsReading: true, supportsWriting: true },
  { format: 'R', description: 'Raw red samples', supportsReading: true, supportsWriting: true },
  { format: 'RADIAL-GRADIENT', description: 'Gradual radial passing from one shade to another', supportsReading: true, supportsWriting: false },
  { format: 'RAF', description: 'Fuji CCD-RAW Graphic Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'RAS', description: 'SUN Rasterfile', supportsReading: true, supportsWriting: true },
  { format: 'RAW', description: 'Raw', supportsReading: true, supportsWriting: false },
  { format: 'RGB', description: 'Raw red, green, and blue samples', supportsReading: true, supportsWriting: true },
  { format: 'RGB565', description: 'Raw red, green, blue samples in 565 format', supportsReading: true, supportsWriting: false },
  { format: 'RGBA', description: 'Raw red, green, blue, and alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'RGBO', description: 'Raw red, green, blue, and opacity samples', supportsReading: true, supportsWriting: true },
  { format: 'RGF', description: 'LEGO Mindstorms EV3 Robot Graphic Format (black and white)', supportsReading: true, supportsWriting: true },
  { format: 'RLA', description: 'Alias/Wavefront image', supportsReading: true, supportsWriting: false },
  { format: 'RLE', description: 'Utah Run length encoded image', supportsReading: true, supportsWriting: false },
  { format: 'RMF', description: 'Raw Media Format', supportsReading: true, supportsWriting: false },
  { format: 'RW2', description: 'Panasonic Lumix Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'RWL', description: 'Leica Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'SCR', description: 'ZX-Spectrum SCREEN$', supportsReading: true, supportsWriting: false },
  { format: 'SCREENSHOT', description: 'Screen shot', supportsReading: true, supportsWriting: false },
  { format: 'SCT', description: 'Scitex HandShake', supportsReading: true, supportsWriting: false },
  { format: 'SFW', description: 'Seattle Film Works', supportsReading: true, supportsWriting: false },
  { format: 'SGI', description: 'Irix RGB image', supportsReading: true, supportsWriting: true },
  { format: 'SHTML', description: 'Hypertext Markup Language and a client-side image map', supportsReading: false, supportsWriting: true },
  { format: 'SIX', description: 'DEC SIXEL Graphics Format', supportsReading: true, supportsWriting: true },
  { format: 'SIXEL', description: 'DEC SIXEL Graphics Format', supportsReading: true, supportsWriting: true },
  { format: 'SPARSE-COLOR', description: 'Sparse Color', supportsReading: false, supportsWriting: true },
  { format: 'SR2', description: 'Sony Raw Format 2', supportsReading: true, supportsWriting: false },
  { format: 'SRF', description: 'Sony Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'SRW', description: 'Samsung Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'STEGANO', description: 'Steganographic image', supportsReading: true, supportsWriting: false },
  { format: 'STI', description: 'Sinar CaptureShop Raw Format', supportsReading: true, supportsWriting: false },
  { format: 'STRIMG', description: 'String to image and back', supportsReading: true, supportsWriting: true },
  { format: 'SUN', description: 'SUN Rasterfile', supportsReading: true, supportsWriting: true },
  { format: 'SVG', description: 'Scalable Vector Graphics', supportsReading: true, supportsWriting: true },
  { format: 'SVGZ', description: 'Compressed Scalable Vector Graphics', supportsReading: true, supportsWriting: true },
  { format: 'TEXT', description: 'Text', supportsReading: true, supportsWriting: false },
  { format: 'TGA', description: 'Truevision Targa image', supportsReading: true, supportsWriting: true },
  { format: 'THUMBNAIL', description: 'EXIF Profile Thumbnail', supportsReading: false, supportsWriting: true },
  { format: 'TIFF', description: 'Tagged Image File Format', supportsReading: true, supportsWriting: true },
  { format: 'TIFF64', description: 'Tagged Image File Format (64-bit)', supportsReading: true, supportsWriting: true },
  { format: 'TILE', description: 'Tile image with a texture', supportsReading: true, supportsWriting: false },
  { format: 'TIM', description: 'PSX TIM', supportsReading: true, supportsWriting: false },
  { format: 'TM2', description: 'PS2 TIM2', supportsReading: true, supportsWriting: false },
  { format: 'TTC', description: 'TrueType font collection', supportsReading: true, supportsWriting: false },
  { format: 'TTF', description: 'TrueType font', supportsReading: true, supportsWriting: false },
  { format: 'TXT', description: 'Text', supportsReading: true, supportsWriting: true },
  { format: 'UBRL', description: 'Unicode Text format', supportsReading: false, supportsWriting: true },
  { format: 'UBRL6', description: 'Unicode Text format 6dot', supportsReading: false, supportsWriting: true },
  { format: 'UIL', description: 'X-Motif UIL table', supportsReading: false, supportsWriting: true },
  { format: 'UYVY', description: '16bit/pixel interleaved YUV', supportsReading: true, supportsWriting: true },
  { format: 'VDA', description: 'Truevision Targa image', supportsReading: true, supportsWriting: true },
  { format: 'VICAR', description: 'Video Image Communication And Retrieval', supportsReading: true, supportsWriting: true },
  { format: 'VID', description: 'Visual Image Directory', supportsReading: true, supportsWriting: true },
  { format: 'VIFF', description: 'Khoros Visualization image', supportsReading: true, supportsWriting: true },
  { format: 'VIPS', description: 'VIPS image', supportsReading: true, supportsWriting: true },
  { format: 'VST', description: 'Truevision Targa image', supportsReading: true, supportsWriting: true },
  { format: 'WBMP', description: 'Wireless Bitmap (level 0) image', supportsReading: true, supportsWriting: true },
  { format: 'WEBM', description: 'Open Web Media', supportsReading: true, supportsWriting: true },
  { format: 'WEBP', description: 'WebP Image Format', supportsReading: true, supportsWriting: true },
  { format: 'WMV', description: 'Windows Media Video', supportsReading: true, supportsWriting: true },
  { format: 'WPG', description: 'Word Perfect Graphics', supportsReading: true, supportsWriting: true },
  { format: 'X3F', description: 'Sigma Camera RAW Format', supportsReading: true, supportsWriting: false },
  { format: 'XBM', description: 'X Windows system bitmap (black and white)', supportsReading: true, supportsWriting: true },
  { format: 'XC', description: 'Constant image uniform color', supportsReading: true, supportsWriting: false },
  { format: 'XCF', description: 'GIMP image', supportsReading: true, supportsWriting: false },
  { format: 'XPM', description: 'X Windows system pixmap (color)', supportsReading: true, supportsWriting: true },
  { format: 'XPS', description: 'Microsoft XML Paper Specification', supportsReading: true, supportsWriting: false },
  { format: 'XV', description: 'Khoros Visualization image', supportsReading: true, supportsWriting: true },
  { format: 'Y', description: 'Raw yellow samples', supportsReading: true, supportsWriting: true },
  { format: 'YAML', description: 'The image format and characteristics', supportsReading: false, supportsWriting: true },
  { format: 'YCBCR', description: 'Raw Y, Cb, and Cr samples', supportsReading: true, supportsWriting: true },
  { format: 'YCBCRA', description: 'Raw Y, Cb, Cr, and alpha samples', supportsReading: true, supportsWriting: true },
  { format: 'YUV', description: 'CCIR 601 4:1:1 or 4:2:2', supportsReading: true, supportsWriting: true }
]

// よく使われるフォーマットを先頭に配置
export const POPULAR_FORMATS = [
  // 最も一般的
  'JPEG', 'JPG', 'PNG', 'WEBP', 'GIF',
  
  // 現代的なフォーマット
  'AVIF', 'JXL', 'HEIC', 'HEIF',
  
  // プロフェッショナル/印刷
  'TIFF', 'PDF', 'PSD', 'EPS',
  
  // ベクター/アイコン
  'SVG', 'ICO',
  
  // レガシー（まだ使用される）
  'BMP', 'TGA'
]

// 画像形式として扱うフォーマット（動画、テキスト、フォントなどを除外）- 出力対応92種類
const IMAGE_FORMATS = [
  // 基本的な画像フォーマット (8種類)
  'JPEG', 'JPG', 'PNG', 'WEBP', 'AVIF', 'GIF', 'BMP', 'TIFF',
  
  // 次世代フォーマット (3種類) - HEIC, HEIFを除外（読み込み専用）
  'JXL', 'APNG', 'QOI',
  
  // Adobe/プロフェッショナル (6種類) - PDFAを追加
  'PSD', 'PSB', 'AI', 'EPS', 'PDF', 'PDFA',
  
  // HDR/科学技術フォーマット (6種類)
  'EXR', 'HDR', 'FITS', 'FTS', 'DPX', 'CIN',
  
  // JPEG 2000 ファミリー (7種類)
  'J2K', 'J2C', 'JP2', 'JPC', 'JPM', 'JPT', 'JNG',
  
  // レガシー/特殊フォーマット (5種類) - XCFを除外（読み込み専用）
  'TGA', 'PCX', 'DDS', 'ICO', 'CUR',
  
  // ベクターグラフィックス (3種類)
  'SVG', 'SVGZ', 'MVG',
  
  // Portable formats (7種類)
  'PBM', 'PGM', 'PPM', 'PAM', 'PNM', 'PFM', 'PHM',
  
  // 古いフォーマット (9種類)
  'XBM', 'XPM', 'PICON', 'PICT', 'PCT', 'SGI', 'SUN', 'RAS', 'MTV',
  
  // 専用フォーマット (7種類)
  'PALM', 'WBMP', 'OTB', 'PTIF', 'TIFF64', 'FARBFELD', 'FF',
  
  // 画像シーケンス (2種類) - MPOを除外（読み込み専用）
  'MNG', 'JPS',
  
  // プリンター/FAX (4種類)
  'FAX', 'G3', 'G4', 'GROUP4',
  
  // ImageMagick固有 (6種類)
  'MIFF', 'CLIP', 'MASK', 'MONO', 'GRAY', 'GRAYA',
  
  // 追加の画像フォーマット (19種類) - PNG variants追加
  'BMP2', 'BMP3', 'DCX', 'EPDF', 'EPSF', 'EPSI', 'EPT', 'EPT2', 'EPT3',
  'GIF87', 'ICB', 'ICON', 'INLINE', 'PJPEG', 'VDA', 'VST', 'PNG8', 'PNG24', 'PNG32'
]

// 入力対応の画像フォーマット（実用的な85種類に限定）
const INPUT_IMAGE_FORMATS = [
  // 基本的な画像フォーマット (8種類)
  'JPEG', 'JPG', 'PNG', 'WEBP', 'AVIF', 'GIF', 'BMP', 'TIFF',
  
  // 次世代フォーマット (5種類)
  'JXL', 'APNG', 'HEIC', 'HEIF', 'QOI',
  
  // Adobe/プロフェッショナル (5種類)
  'PSD', 'PSB', 'AI', 'EPS', 'PDF',
  
  // RAWフォーマット（主要メーカー28種類）
  'CR2', 'CR3', 'CRW', 'NEF', 'ARW', 'DNG', 'RAF', 'ORF', 'RW2', 'PEF', 'SRW', 
  'ERF', 'MEF', 'MRW', '3FR', 'NRW', 'IIQ', 'X3F', 'K25', 'KDC', 'DCR', 'RWL', 
  'FFF', 'STI', 'SR2', 'SRF', 'MOS', 'MDC',
  
  // HDR/科学技術フォーマット (6種類)
  'EXR', 'HDR', 'FITS', 'FTS', 'DPX', 'CIN',
  
  // JPEG 2000 ファミリー (7種類)
  'J2K', 'J2C', 'JP2', 'JPC', 'JPM', 'JPT', 'JNG',
  
  // レガシー/特殊フォーマット (6種類)
  'TGA', 'PCX', 'DDS', 'XCF', 'ICO', 'CUR',
  
  // ベクターグラフィックス (3種類)
  'SVG', 'SVGZ', 'MVG',
  
  // Portable formats (7種類)
  'PBM', 'PGM', 'PPM', 'PAM', 'PNM', 'PFM', 'PHM',
  
  // 古いフォーマット (7種類)
  'XBM', 'XPM', 'PICON', 'PICT', 'PCT', 'SGI', 'SUN',
  
  // 専用フォーマット (3種類)
  'PALM', 'WBMP', 'FARBFELD'
]

// 出力可能なフォーマットのみを取得
export const getWritableFormats = () => {
  return SUPPORTED_FORMATS.filter(format => format.supportsWriting)
}

// 読み込み可能なフォーマットのみを取得
export const getReadableFormats = () => {
  return SUPPORTED_FORMATS.filter(format => format.supportsReading)
}

// 画像フォーマットのみを取得（動画、テキスト、フォントなどを除外）
export const getImageFormats = () => {
  return SUPPORTED_FORMATS.filter(format => 
    format.supportsWriting && IMAGE_FORMATS.includes(format.format)
  )
}

// 入力対応の画像フォーマットのみを取得
export const getInputImageFormats = () => {
  return SUPPORTED_FORMATS.filter(format => 
    format.supportsReading && INPUT_IMAGE_FORMATS.includes(format.format)
  )
}

// フォーマット名から詳細情報を取得
export const getFormatInfo = (formatName: string) => {
  return SUPPORTED_FORMATS.find(format => 
    format.format.toLowerCase() === formatName.toLowerCase()
  )
}

// デバッグ用: 画像フォーマット統計を取得
export const getImageFormatStats = () => {
  const inputImageFormats = getInputImageFormats()
  const outputImageFormats = getImageFormats()
  
  // SUPPORTED_FORMATSから読み込み/書き込み可能なフォーマットの総数
  const allReadableFormats = getReadableFormats()
  const allWritableFormats = getWritableFormats()
  
  // IMAGE_FORMATS配列に含まれているが、SUPPORTED_FORMATSにないフォーマットを検出
  const missingFromSupported = IMAGE_FORMATS.filter(imgFormat => 
    !SUPPORTED_FORMATS.some(sf => sf.format === imgFormat)
  )
  
  // SUPPORTED_FORMATSにあるがIMAGE_FORMATSに含まれていない画像フォーマットを検出
  const notInImageFormats = SUPPORTED_FORMATS.filter(sf => 
    sf.supportsWriting && !IMAGE_FORMATS.includes(sf.format)
  ).map(sf => sf.format)
  
  // IMAGE_FORMATSに含まれているが書き込み非対応のフォーマットを検出
  const readOnlyInImageFormats = IMAGE_FORMATS.filter(imgFormat => {
    const format = SUPPORTED_FORMATS.find(sf => sf.format === imgFormat)
    return format && !format.supportsWriting
  })
  
  // 開発環境でのみコンソール出力
  if (process.env.NODE_ENV === 'development') {
    console.log('=== 画像フォーマット統計 ===')
    console.log('入力対応画像フォーマット数:', inputImageFormats.length)
    console.log('出力対応画像フォーマット数:', outputImageFormats.length)
    console.log('IMAGE_FORMATS配列のサイズ:', IMAGE_FORMATS.length)
    console.log('INPUT_IMAGE_FORMATS配列のサイズ:', INPUT_IMAGE_FORMATS.length)
    console.log('--- 詳細分析 ---')
    console.log('全読み込み対応フォーマット数:', allReadableFormats.length)
    console.log('全書き込み対応フォーマット数:', allWritableFormats.length)
    console.log('IMAGE_FORMATSにあるがSUPPORTED_FORMATSにないもの:', missingFromSupported)
    console.log('SUPPORTED_FORMATSにあるがIMAGE_FORMATSにないもの:', notInImageFormats)
    console.log('IMAGE_FORMATSの中で書き込み非対応のもの:', readOnlyInImageFormats)
    
    // 期待値との比較
    console.log('--- 期待値との比較 ---')
    console.log('入力画像フォーマット - 期待: 85, 実際:', inputImageFormats.length)
    console.log('出力画像フォーマット - 期待: 92, 実際:', outputImageFormats.length)
    console.log('IMAGE_FORMATS配列サイズ - 期待: 92, 実際:', IMAGE_FORMATS.length)
    console.log('INPUT_IMAGE_FORMATS配列サイズ - 期待: 85, 実際:', INPUT_IMAGE_FORMATS.length)
  }
  
  return {
    inputCount: inputImageFormats.length,
    outputCount: outputImageFormats.length,
    totalImageFormats: IMAGE_FORMATS.length,
    inputImageFormatsSize: INPUT_IMAGE_FORMATS.length,
    missingFromSupported,
    notInImageFormats,
    readOnlyInImageFormats,
    allReadableCount: allReadableFormats.length,
    allWritableCount: allWritableFormats.length
  }
} 