import AppError from "@shared/errors/AppError";

export default interface IStorageProvider {
    saveFile(file: string): Promise<String>;
    deleteFile(file: String): Promise<void>;
}