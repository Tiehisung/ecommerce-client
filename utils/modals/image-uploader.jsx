import Head from "next/head";
import { useState } from "react";

export default function UploadImage({ toggle }) {
  if (!toggle) return null;

  const [file, setFile] = useState();
  const [localPath, setLocalPath] = useState("");
  function handleOnChange(e) {
    setFile(() => e.target.files[0]);

    const reader = new FileReader();
    reader.onload = function (loadEvt) {
      setLocalPath(loadEvt.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
 
   async function handleUpload(e) {
     e.preventDefault();

     //handle upload to cloudinary
     const imageFormdata = new FormData();
     imageFormdata.append("upload_preset", "CR_events");
     imageFormdata.append("file", imageFile);
     //isoskode cloudinary [dgp4vzn3m]
     const resp = await fetch(
       "https://api.cloudinary.com/v1_1/dgp4vzn3m/image/upload",
       { method: "POST", body: imageFormdata }
     )
       .then((r) => r.json())
       .then((d) => {
         setProgressMsg("finishing up...");
         Object.assign(adminFormData, { avarta: d.secure_url });
         // setCloudSecureUrl(d.secure_url); //after upload
       });

     //Save admin to db
     const save_admin = await fetch("/api/admin/register-admin", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ adminData: adminFormData }),
     });
     const db_resp = await save_admin.json();
     //Reset fields
     
   }
  return (
    <>
      <Head>
        <title>Upload image</title>
      </Head>
      <div>
        <form onSubmit={handleUpload} action="">
          <input
            accept="image/*"
            type="file"
            name="image_upload"
            id="image-file-id"
            onChange={handleOnChange}
          />
        </form>
        <div>
          <img
            src={localPath ? localPath : "/ib1.png"}
            alt="image"
            width={230}
            height={300}
          />
        </div>
      </div>
    </>
  );
}
