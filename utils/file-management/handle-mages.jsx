export function generateLocalPaths(files, setLocalPaths) {
  setLocalPaths([]);
  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function (loadEvt) {
      setLocalPaths((p) => [...p, loadEvt.target.result]);
    };
    reader.readAsDataURL(file);
    
  }
}

export async function uploadImagesCld(files) {
  //handle upload to cloudinary                //isoskode cloudinary [dgp4vzn3m]
let uploaded=[]
  for (let file of files) {
    const imageFormdata = new FormData();
    imageFormdata.append("upload_preset", "ecommerce-products-uns");
    imageFormdata.append("file", file);
    const resp = await fetch(
      "https://api.cloudinary.com/v1_1/dgp4vzn3m/image/upload",
      { method: "POST", body: imageFormdata }
    );
    const data = await resp.json();
    uploaded.push(data)
    // setMessage((prev) => ({
    //   ...prev,
    //   progress: (files.indexOf(file) + 1) / files.length + "% uploaded",
    // }));
  }
  // setMessage((p) => ({ ...p, progress: "" }));
  console.log('uploaded')
  return uploaded;
}
