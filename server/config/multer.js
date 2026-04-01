import multer from 'multer';

export const storage=multer.diskStorage({})

export const upload=multer({storage})