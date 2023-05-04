import { BlobSASPermissions, BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";
import path from "path";
import _appsettings from "../appSettings.json"

dotenv.config({ path: path.join(__dirname, "..", ".env") });
const AZURE_STORAGE_CONNECTION_STRING = _appsettings.CONFIG.STORAGE_CONNECTION_STRING as string;

export const uploadToBlobStorage = async (
  containerName: string,
  fileName: string,
  fileContent: Buffer
): Promise<string> => {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.uploadData(fileContent);

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const sasToken = blockBlobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse("r"),
      expiresOn: expiryDate,
    });

    return sasToken;
  } catch (error) {
    console.error("Failed to upload file to Azure Blob Storage:", error);
    throw error;
  }
};
