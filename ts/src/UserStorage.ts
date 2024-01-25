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

  //NEW CODE

// Create an instance of a db object for us to store our database in
let db;

function init() {
  // Loop through the video names one by one
  for(const video of videos) {
    // Open transaction, get object store, and get() each video by name
    const objectStore = db.transaction('videos_os').objectStore('videos_os');
    const request = objectStore.get(video.name);
    request.addEventListener('success', () => {
      // If the result exists in the database (is not undefined)
      if(request.result) {
        // Grab the videos from IDB and display them using displayVideo()
        console.log('taking videos from IDB');
        displayVideo(request.result.mp4, request.result.webm, request.result.name);
      } else {
        // Fetch the videos from the network
        fetchVideoFromNetwork(video);
      }
    });
  }
}

// Define the fetchVideoFromNetwork() function
function fetchVideoFromNetwork(video) {
  console.log('fetching videos from network');
  // Fetch the MP4 and WebM versions of the video using the fetch() function,
  // then expose their response bodies as blobs
  const mp4Blob = fetch(`videos/${video.name}.mp4`).then(response => response.blob());
  const webmBlob = fetch(`videos/${video.name}.webm`).then(response => response.blob());

  // Only run the next code when both promises have fulfilled
  Promise.all([mp4Blob, webmBlob]).then(values => {
    // display the video fetched from the network with displayVideo()
    displayVideo(values[0], values[1], video.name);
    // store it in the IDB using storeVideo()
    storeVideo(values[0], values[1], video.name);
  });
}

// Define the storeVideo() function
function storeVideo(mp4Blob, webmBlob, name) {
  // Open transaction, get object store; make it a readwrite so we can write to the IDB
  const objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
  // Create a record to add to the IDB
  const record = {
    mp4 : mp4Blob,
    webm : webmBlob,
    name : name
  }

  // Add the record to the IDB using add()
  const request = objectStore.add(record);

  request.addEventListener('success', () => console.log('Record addition attempt finished'));
  request.addEventListener('error', () => console.error(request.error));
}

// Define the displayVideo() function
function displayVideo(mp4Blob, webmBlob, title) {
  // Create object URLs out of the blobs
  const mp4URL = URL.createObjectURL(mp4Blob);
  const webmURL = URL.createObjectURL(webmBlob);

  // Create DOM elements to embed video in the page
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  const video = document.createElement('video');
  video.controls = true;
  const source1 = document.createElement('source');
  source1.src = mp4URL;
  source1.type = 'video/mp4';
  const source2 = document.createElement('source');
  source2.src = webmURL;
  source2.type = 'video/webm';

  // Embed DOM elements into page
  section.appendChild(article);
  article.appendChild(h2);
  article.appendChild(video);
  video.appendChild(source1);
  video.appendChild(source2);
}

// Open our database; it is created if it doesn't already exist
// (see upgradeneeded below)
const request = window.indexedDB.open('videos_db', 1);

// error handler signifies that the database didn't open successfully
request.addEventListener('error', () => console.error('Database failed to open'));

// success handler signifies that the database opened successfully
request.addEventListener('success', () => {
  console.log('Database opened successfully');

  // Store the opened database object in the db variable. This is used a lot below
  db = request.result;
  init();
});

// Setup the database tables if this has not already been done
request.addEventListener('upgradeneeded', e => {

  // Grab a reference to the opened database
  const db = e.target.result;

  // Create an objectStore to store our videos in (basically like a single table)
  // including a auto-incrementing key
  const objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

  // Define what data items the objectStore will contain
  objectStore.createIndex('mp4', 'mp4', { unique: false });
  objectStore.createIndex('webm', 'webm', { unique: false });

  console.log('Database setup complete');
});

// Register service worker to control making site work offline
if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/sw.js')
    .then(() => console.log('Service Worker Registered'));
}

  