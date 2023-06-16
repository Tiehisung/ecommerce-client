import Head from "next/head";
import { useEffect, useState } from "react";

export default function VideoUploader({ toggle }) {
  if (!toggle) return;
//   function toggleModal(){

//   }

  const [videoFile, setVideoFile] = useState({ name: "", type: "" });
  const [localSRC, setLocalSRC] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [description, setDescription] = useState("");
  const [Notice, setNotice] = useState("");

  function handleFilePath(e) {
    const file = e.target.files[0];
    setVideoFile(file); //to be uploaded with cloudinary on submission
    const reader = new FileReader();

    //reader to point to file
    reader.onload = function (onLoadEvt) {
      setLocalSRC(onLoadEvt.target.result); //for client view
    };

    //Checking file type before loading url with reader
    if (file && file.type.match("video.*")) {
      reader.readAsDataURL(file);
    } else {
      //hide submitBtn
      setVideoFile("");
    }
  }

  async function handleSubmitAndUpload(e) {
    e.preventDefault();
    setWaiting(true);
    setNotice("Uploading " + videoFile.name);
    //handle upload to cloudinary
    const formdata = new FormData();
    formdata.append("upload_preset", "gmsa-files-uns-pre");
    formdata.append("file", videoFile);
    //isoskode cloudinary [dgp4vzn3m]
    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/dgp4vzn3m/video/upload",
      { method: "POST", body: formdata }
    );

    const cloudRes = await resp.json();
    setNotice("Finishing...");

    Object.assign(cloudRes, { description });
    console.log("cloudRes", cloudRes);

    const db = await fetch("/api/admin/upload-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoObject: cloudRes }),
    });
    let x = await db.json();
    setNotice(x.message);
    setWaiting(false);
    setRefreshVideos((p) => p + 1);
  }
  //map all videos
  const [allVideos, setAllVideos] = useState([]);
  const [refreshVideos, setRefreshVideos] = useState(0);
  async function getAllVideos() {
    const getVids = await fetch("/api/admin/get-all-videos");
    const resp = await getVids.json();
    console.log(resp);
    setAllVideos(resp.videos);
  }
  useEffect(() => {
    getAllVideos();
  }, [refreshVideos]);
  return (
    <>
      <Head>
        <title>Video upload</title>
      </Head>
      <div id="overlay" className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-blue-950 opacity-50 ">
        <main className="min-h-screen flex flex-col items-center justify-center pt-36">
          <h2>{Notice}</h2>
          <form
            className="flex flex-col shadow-lg p-6 gap-4"
            onSubmit={handleSubmitAndUpload}
          >
            <video
              src={localSRC}
              height={230}
              width={300}
              className="border max-h-96"
              controls
            ></video>

            <div className="grid gap-6">
              <input
                onChange={handleFilePath}
                type="file"
                accept="video/*"
                name="video_file"
                id="video-upload-input"
              />
              <textarea
                value={description}
                cols="30"
                rows="3"
                placeholder="Video description"
                className="border"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <button className="bg-gray-400">
                {waiting ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
          <div className="flex flex-wrap gap-5 max-w-full my-8  ">
            {allVideos.length > 0 &&
              allVideos.map((v, i) => (
                <div key={i} className="flex  max-h-56 overflow-y-hidden">
                  <video
                    height={200}
                    width={230}
                    controls
                    src={v.url}
                    className="w-auto  max-h-52 max-w-md"
                  ></video>
                </div>
              ))}
          </div>
          {/* <RefreshSpinner /> */}
        </main>
      </div>
    </>
  );
}
