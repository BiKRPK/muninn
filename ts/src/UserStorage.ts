import {RawVideo} from './Vids';

// Create an instance of a db object for us to store our database in
let db: IDBDatabase | undefined;
let dbPromise: Promise<IDBDatabase> | null = null;

openDatabase();

function openDatabase(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise<IDBDatabase> ((resolve, reject) => {
      const request = window.indexedDB.open('videos_bd', 1);
      // error handler signifies that the database didn't open successfully
      request.addEventListener('error', () => {
        console.error('Database failed to open');
        reject();
      });

      // success handler signifies that the database opened successfully
      request.addEventListener('success', () => {
        console.log('Database opened successfully');
        // Store the opened database object in the db variable. This is used a lot below
        db = request.result as IDBDatabase;
        resolve(db);
      });

      // Setup the database tables if this has not already been done
      request.addEventListener('upgradeneeded', e => {

        // Grab a reference to the opened database
        const target: any = e.target;
        db = target.result as IDBDatabase;

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

        resolve(db);
        console.log('Database setup complete');
      });

    })
  }
  return dbPromise;
}

export async function retrieveVideosIDB(): Promise<RawVideo[]> {
  await openDatabase();

  const videos: RawVideo[] = [];
  const transaction = db!.transaction('videos_os', 'readonly'); // Use 'readonly' mode for reading
  const objectStore = transaction.objectStore('videos_os');

  // Create a promise to handle cursor iteration
  const cursorPromise = new Promise<void>((resolve, reject) => {
      const cursorRequest = objectStore.openCursor();
      cursorRequest.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
          if (cursor) {
              console.log("SOME entries!");
              videos.push(getRawVideoFromCursor(cursor.value));
              console.log(printRawVideo(getRawVideoFromCursor(cursor.value)));
              cursor.continue();
          } else {
              console.log("No more entries!");
              resolve(); // Resolve the promise when cursor iteration is done
          }
      };
      cursorRequest.onerror = () => {
          console.error("Error occurred while retrieving videos from IndexedDB");
          reject();
      };
  });

  await cursorPromise;
  return videos;
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
    //var URL = window.URL || window.webkitURL;
    //var vidURL: string = URL.createObjectURL(cursor.video);

    const video: RawVideo = {
      id: cursor.id,
      agent: cursor.agent,
      map: cursor.map,
      side: cursor.side,
      title: cursor.title,
      description: cursor.description,
      ability: cursor.ability,
      type: cursor.type,
      src: cursor.video,
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

export async function storeVideo(video: RawVideo): Promise<void> {
  try {
      await openDatabase();
      // Open transaction, get object store; make it a readwrite so we can write to the IDB
      const objectStore = db.transaction('videos_os', 'readwrite').objectStore('videos_os');
      // Create a record to add to the IDB
      const record = {
          video: video.src,
          id: video.id,
          agent: video.agent,
          map: video.map,
          side: video.side,
          title: video.title,
          description: video.description,
          ability: video.ability,
          type: video.type,
          site: video.site
      };

      console.log("tried to upload: " + record.id);
      console.log("tried to upload: " + record.video);
      objectStore.add(record);
      // Add the record to the IDB using add()
      // await new Promise<void>((resolve, reject) => {
      //     const request = objectStore.add(record);
      //     request.addEventListener('success', () => {
      //         console.log('Record addition attempt finished');
      //         resolve();
      //     });
      //     request.addEventListener('error', () => {
      //         console.error(request.error);
      //         reject(request.error);
      //     });
      // });

  } catch (error) {
      console.error('Error occurred while storing video:', error);
      throw error;
  }
}


  