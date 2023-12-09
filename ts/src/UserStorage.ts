import { openDB, IDBPDatabase, IDBPObjectStore, StoreNames } from 'idb';
import {Video} from './Types';
import {RawVideo} from './Vids';

const dbName = "myDatabase";
const dbVersion = 1;

async function openDatabase(): Promise<IDBPDatabase> {
  const db = await openDB(dbName, dbVersion, {
    upgrade(db) {
      // Create or upgrade the object store
      if (!db.objectStoreNames.contains("videos")) {
        const videoStore = db.createObjectStore("videos", { keyPath: "id" });
        // You can create indexes on properties if needed
        // videoStore.createIndex("agentIndex", "agent", { unique: false });
      }
    }
  });

  return db;
}

async function performDatabaseOperations() {
  const db = await openDatabase();
  // Perform operations on the database
}
  
export async function storeVideo(video: RawVideo) {
    const db = await openDatabase();
    const tx = db.transaction("videos", "readwrite");
    const store = tx.objectStore("videos");

    await store.add(video);

    await tx.done;
}
  
export async function getVideos(): Promise<RawVideo[]> {
    const db = await openDatabase();
    const tx = db.transaction("videos", "readonly");
    const store = tx.objectStore("videos");

    const videos: RawVideo[] = [];

    await store.openCursor().then(function cursorIterate(cursor) {
        if (!cursor) return;

        videos.push(cursor.value);

        return cursor.continue().then(cursorIterate);
    });

    return videos;
}

export async function testAddingVideo() {
    const videoToAdd: RawVideo = {
      id: "123",
      agent: "Raze",
      map: "Haven",
      side: "Attack",
      title: "Sample Video",
      description: "This is a sample video.",
      ability: "Q",
      type: "LU",
      src: "https://example.com/video.mp4",
      site: "A"
    };
  
    await storeVideo(videoToAdd);
  }
  
  export function saveVideoToIndexedDB(videoFile: File) {
    const dbName = 'videosDB';
    const objectStoreName = 'videos';
  
    const request: IDBOpenDBRequest = indexedDB.open(dbName, 1);
  
    request.onerror = (event: Event) => {
      console.error('Failed to open IndexedDB:', (event.target as IDBOpenDBRequest).error);
    };
  
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
      const objectStore: IDBObjectStore = db.createObjectStore(objectStoreName, { autoIncrement: true });
      objectStore.transaction.oncomplete = (event: Event) => {
        const transaction: IDBTransaction = db.transaction(objectStoreName, 'readwrite');
        const store: IDBObjectStore = transaction.objectStore(objectStoreName);
        const addRequest: IDBRequest<IDBValidKey> = store.add(videoFile);
  
        addRequest.onsuccess = (event: Event) => {
          console.log('Video saved to IndexedDB!');
        };
  
        addRequest.onerror = (event: Event) => {
          console.error('Failed to save video to IndexedDB:', (event.target as IDBRequest).error);
        };
      };
    };
  }
  
  
  export function retrieveVideoFromIndexedDB(): Promise<File> {
    const dbName = 'videosDB';
    const objectStoreName = 'videos';
  
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(dbName, 1);
  
      request.onerror = (event: Event) => {
        console.error('Failed to open IndexedDB:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
  
      request.onsuccess = (event: Event) => {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
        const transaction: IDBTransaction = db.transaction(objectStoreName, 'readonly');
        const objectStore: IDBObjectStore = transaction.objectStore(objectStoreName);
        const getRequest: IDBRequest<File[]> = objectStore.getAll();
  
        getRequest.onsuccess = (event: Event) => {
          const videoFiles: File[] = (event.target as IDBRequest).result;
          if (videoFiles.length > 0) {
            resolve(videoFiles[0]);
          } else {
            reject('No video found in IndexedDB.');
          }
        };
  
        getRequest.onerror = (event: Event) => {
          console.error('Failed to retrieve video from IndexedDB:', (event.target as IDBRequest).error);
          reject((event.target as IDBRequest).error);
        };
      };
    });
  }
  