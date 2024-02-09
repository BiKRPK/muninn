import {Video} from './Types';
import {RawVideo} from './Vids';

// const dbName = "myDatabase";
// const dbVersion = 1;

// async function openDatabase(): Promise<IDBPDatabase> {
//   const db = await openDB(dbName, dbVersion, {
//     upgrade(db) {
//       // Create or upgrade the object store
//       if (!db.objectStoreNames.contains("videos")) {
//         const videoStore = db.createObjectStore("videos", { keyPath: "id" });
//         // You can create indexes on properties if needed
//         // videoStore.createIndex("agentIndex", "agent", { unique: false });
//       }
//     }
//   });

//   return db;
// }

// async function performDatabaseOperations() {
//   const db = await openDatabase();
//   // Perform operations on the database
// }
  
// export async function storeVideo(video: RawVideo) {
//     const db = await openDatabase();
//     const tx = db.transaction("videos", "readwrite");
//     const store = tx.objectStore("videos");

//     await store.add(video);

//     await tx.done;
// }
  
// export async function getVideos(): Promise<RawVideo[]> {
//     const db = await openDatabase();
//     const tx = db.transaction("videos", "readonly");
//     const store = tx.objectStore("videos");

//     const videos: RawVideo[] = [];

//     await store.openCursor().then(function cursorIterate(cursor) {
//         if (!cursor) return;

//         videos.push(cursor.value);

//         return cursor.continue().then(cursorIterate);
//     });

//     return videos;
// }

// export async function testAddingVideo() {
//     const videoToAdd: RawVideo = {
//       id: "123",
//       agent: "Raze",
//       map: "Haven",
//       side: "Attack",
//       title: "Sample Video",
//       description: "This is a sample video.",
//       ability: "Q",
//       type: "LU",
//       src: "https://example.com/video.mp4",
//       site: "A"
//     };
  
//     await storeVideo(videoToAdd);
//   }
  
//   export function saveVideoToIndexedDB(videoFile: File) {
//     const dbName = 'videosDB';
//     const objectStoreName = 'videos';
  
//     const request: IDBOpenDBRequest = indexedDB.open(dbName, 1);
  
//     request.onerror = (event: Event) => {
//       console.error('Failed to open IndexedDB:', (event.target as IDBOpenDBRequest).error);
//     };
  
//     request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
//       const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
//       const objectStore: IDBObjectStore = db.createObjectStore(objectStoreName, { autoIncrement: true });
//       objectStore.transaction.oncomplete = (event: Event) => {
//         const transaction: IDBTransaction = db.transaction(objectStoreName, 'readwrite');
//         const store: IDBObjectStore = transaction.objectStore(objectStoreName);
//         const addRequest: IDBRequest<IDBValidKey> = store.add(videoFile);
  
//         addRequest.onsuccess = (event: Event) => {
//           console.log('Video saved to IndexedDB!');
//         };
  
//         addRequest.onerror = (event: Event) => {
//           console.error('Failed to save video to IndexedDB:', (event.target as IDBRequest).error);
//         };
//       };
//     };
//   }
  
  
//   export function retrieveVideoFromIndexedDB(): Promise<File> {
//     const dbName = 'videosDB';
//     const objectStoreName = 'videos';
  
//     return new Promise((resolve, reject) => {
//       const request: IDBOpenDBRequest = indexedDB.open(dbName, 1);
  
//       request.onerror = (event: Event) => {
//         console.error('Failed to open IndexedDB:', (event.target as IDBOpenDBRequest).error);
//         reject((event.target as IDBOpenDBRequest).error);
//       };
  
//       request.onsuccess = (event: Event) => {
//         const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
//         const transaction: IDBTransaction = db.transaction(objectStoreName, 'readonly');
//         const objectStore: IDBObjectStore = transaction.objectStore(objectStoreName);
//         const getRequest: IDBRequest<File[]> = objectStore.getAll();
  
//         getRequest.onsuccess = (event: Event) => {
//           const videoFiles: File[] = (event.target as IDBRequest).result;
//           if (videoFiles.length > 0) {
//             resolve(videoFiles[0]);
//           } else {
//             reject('No video found in IndexedDB.');
//           }
//         };
  
//         getRequest.onerror = (event: Event) => {
//           console.error('Failed to retrieve video from IndexedDB:', (event.target as IDBRequest).error);
//           reject((event.target as IDBRequest).error);
//         };
//       };
//     });
//   }

  //NEW CODE

// Create an instance of a db object for us to store our database in
let db;


// // Open our database; it is created if it doesn't already exist
// // (see upgradeneeded below)
const request = window.indexedDB.open('videos_bd', 1);

// // error handler signifies that the database didn't open successfully
request.addEventListener('error', () => console.error('Database failed to open'));

// // success handler signifies that the database opened successfully
request.addEventListener('success', () => {
  console.log('Database opened successfully');
  // Store the opened database object in the db variable. This is used a lot below
  db = request.result;
});

// request.onsuccess = () => {
//   console.log('Database opened successfully:2');
//   let target: any = e.target;
//   db = request.result;
//   printAddress();
// }

// Setup the database tables if this has not already been done
request.addEventListener('upgradeneeded', e => {

  // Grab a reference to the opened database
  let target: any = e.target;
  const db = target.result;

  // Create an objectStore to store our videos in (basically like a single table)
  // including a auto-incrementing key
  const objectStore = db.createObjectStore('videos_os', { keyPath: 'id' });

  objectStore.createIndex('video', 'video', { unique: false });
  objectStore.createIndex('agent', 'agent', { unique: false });
  objectStore.createIndex('map', 'map', { unique: false });
  objectStore.createIndex('side', 'side', { unique: false });
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('description', 'description', { unique: false });
  objectStore.createIndex('ability', 'ability', { unique: false });
  objectStore.createIndex('type', 'type', { unique: false });
  objectStore.createIndex('site', 'site', { unique: false });

  console.log('Database setup complete');
});

// Register service worker to control making site work offline
// if('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('./sw.js')
//     .then(() => console.log('Service Worker Registered'));
// }


export function retrieveVideosIDB(): RawVideo[] {
    // let timer = 0;
    // while (timer < 50) {
    //   setTimeout(() => {
    //     console.log("Delayed for 0.01 second.");
    //     timer += 10;
    //   }, 10);      
    // }
    let db;
    const request = window.indexedDB.open('videos_bd', 1);

    request.addEventListener('success', () => {
      console.log('Database opened successfully');

      db = request.result;
      
      const videos: RawVideo[] = [];
      const objectStore: IDBObjectStore = db.transaction('videos_os', 'readwrite').objectStore('videos_os');

      objectStore.openCursor().onsuccess = (event) => {
        const target = event.target as any;
        const cursor = target.result;
        if (cursor) {
          console.log("SOME entries!");
          videos.push(getRawVideoFromCursor(cursor.value));
          console.log(printRawVideo(getRawVideoFromCursor(cursor.value)));
          cursor.continue();
        } else {
          console.log("No more entries!");
        }
      };
      return videos;
    });
    console.log("async suck my balls");
    return [];
}


function printRawVideo(rawVideo: RawVideo) {
  // console.log("Raw video: ");
  console.log("id - " + rawVideo.id);
  // console.log("title - " + rawVideo.title);
  // console.log("description - " + rawVideo.description);
  // console.log("ability - " + rawVideo.ability);
  // console.log("agent - " + rawVideo.agent);
  // console.log("map - " + rawVideo.map);
  // console.log("side - " + rawVideo.side);
  // console.log("site - " + rawVideo.site);
  // console.log("type - " + rawVideo.type);
  // console.log("src - " + rawVideo.src);
}


function getRawVideoFromCursor(cursor) : RawVideo{

    // Create ObjectURL
    var URL = window.URL || window.webkitURL;
    var vidURL: string = URL.createObjectURL(cursor.video);

    const video: RawVideo = {
      id: cursor.id,
      agent: cursor.agent,
      map: cursor.map,
      side: cursor.side,
      title: cursor.title,
      description: cursor.description,
      ability: cursor.ability,
      type: cursor.type,
      src: vidURL,
      site: cursor.site
    };

    return video;
}

// Define the fetchVideoFromNetwork() function
// function fetchVideoFromNetwork(video) {
//   console.log('fetching videos from network');
//   // Fetch the MP4 and WebM versions of the video using the fetch() function,
//   // then expose their response bodies as blobs
//   const mp4Blob = fetch(`videos/${video.name}.mp4`).then(response => response.blob());
//   const webmBlob = fetch(`videos/${video.name}.webm`).then(response => response.blob());

//   // Only run the next code when both promises have fulfilled
//   Promise.all([mp4Blob, webmBlob]).then(values => {
//     // display the video fetched from the network with displayVideo()
//     displayVideo(values[0], values[1], video.name);
//     // store it in the IDB using storeVideo()
//     storeVideo(values[0], values[1], video.name);
//   });
// }

// Define the storeVideo() function
export function storeVideo(video: RawVideo) {
  // Open transaction, get object store; make it a readwrite so we can write to the IDB
  const objectStore = db.transaction('videos_os', 'readwrite').objectStore('videos_os');
  // Create a record to add to the IDB
  const record = {
    video : video.src,
    id : video.id,
    agent: video.agent,
    map: video.map,
    side: video.side,
    title: video.title,
    description: video.description,
    ability: video.ability,
    type: video.type,
    site: video.site
  }
  console.log("tried to upload: " +  record.id);
  console.log("tried to upload: " +  record.video);
  // Add the record to the IDB using add()
  const request = objectStore.add(record);

  request.addEventListener('success', () => console.log('Record addition attempt finished'));
  request.addEventListener('error', () => console.error(request.error));
}



  